'use client'
import React, { useEffect, useMemo, useState } from 'react'
import { Bell, Settings } from 'lucide-react'
import { useUser, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation';

function page() {

	const { isSignedIn, isLoaded } = useUser();

	if (!isLoaded) {
		return (
			<div className="min-h-screen flex items-center justify-center bg-slate-900">
				<div className="flex flex-col items-center gap-4">
					<div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-700 border-t-indigo-400" />
					<div className="text-sm text-slate-300">Loading...</div>
				</div>
			</div>
		)
	}
	if (isLoaded && !isSignedIn)
		redirect("/home");
	const [agencies, setAgencies] = useState([
		{ id: 1, name: 'Northwind Agency', city: 'Seattle', people: 12 },
		{ id: 2, name: 'Blue River Partners', city: 'Austin', people: 8 },
	])

	const [contacts, setContacts] = useState([
		{ id: 1, name: 'Aisha Khan', title: 'Manager', agency: 'Northwind Agency' },
		{ id: 2, name: 'Liam Chen', title: 'Director', agency: 'Blue River Partners' },
	])

	const [query, setQuery] = useState('');

	return (
		<div className="min-h-screen bg-slate-900 text-slate-100">
			<div className="max-w-7xl mx-auto px-6 py-8">
				<div className="flex gap-6">
					{/* Sidebar (compact, left) */}
					<aside className="w-56 bg-slate-800 rounded-xl p-5 shadow-sm shrink-0">
						<div className="flex items-center gap-3 mb-6">
							<div className="h-9 w-9 bg-indigo-600 text-white rounded flex items-center justify-center font-bold">IB</div>
							<div>
								<div className="font-semibold">Dashboard</div>
								<div className="text-xs text-slate-400">Admin</div>
							</div>
						</div>

						<nav className="space-y-2 mt-2">
							<button className="w-full flex items-center gap-3 px-3 py-2 rounded-md bg-indigo-700 text-indigo-100">
								<span className="text-sm font-medium">Home</span>
							</button>
							<button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 text-sm">Agencies</button>
							<button className="w-full flex items-center gap-3 px-3 py-2 rounded-md hover:bg-slate-700 text-sm">Contacts</button>
						</nav>
					</aside>

					{/* Main content */}
					<main className="flex-1">
						<header className="flex items-center justify-between mb-6">
							<div>
								<h1 className="text-2xl font-extrabold">Welcome back, Jordan!</h1>
								<p className="text-sm text-slate-400">Here's a quick overview of your account.</p>
							</div>

							<div className="flex items-center gap-4">
								<div className="flex items-center gap-3">
									<button className="h-9 w-9 rounded-full bg-slate-800 shadow flex items-center justify-center" aria-label="notifications"><Bell size={16} className="text-slate-100" /></button>
									<UserButton afterSignOutUrl="/home" />
								</div>
							</div>
						</header>

						{/* Summary cards */}
						<section className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
							<div className="bg-slate-800 rounded-xl p-5 shadow-sm">
								<div className="text-sm text-slate-400">Total Agencies</div>
								<div className="mt-2 text-2xl font-bold">{agencies.length}</div>
								<div className="mt-3 text-xs text-emerald-300">+5.4% this month</div>
							</div>

							<div className="bg-slate-800 rounded-xl p-5 shadow-sm">
								<div className="text-sm text-slate-400">Total Contacts</div>
								<div className="mt-2 text-2xl font-bold">{contacts.length}</div>
								<div className="mt-3 text-xs text-emerald-300">+2.1% this month</div>
							</div>

							<div className="bg-slate-800 rounded-xl p-5 shadow-sm">
								<div className="text-sm text-slate-400">New this week</div>
								<div className="mt-2 text-2xl font-bold">78</div>
								<div className="mt-3 text-xs text-emerald-300">+12% from last week</div>
							</div>
						</section>

						{/* Quick Access */}
						<section className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
							<div className="bg-slate-800 rounded-xl p-5 shadow-sm flex items-center justify-between">
								<div>
									<div className="text-sm font-semibold">Manage Agencies</div>
									<div className="text-xs text-slate-400 mt-1">View, edit, or add new partner agencies to the system.</div>
								</div>
								<div>
									<button className="px-3 py-2 bg-indigo-600 text-white rounded-md">View All Agencies</button>
								</div>
							</div>

							<div className="bg-slate-800 rounded-xl p-5 shadow-sm flex items-center justify-between">
								<div>
									<div className="text-sm font-semibold">Browse Contacts</div>
									<div className="text-xs text-slate-400 mt-1">Search and manage your list of professional contacts.</div>
								</div>
								<div>
									<button className="px-3 py-2 bg-emerald-600 text-white rounded-md">Add New Contact</button>
								</div>
							</div>
						</section>

						{/* Recent Activity */}
						<section className="bg-slate-800 rounded-xl p-5 shadow-sm">
							<h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
							<ul className="space-y-3">
								{contacts.slice(0, 3).map((c: any) => (
									<li key={c.id} className="flex items-start gap-3 p-3 rounded-md border border-slate-700">
										<div className="h-8 w-8 rounded-full bg-emerald-600/10 flex items-center justify-center text-emerald-300">👤</div>
										<div className="flex-1">
											<div className="text-sm"><span className="font-medium">You added a new contact:</span> {c.name}</div>
											<div className="text-xs text-slate-400 mt-1">Just now</div>
										</div>
									</li>
								))}

								{agencies.slice(0, 2).map((a: any) => (
									<li key={a.id} className="flex items-start gap-3 p-3 rounded-md border border-slate-700">
										<div className="h-8 w-8 rounded-full bg-indigo-600/10 flex items-center justify-center text-indigo-300">🏢</div>
										<div className="flex-1">
											<div className="text-sm"><span className="font-medium">Agency updated:</span> {a.name}</div>
											<div className="text-xs text-slate-400 mt-1">1 hour ago</div>
										</div>
									</li>
								))}
							</ul>
						</section>
					</main>
				</div>
			</div>
		</div>
	)
}

export default page