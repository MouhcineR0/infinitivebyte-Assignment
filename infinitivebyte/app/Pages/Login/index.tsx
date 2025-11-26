"use client"

import LightRays from "@/app/animation/LightRays"
import { SignIn, SignInButton, SignUpButton } from "@clerk/nextjs"
import Link from "next/link"

function index() {
  return (
	<>
	{/* <div>login hada</div>
	<h1>rachid</h1>
	<SignInButton>
		<button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
		Sign In
		</button>
	</SignInButton>
	<SignUpButton>
		<button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
		Sign Up
		</button>
	</SignUpButton> */}
	{/* <header className="flex w-full h-[100vh]">
		<div className="w-[50%]"></div>
		<div className="w-[50%] flex self-center justify-center">
			<SignIn />
		</div> */}
		{/* <SignInButton mode="modal">
		<button className="bg-[#6c47ff] text-ceramic-white rounded-full font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 cursor-pointer">
		Sign In
		</button>
	</SignInButton> */}
	{/* </header> */}
	<div className="relative bg-black h-screen">
		<div style={{ width: '100%', height: '600px', position: 'absolute' }}>
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
		<div className="w-full flex flex-col items-center">
			<nav className="text-white mt-6 flex justify-between w-[50%] bg-[#ffffff22] py-5 px-7 rounded-full border-[#ffffff2c] border">
				<div className="flex gap-1  items-center font-[Poppins] font-semibold">
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="size-6">
						<path fill-rule="evenodd" d="M12.577 4.878a.75.75 0 0 1 .919-.53l4.78 1.281a.75.75 0 0 1 .531.919l-1.281 4.78a.75.75 0 0 1-1.449-.387l.81-3.022a19.407 19.407 0 0 0-5.594 5.203.75.75 0 0 1-1.139.093L7 10.06l-4.72 4.72a.75.75 0 0 1-1.06-1.061l5.25-5.25a.75.75 0 0 1 1.06 0l3.074 3.073a20.923 20.923 0 0 1 5.545-4.931l-3.042-.815a.75.75 0 0 1-.53-.919Z" clip-rule="evenodd" />
					</svg>
					Agency
				</div>
				<div className="right-container flex items-center gap-3 font-inter">
					<Link href={'/dashboard'}>Home</Link>
					<a href={'https://github.com'} target="_blank">Docs</a>
				</div>
			</nav>
			<div className="middle mt-[200px] flex-col justify-center items-center text-white absolute left-[50%] top-[40%]">
				<div className="github rounded-full border-[#ffffff2c] border bg-[#ffffff22] flex p-3 gap-3">
					{/* <h2>
						Visit Github
					</h2> */}
					<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-github-icon lucide-github"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
				</div>
			</div>
		</div>
	</div>
	</>
  )
}

export default index