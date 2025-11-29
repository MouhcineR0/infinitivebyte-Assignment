"use client"

import LightRays from "@/app/animation/LightRays"
import { SignedIn, SignIn, SignInButton, SignUpButton, useUser } from "@clerk/nextjs"
import { GithubIcon, LinkedinIcon } from "lucide-react"
import Link from "next/link"

function index() {
	const { isSignedIn } = useUser();

	return (
		<>
			<div className="relative bg-black h-screen z-99">
				<div>
					<LightRays
						raysOrigin="top-center"
						raysColor="#00ffff"
						raysSpeed={1.5}
						lightSpread={0.8}
						rayLength={1.2}
						followMouse={true}
						mouseInfluence={0.1}
						noiseAmount={0.1}
						distortion={0.05}
						className="custom-rays"
					/>
				</div>
				<div className="w-full flex flex-col items-center z-99">
					<nav className="text-white mt-8 w-full max-w-5xl mx-auto px-4 py-3 rounded-full bg-white/5 backdrop-blur-lg border border-white/10 flex items-center justify-between">
						{/* Logo and site name */}
						<div className="flex items-center gap-3">
							<div className="h-9 w-9 bg-linear-to-br from-indigo-600 to-emerald-500 rounded-lg flex items-center justify-center text-white font-bold text-lg">
								IB
							</div>
							<div className="hidden sm:block font-poppins font-semibold leading-tight">
								<div>InfinitiveByte</div>
								<div className="text-xs text-white/60">Agency</div>
							</div>
						</div>

						{/* Navigation Links */}
						<div className="hidden sm:flex items-center gap-2 text-sm">
							<Link href={'/dashboard'} className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors">Home</Link>
							<a href={'https://github.com/rachid-mouhcine'} target="_blank" className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors">Docs</a>
							<a href={'#features'} className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors">Features</a>
						</div>

						{/* Auth Buttons */}
						<div className="flex items-center gap-3 text-sm">
							<SignInButton mode="modal">
								<button className="px-4 py-2 rounded-full hover:bg-white/10 transition-colors">Sign in</button>
							</SignInButton>
							<SignUpButton mode="modal">
								<button className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-500 transition-colors shadow-lg">Sign up</button>
							</SignUpButton>
						</div>
					</nav>
					<div className="middle mt-24 flex items-center justify-center text-white gap-8 relative">
						{/* decorative blob behind hero (subtle) */}
						<div className="absolute -top-10 left-1/2 transform -translate-x-1/2 w-56 h-56 rounded-full bg-linear-to-br from-emerald-600/12 to-indigo-600/8 blur-3xl pointer-events-none hidden lg:block" />

						{/* Centered Hero */}
						<div className="w-full max-w-3xl px-6 py-12 relative z-10 flex flex-col items-center">
							<div className="inline-flex items-center gap-3 bg-white/6 border border-white/8 rounded-full px-3 py-1 mb-4 text-sm justify-center">
								<span className="bg-emerald-400/30 text-emerald-200 rounded-full px-2 py-1 text-xs">Made by</span>
								<span className="text-xs text-white/80">Rachid Mouhcine</span>
							</div>

							<h1 className="font-poppins font-extrabold text-3xl sm:text-4xl md:text-5xl leading-tight text-center">
								Design beautiful relationships —
								<span className="text-emerald-300"> organize</span>, <span className="text-indigo-300">connect</span>, and <span className="text-white">grow.</span>
							</h1>

							<p className="mt-4 text-slate-200 max-w-2xl mx-auto text-center">
								A human-centered dashboard to manage agencies and contacts. Clear hierarchy, responsive layouts, and delightful micro-interactions make everyday tasks faster.
							</p>

							<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
								<SignUpButton mode="modal">
									<button className="py-3 px-6 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition">Get Started</button>
								</SignUpButton>
								<a href="#features" className="py-3 px-6 rounded-full border border-white/20 bg-white/5 flex items-center justify-center">Explore Docs</a>
							</div>

							<div className="mt-6 flex items-center justify-center gap-3">
								<div className="rounded-full border-white/10 border bg-white/5 p-3"><GithubIcon size={18} /></div>
								<div className="rounded-full border-white/10 border bg-white/5 p-3"><LinkedinIcon size={18} /></div>
							</div>
						</div>
					</div>
				</div>
			</div >
		</>
	)
}

export default index