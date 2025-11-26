"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Agency from "./interfaces/Agency";
import Contact from "./interfaces/Contact";

const AxiosInstance = axios.create({
	url : "/api",
	timeout : 10000
})

async function fetchAgencies() : Promise<Agency[] | null> {
	const response = await AxiosInstance.get("/api/data?target=agencies");
	return response.data?.Agencies;
}
async function fetchContacts() : Promise<Contact[] | null> {
	const response = await AxiosInstance.get("/api/data?target=contacts");
	return response.data?.Contacts;
}

export default function Home() {

	const [Agencies, setAgencies] = useState<Agency[] | null>(null);
	const [Contacts, setContacts] = useState<Contact[] | null>(null);

	useEffect(()=>{
		async() => {
			setAgencies(await fetchAgencies());
			setContacts(await fetchContacts());
		}
	}, [])
	console.log(Agencies);
	console.log(Contacts);
  return (
	<>
	</>
  );
}
