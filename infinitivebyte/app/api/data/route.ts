import path from "path"
import fs from "fs"
import Papa from "papaparse"
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const req = new URL(request.url);
		const target = req.searchParams.get("target") ?? "default";
		if (target == "default")
			return NextResponse.json({ message: "" }, { status: 400 });
		var filePath: string = "default";
		if (target == "agencies")
			filePath = path.join(process.cwd(), "MockData/agencies_agency_rows.csv");
		else if (target == "contacts")
			filePath = path.join(process.cwd(), "MockData/contacts_contact_rows.csv");
		else
			NextResponse.json({ message: "Error" }, { status: 401 });
		const file = fs.readFileSync(filePath, "utf-8");
		const ParseContent = Papa.parse(file);
		console.log(ParseContent);
		if (target == "agencies")
			return NextResponse.json({ Agencies: { ...ParseContent } });
		return NextResponse.json({ Contacts: { ...ParseContent } });
	}

	catch (err) {
		console.log("Error => ", err);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}
