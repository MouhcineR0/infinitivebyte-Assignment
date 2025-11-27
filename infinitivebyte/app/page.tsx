"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Agency from "./interfaces/Agency";
import Contact from "./interfaces/Contact";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

const AxiosInstance = axios.create({
	url: "/api",
	timeout: 10000
})

async function fetchAgencies(): Promise<Agency[] | null> {
	try {
		const response = await AxiosInstance.get("/api/data?target=agencies");
		return response.data?.Agencies;
	}
	catch (error: any) {
		if (!error.response) {
			console.error("Network error: Please check your internet connection.");
		} else {
			console.error(`Server error: ${error.response.status} - ${error.response.statusText}`);
		}
		return null;
	}
}
async function fetchContacts(): Promise<Contact[] | null> {
	try {
		const response = await AxiosInstance.get("/api/data?target=contacts");
		return response.data?.Contacts;
	}
	catch (error: any) {
		// Check if it's a network error
		if (!error.response) {
			console.error("Network error: Please check your internet connection.");
		} else {
			console.error(`Server error: ${error.response.status} - ${error.response.statusText}`);
		}
		return null;
	}
}

export default function Home() {

	const { user, isLoaded, isSignedIn } = useUser();

	const [Agencies, setAgencies] = useState<Agency[] | null>(null);
	const [Contacts, setContacts] = useState<Contact[] | null>(null);

	console.log(user);
	useEffect(() => {

		const Fetch = async () => {
			setAgencies(await fetchAgencies());
			setContacts(await fetchContacts());
		}
		Fetch();
	}, [])
	console.log(Agencies);
	console.log(Contacts);
	// redirect("/dashboard");
	// if (!isSignedIn)
	redirect("/home");
}
