'use client'
import React, { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Agency from '../interfaces/Agency'
import Contact from '../interfaces/Contact'

function ContactsPage() {
	const { isSignedIn, isLoaded } = useUser()

	const [agencies] = useState<Agency[]>([
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

	const [contacts] = useState<Contact[]>([
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

	if (!isLoaded) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-black">
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

	return (
		<div className="min-h-screen bg-black text-slate-100 font-inter relative overflow-hidden">
			{/* Cinematic background effects */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				<div className="absolute top-[-30%] left-[-15%] w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
				<div className="absolute bottom-[-40%] right-[-20%] w-[800px] h-[800px] rounded-full bg-emerald-500/15 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[80px_80px]" />
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,transparent_70%)]" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
				<a
					href="/dashboard"
					className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-slate-200 mb-6 transition-colors"
				>
					<ArrowLeft size={16} />
					<span>Back to Dashboard</span>
				</a>

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
		</div>
	)
}

export default ContactsPage
