"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import Agency from "./interfaces/Agency";

async function fetchAgencies() : Promise<Agency[] | null> {
	const response = await axios.get("/api/data?target=agencies");
	return response.data?.Agencies;
}
async function fetchContacts() : Promise<Agency[] | null> {
	const response = await axios.get("/api/data?target=contacts");
	return response.data?.Contacts;
}

export default function Home() {

	const [Agencies, setAgencies] = useState<Agency[] | null>(null);
	const [Contacts, setContacts] = useState<any>(null);

	useEffect(()=>{
		async function Get(){
			const res = await axios.get("/api/data?target=agencies");
			const res = await axios.get("");
			console.log(res.data);
			setAgencies(res.data?.Agencies);
		}
		Get();
	}, [])

  return (
	<>
	</>
  );
}
