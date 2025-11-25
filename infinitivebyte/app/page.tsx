"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {

	const [data, setData] = useState<Object | null>(null);

	useEffect(()=>{
		async function Get(){
			const res = await axios.get("/api/data?target=agenciesf");
			console.log(res?.data);
		}
		Get();
	}, [])

  return (
	<>
	</>
  );
}
