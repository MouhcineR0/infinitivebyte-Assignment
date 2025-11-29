'use client'
import React, { useEffect, useState } from 'react'
import { ArrowLeft, Loader2, Mail, Phone, User, ChevronLeft, ChevronRight } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Contact from '../interfaces/Contact'
import axios from 'axios'

function ContactsPage() {
	const { isSignedIn, isLoaded } = useUser()
	const [contacts, setContacts] = useState<Contact[] | null>(null)
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)
	const [page, setPage] = useState(1)
	const [pageSize] = useState(18)
	const [total, setTotal] = useState(0)
	const [totalPages, setTotalPages] = useState(1)

	useEffect(() => {
		const fetchContacts = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const res = await axios.get(`/api/data?target=contacts&page=${page}&pageSize=${pageSize}`)
				setContacts(res.data?.Contacts || null)
				setTotal(res.data?.meta?.total || 0)
				setTotalPages(res.data?.meta?.totalPages || 1)
			} catch (e: any) {
				setError('Failed to load contacts')
			} finally {
				setIsLoading(false)
			}
		}
		fetchContacts()
	}, [page, pageSize])

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
				<div className='flex items-center justify-between mb-4'>
					<h1 className='text-2xl font-semibold text-slate-100'>Contacts</h1>
					{!isLoading && !error && (
						<div className='text-xs text-slate-400'>Page {page} / {totalPages} • {total} total</div>
					)}
				</div>
				{!isLoading && totalPages > 1 && (
					<div className='mb-6 flex items-center gap-3'>
						<button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className='px-3 py-2 rounded-md border border-slate-800 bg-slate-900 disabled:opacity-40 hover:border-slate-700 transition flex items-center gap-1'><ChevronLeft className='h-4 w-4' /> Prev</button>
						<button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className='px-3 py-2 rounded-md border border-slate-800 bg-slate-900 disabled:opacity-40 hover:border-slate-700 transition flex items-center gap-1'>Next <ChevronRight className='h-4 w-4' /></button>
					</div>
				)}
				{isLoading && (<div className='text-sm text-slate-400 flex items-center gap-2'><Loader2 className='h-4 w-4 animate-spin' /> Loading contacts...</div>)}
				{error && !isLoading && (<div className='text-sm text-red-400'>{error}</div>)}
				{!isLoading && !error && (!contacts || contacts.length === 0) && (<div className='text-sm text-slate-500'>No contacts found.</div>)}
				{!isLoading && !error && contacts && contacts.length > 0 && (
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5'>
						{contacts.map(c => (
							<div key={c.id} className='group bg-slate-900/60 border border-slate-800 rounded-lg p-5 hover:border-slate-700 hover:bg-slate-800/50 transition-colors'>
								<div className='flex items-start justify-between'>
									<div className='font-medium text-slate-100 truncate max-w-[70%]' title={`${c.first_name} ${c.last_name}`}>{c.first_name} {c.last_name}</div>
									<span className='text-xs text-emerald-500 px-2 py-1 rounded-md border border-slate-700 truncate max-w-[30%]' title={c.title}>{c.title}</span>
								</div>
								<div className='text-xs text-slate-500 mt-2 flex items-center gap-2 truncate' title={c.department || 'N/A'}><User size={14} /> Dept: {c.department || 'N/A'}</div>
								<div className='mt-3 grid grid-cols-2 gap-3 text-xs text-slate-400'>
									<div className='truncate' title={c.email_type}><span className='text-slate-500'>Email Type:</span><br />{c.email_type}</div>
									<div className='truncate' title={c.agency_id}><span className='text-slate-500'>Agency ID:</span><br />{c.agency_id}</div>
									<div className='truncate' title={c.firm_id}><span className='text-slate-500'>Firm ID:</span><br />{c.firm_id}</div>
									<div className='line-clamp-2 wrap-break-word' title={c.contact_form_url}><span className='text-slate-500'>Contact Form:</span><br />{c.contact_form_url}</div>
								</div>
								<div className='mt-4 text-xs space-y-1 max-h-32 overflow-hidden'>
									<div className='flex items-center gap-2 truncate wrap-break-word' title={c.email}><Mail size={14} className='text-slate-500' /> {c.email}</div>
									<div className='flex items-center gap-2 truncate' title={c.phone}><Phone size={14} className='text-slate-500' /> {c.phone}</div>
									<div className='text-[10px] text-slate-600 pt-2 truncate' title={c.created_at}>Created: {c.created_at}</div>
									<div className='text-[10px] text-slate-600 truncate' title={c.updated_at}>Updated: {c.updated_at}</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		</div>
	)
}

export default ContactsPage
