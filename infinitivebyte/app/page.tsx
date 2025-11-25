"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Agency } from "./api/data/route";

export default function Home() {

	const [Agencies, setAgencies] = useState<Agency[] | null>(null);

	useEffect(()=>{
		async function Get(){
			const res = await axios.get("/api/data?target=agencies");
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
