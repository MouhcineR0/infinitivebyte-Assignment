"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Agency } from "./api/data/route";

async function fetchAgencies() : Promise<Agency[] | null> {
	
	return null;
}

export default function Home() {

	const [Agencies, setAgencies] = useState<Agency[] | null>(null);
	const [Contacts, setContacts] = useState<any>(null);

	useEffect(()=>{
		async function Get(){
			const res = await axios.get("/api/data?target=agencies");
			const res = await axios.get("/api/data?target=contacts");
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
