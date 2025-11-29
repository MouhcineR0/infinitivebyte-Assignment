'use client'
import React, { useEffect, useState } from 'react'
import { Landmark, Contact2, ArrowLeft, Sparkles } from 'lucide-react'
import { useUser, UserButton } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'
import Contact from '../interfaces/Contact'
import Agency from '../interfaces/Agency'

function DashboardPage() {
	const { isSignedIn, isLoaded } = useUser()

	const [contacts, setContacts] = useState<Contact[] | null>(null);
	const [agencies, setAgencies] = useState<Agency[] | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const agenciesRes = await axios.get("/api/data?target=agencies");
				const contactsRes = await axios.get("/api/data?target=contacts");

				setAgencies(agenciesRes.data?.Agencies || null);
				setContacts(contactsRes.data?.Contacts || null);
				toast.success('Data loaded successfully');
			} catch (error) {
				// console.error("Error fetching data:", error);
				toast.error('Failed to fetch data. Please try again.');
			} finally {
				setIsLoading(false);
			}
		}
		fetchData();
	}, [])

	console.log(contacts);
	console.log(agencies);
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
			<Toaster
				position="top-right"
				toastOptions={{
					style: {
						background: '#1e293b',
						color: '#f1f5f9',
						border: '1px solid #334155',
					},
					success: {
						iconTheme: {
							primary: '#10b981',
							secondary: '#f1f5f9',
						},
					},
					error: {
						iconTheme: {
							primary: '#ef4444',
							secondary: '#f1f5f9',
						},
					},
				}}
			/>
			{/* Cinematic background effects */}
			<div className="absolute inset-0 pointer-events-none overflow-hidden">
				{/* Animated gradient orbs */}
				<div className="absolute top-[-30%] left-[-15%] w-[700px] h-[700px] rounded-full bg-indigo-600/20 blur-[120px] animate-pulse" />
				<div className="absolute bottom-[-40%] right-[-20%] w-[800px] h-[800px] rounded-full bg-emerald-500/15 blur-[150px] animate-pulse" style={{ animationDelay: '1s' }} />
				<div className="absolute top-[30%] right-[10%] w-[400px] h-[400px] rounded-full bg-purple-600/10 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />
				<div className="absolute bottom-[20%] left-[5%] w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-[80px] animate-pulse" style={{ animationDelay: '1.5s' }} />

				{/* Grid pattern overlay */}
				<div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-size-[80px_80px]" />

				{/* Radial gradient spotlight */}
				<div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(99,102,241,0.15)_0%,transparent_70%)]" />

				{/* Noise texture overlay */}
				<div className="absolute inset-0 opacity-[0.015] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PC9maWx0ZXI+PHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMSIvPjwvc3ZnPg==')]" />
			</div>

			<div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
				{/* Header */}
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
				<main className="flex-1">
					<div className="flex flex-col items-center justify-center text-center h-full pt-16 animate-fade-in">
						<h1 className="font-semibold text-2xl text-slate-100 mb-2">Welcome to Your Dashboard</h1>
						<p className="text-slate-400 mb-10">Select a category to start browsing.</p>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-5 w-full max-w-xl">
							<Link
								href="/agencies"
								className="group bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-200 text-left"
							>
								<Landmark className="h-6 w-6 text-indigo-400 mb-3" />
								<h2 className="text-md font-semibold text-slate-100">View Agencies</h2>
								<p className="text-sm text-slate-500 mt-1">Browse all partner agencies.</p>
							</Link>
							<Link
								href="/contacts"
								className="group bg-slate-900 p-6 rounded-lg border border-slate-800 hover:border-slate-700 hover:bg-slate-800/50 transition-all duration-200 text-left"
							>
								<Contact2 className="h-6 w-6 text-emerald-400 mb-3" />
								<h2 className="text-md font-semibold text-slate-100">View Contacts</h2>
								<p className="text-sm text-slate-500 mt-1">Access your list of contacts.</p>
							</Link>
						</div>
					</div>
				</main>
			</div>
		</div>
	)
}

export default DashboardPage