'use client'
import React, { useState } from 'react'
import { Building, Users, ArrowLeft } from 'lucide-react'
import { useUser, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Agency from '../interfaces/Agency'
import Contact from '../interfaces/Contact'

function DashboardPage() {
	const { isSignedIn, isLoaded } = useUser()
	const [view, setView] = useState<'home' | 'agencies' | 'contacts'>('home')

	// --- Data ---
	const [agencies, setAgencies] = useState<Agency[]>([
		{
			id: '1',	
			name: 'Innovate Public Schools',
			state: 'California',
			state_code: 'CA',
			type: 'Charter',
			population: '15000',
			website: 'innovateps.org',
			total_schools: '10',
			total_students: '7500',
			mailing_address: '123 Education Ln, San Francisco, CA 94102',
			grade_span: 'K-12',
			locale: 'Urban',
			csa_cbsa: 'San Francisco-Oakland-Hayward, CA',
			domain_name: 'innovateps.org',
			physical_address: '123 Education Ln, San Francisco, CA 94102',
			phone: '415-555-0101',
			status: 'Active',
			student_teacher_ratio: '20:1',
			supervisory_union: 'N/A',
			county: 'San Francisco County',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
		{
			id: '2',
			name: 'Texas Leadership Charter Academy',
			state: 'Texas',
			state_code: 'TX',
			type: 'Public',
			population: '50000',
			website: 'texasleadership.com',
			total_schools: '25',
			total_students: '25000',
			mailing_address: '456 Lone Star Rd, Austin, TX 78701',
			grade_span: 'PK-12',
			locale: 'Suburban',
			csa_cbsa: 'Austin-Round Rock, TX',
			domain_name: 'texasleadership.com',
			physical_address: '456 Lone Star Rd, Austin, TX 78701',
			phone: '512-555-0102',
			status: 'Active',
			student_teacher_ratio: '18:1',
			supervisory_union: 'N/A',
			county: 'Travis County',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
		},
	])
	const [contacts, setContacts] = useState<Contact[]>([
		{
			id: '1',
			first_name: 'John',
			last_name: 'Doe',
			email: 'john.doe@innovateps.org',
			phone: '415-555-0111',
			title: 'Superintendent',
			email_type: 'Work',
			contact_form_url: 'innovateps.org/contact',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			agency_id: '1',
			firm_id: '101',
			department: 'Administration',
		},
		{
			id: '2',
			first_name: 'Jane',
			last_name: 'Smith',
			email: 'jane.smith@texasleadership.com',
			phone: '512-555-0112',
			title: 'Principal',
			email_type: 'Work',
			contact_form_url: 'texasleadership.com/contact',
			created_at: new Date().toISOString(),
			updated_at: new Date().toISOString(),
			agency_id: '2',
			firm_id: '102',
			department: 'Academics',
		},
	])

	// --- Auth & Loading ---
	if (!isLoaded) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-900">
				<div className="flex flex-col items-center gap-4">
					<div className="animate-spin rounded-full h-12 w-12 border-4 border-slate-800 border-t-indigo-500" />
					<div className="text-sm text-slate-400">Loading...</div>
				</div>
			</div>
		)
	}

	if (isLoaded && !isSignedIn) {
		redirect('/home')
	}

	// --- Render Logic ---
	const renderContent = () => {
		switch (view) {
			case 'agencies':
				return (
					<div className="animate-fade-in">
						<button
							onClick={() => setView('home')}
							className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-6 transition-colors"
						>
							<ArrowLeft size={16} />
							<span>Back to Dashboard</span>
						</button>
						<h1 className="text-2xl font-semibold text-slate-100 mb-6">All Agencies</h1>
						<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
							{agencies.map(agency => (
								<div
									key={agency.id}
									className="bg-slate-900/70 border border-slate-800 rounded-lg p-4 transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/50"
								>
									<div className="font-medium text-slate-100">{agency.name}</div>
									<div className="text-sm text-slate-400">{agency.state}</div>
									<div className="flex items-center gap-2 text-xs text-slate-500 mt-3 pt-3 border-t border-slate-800">
										<Users size={14} />
										<span>{agency.total_students} students</span>
									</div>
								</div>
							))}
						</div>
					</div>
				)
			case 'contacts':
				return (
					<div className="animate-fade-in">
						<button
							onClick={() => setView('home')}
							className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-6 transition-colors"
						>
							<ArrowLeft size={16} />
							<span>Back to Dashboard</span>
						</button>
						<h1 className="text-2xl font-semibold text-slate-100 mb-6">All Contacts</h1>
						<div className="bg-slate-900/70 border border-slate-800 rounded-lg overflow-hidden">
							<table className="w-full text-left">
								<thead className="border-b border-slate-800">
									<tr>
										<th className="p-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Name</th>
										<th className="p-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Title</th>
										<th className="p-3 text-xs font-medium text-slate-400 uppercase tracking-wider">Agency</th>
									</tr>
								</thead>
								<tbody>
									{contacts.map(contact => (
										<tr key={contact.id} className="border-b border-slate-800/50 last:border-b-0 hover:bg-slate-800/40 transition-colors">
											<td className="p-3 text-sm text-slate-100">{contact.first_name} {contact.last_name}</td>
											<td className="p-3 text-sm text-slate-400">{contact.title}</td>
											<td className="p-3 text-sm text-slate-400">{agencies.find(a => a.id === contact.agency_id)?.name || 'N/A'}</td>
										</tr>
									))}
								</tbody>
							</table>
						</div>
					</div>
				)
			case 'home':
			default:
				return (
					<div className="flex flex-col items-center justify-center text-center h-full pt-16 animate-fade-in">
						<h1 className="font-semibold text-2xl text-slate-100 mb-2">Welcome to Your Dashboard</h1>
						<p className="text-slate-400 mb-10">Select a category to start browsing.</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-xl">
							<button
								onClick={() => setView('agencies')}
								className="group bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-200 text-left"
							>
								<Building className="h-6 w-6 text-slate-400 mb-3" />
								<h2 className="text-md font-semibold text-slate-100">View Agencies</h2>
								<p className="text-sm text-slate-500 mt-1">Browse all partner agencies.</p>
							</button>
							<button
								onClick={() => setView('contacts')}
								className="group bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-200 text-left"
							>
								<Users className="h-6 w-6 text-slate-400 mb-3" />
								<h2 className="text-md font-semibold text-slate-100">View Contacts</h2>
								<p className="text-sm text-slate-500 mt-1">Access your list of contacts.</p>
							</button>
						</div>
					</div>
				)
		}
	}

	return (
		<div className="min-h-screen bg-slate-950 text-slate-100 font-inter">
			<div className="max-w-7xl mx-auto px-6 py-8">
				{/* Minimal top bar (untouched) */}
				<header className="w-full bg-slate-900/40 backdrop-blur-md p-2 mb-6 rounded-xl flex items-center justify-between border border-slate-800/50">
					<div>
						<a
							href="/home"
							className="inline-flex items-center gap-2 text-sm text-slate-300 rounded-md px-3 py-1 hover:bg-slate-800/60 transition-colors"
						>
							<ArrowLeft size={16} />
							<span>Back to Home</span>
						</a>
					</div>
					<div>
						<UserButton afterSignOutUrl="/home" />
					</div>
				</header>

				{/* Main content */}
				<main className="flex-1">{renderContent()}</main>
			</div>
		</div>
	)
}

export default DashboardPage