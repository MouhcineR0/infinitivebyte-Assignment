'use client'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Loader2, Mail, Phone, User } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Contact from '../interfaces/Contact'
import axios from 'axios'

function ContactsPage() {
	const { isSignedIn, isLoaded, user } = useUser()
	const [contactIds, setContactIds] = useState<string[]>([])
	const [contactsById, setContactsById] = useState<Record<string, Contact>>({})
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [viewedIds, setViewedIds] = useState<Set<string>>(new Set())
	const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set())
	const [isPremium, setIsPremium] = useState(false)
	const DAILY_FREE_LIMIT = 50
	const toKey = (id: string | number) => String(id)
	const [page, setPage] = useState(1)
	const [pageSize] = useState(18)
	const [total, setTotal] = useState(0)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		if (!user?.id) return
		const premiumKey = `premium_${user.id}`
		setIsPremium(localStorage.getItem(premiumKey) === 'true')
		const today = new Date().toDateString()
		const viewedKey = `contacts_viewed_${user.id}_${today}`
		const raw = localStorage.getItem(viewedKey)
		if (raw) {
			try {
				const parsed: string[] = JSON.parse(raw)
				setViewedIds(new Set(parsed))
			} catch {
				setViewedIds(new Set())
			}
		}
	}, [user])

	// Fetch only IDs with pagination
	useEffect(() => {
		const fetchIds = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const res = await axios.get(`/api/data?target=contacts&idsOnly=true&page=${page}&pageSize=${pageSize}`)
				setContactIds((res.data?.ids || []).map((x: { id: string | number }) => toKey(x.id)))
				setTotal(res.data?.meta?.total || 0)
				setTotalPages(res.data?.meta?.totalPages || 1)
			} catch (e: any) {
				setError('Failed to load contacts')
			} finally {
				setIsLoading(false)
			}
		}
		fetchIds()
	}, [page, pageSize])

	const remainingFree = Math.max(0, DAILY_FREE_LIMIT - viewedIds.size)
	const canViewMore = () => isPremium || viewedIds.size < DAILY_FREE_LIMIT

	const markViewed = (id: string | number) => {
		if (!user?.id || isPremium) return
		const key = toKey(id)
		if (viewedIds.has(key)) return
		if (viewedIds.size >= DAILY_FREE_LIMIT) return
		const next = new Set(viewedIds)
		next.add(key)
		const today = new Date().toDateString()
		const viewedKey = `contacts_viewed_${user.id}_${today}`
		localStorage.setItem(viewedKey, JSON.stringify(Array.from(next)))
		setViewedIds(next)
	}

	const fetchContactById = async (id: string) => {
		try {
			const res = await axios.get(`/api/data?target=contacts&id=${id}`)
			return res.data?.contact as Contact
		} catch {
			return null
		}
	}

	const handleToggleDetails = async (id: string | number) => {
		const key = toKey(id)
		if (expandedIds.has(key)) {
			const next = new Set(expandedIds)
			next.delete(key)
			setExpandedIds(next)
			return
		}
		if (!isPremium && !viewedIds.has(key) && viewedIds.size >= DAILY_FREE_LIMIT) return
		// fetch details if not cached
		if (!contactsById[key]) {
			const contact = await fetchContactById(key)
			if (contact) setContactsById(prev => ({ ...prev, [key]: contact }))
		}
		if (!isPremium && !viewedIds.has(key)) markViewed(key)
		const next = new Set(expandedIds)
		next.add(key)
		setExpandedIds(next)
	}

	if (!isLoaded) {
		return (
			<div className='min-h-screen flex items-center justify-center bg-black'>
				<Loader2 className='h-10 w-10 animate-spin text-slate-500' />
			</div>
		)
	}
	if (isLoaded && !isSignedIn) redirect('/home')

	return (
		<div className='min-h-screen bg-black text-slate-100 font-inter relative overflow-hidden'>
			<div className='absolute inset-0 pointer-events-none overflow-hidden'>
				<div className='absolute top-[-30%] left-[-15%] w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-[120px]' />
				<div className='absolute bottom-[-40%] right-[-20%] w-[800px] h-[800px] rounded-full bg-emerald-500/15 blur-[150px]' />
				<div className='absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[80px_80px]' />
				<div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,transparent_70%)]' />
			</div>

			<div className='relative z-10 max-w-7xl mx-auto px-6 py-8'>
				<a href='/dashboard' className='inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-6 transition-colors'>
					<ArrowLeft size={16} />
					<span>Back to Dashboard</span>
				</a>

				<div className='flex flex-col sm:flex-row items-center justify-between mb-4 gap-2'>
					<div>
						<h1 className='text-2xl font-semibold text-slate-100'>Contacts</h1>
						{isPremium ? (
							<p className='text-xs text-emerald-400 mt-1'>Premium member – unlimited contact details</p>
						) : (
							<p className='text-xs text-amber-400 mt-1'>Free plan – {remainingFree} of {DAILY_FREE_LIMIT} contacts left to view in detail today</p>
						)}
					</div>
					{!isLoading && !error && (
						<div className='text-xs text-slate-400'>Page {page} / {totalPages} • {total} total</div>
					)}
				</div>
				{!isLoading && totalPages > 1 && (
					<div className='mb-6 flex flex-wrap items-center gap-3'>
						<button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className='px-3 py-2 rounded-md border border-slate-800 bg-slate-900 disabled:opacity-40 hover:border-slate-700 transition flex items-center gap-1'>Prev</button>
						<button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className='px-3 py-2 rounded-md border border-slate-800 bg-slate-900 disabled:opacity-40 hover:border-slate-700 transition flex items-center gap-1'>Next</button>
					</div>
				)}

				{isLoading && (<div className='text-sm text-slate-400 flex items-center gap-2'><Loader2 className='h-4 w-4 animate-spin' /> Loading contact ids...</div>)}
				{error && !isLoading && (<div className='text-sm text-red-400'>{error}</div>)}
				{!isLoading && !error && contactIds.length === 0 && (<div className='text-sm text-slate-500'>No contacts found.</div>)}

				{!isLoading && !error && contactIds.length > 0 && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
						{contactIds.map(id => {
							const key = toKey(id)
							const isExpanded = expandedIds.has(key)
							const alreadyViewed = viewedIds.has(key)
							const canExpand = isPremium || alreadyViewed || viewedIds.size < DAILY_FREE_LIMIT
							const contact = contactsById[key]

							return (
								<div key={key} className='group bg-slate-900/60 border border-slate-800 rounded-lg p-5 hover:border-slate-700 hover:bg-slate-800/50 transition-colors'>
									<div className='flex items-center justify-between mb-3'>
										<div className='text-xs text-slate-500'>ID: {key}</div>
										<button onClick={() => handleToggleDetails(key)} disabled={!isExpanded && !canExpand} className='text-xs px-3 py-1 rounded-md border border-slate-700 hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed transition'>
											{isExpanded ? 'Hide details' : 'View details'}
										</button>
									</div>

									{isExpanded ? (
										contact ? (
											<>
												<div className='flex items-start justify-between'>
													<div className='font-medium text-slate-100 truncate max-w-[70%]' title={`${contact.first_name} ${contact.last_name}`}>{contact.first_name} {contact.last_name}</div>
													<span className='text-xs text-emerald-500 px-2 py-1 rounded-md border border-slate-700 truncate max-w-[30%]' title={contact.title}>{contact.title}</span>
												</div>
												<div className='text-xs text-slate-500 mt-2 flex items-center gap-2 truncate' title={contact.department || 'N/A'}><User size={14} /> Dept: {contact.department || 'N/A'}</div>
												<div className='mt-3 grid grid-cols-2 gap-3 text-xs text-slate-400'>
													<div className='truncate' title={contact.email_type}><span className='text-slate-500'>Email Type:</span><br />{contact.email_type}</div>
													<div className='truncate' title={contact.agency_id}><span className='text-slate-500'>Agency ID:</span><br />{contact.agency_id}</div>
													<div className='truncate' title={contact.firm_id}><span className='text-slate-500'>Firm ID:</span><br />{contact.firm_id}</div>
													<div className='line-clamp-2 wrap-break-word' title={contact.contact_form_url}><span className='text-slate-500'>Contact Form:</span><br />{contact.contact_form_url}</div>
												</div>
												<div className='mt-4 text-xs space-y-1 max-h-32 overflow-hidden'>
													<div className='flex items-center gap-2 truncate wrap-break-word' title={contact.email}><Mail size={14} className='text-slate-500' /> {contact.email}</div>
													<div className='flex items-center gap-2 truncate' title={contact.phone}><Phone size={14} className='text-slate-500' /> {contact.phone}</div>
													<div className='text-[10px] text-slate-600 pt-2 truncate' title={contact.created_at}>Created: {contact.created_at}</div>
													<div className='text-[10px] text-slate-600 truncate' title={contact.updated_at}>Updated: {contact.updated_at}</div>
												</div>
											</>
										) : (
											<div className='space-y-2 text-xs text-slate-600'>
												<div className='h-3 bg-slate-800/60 rounded w-2/3' />
												<div className='h-3 bg-slate-800/40 rounded w-1/2' />
											</div>
										)
									) : (
										<div className='space-y-2 text-xs text-slate-600'>
											<div className='h-3 bg-slate-800/60 rounded w-2/3' />
											<div className='h-3 bg-slate-800/40 rounded w-1/2' />
										</div>
									)}
								</div>
							)
						})}
					</div>
				)}
			</div>
		</div>
	)
}

export default ContactsPage
