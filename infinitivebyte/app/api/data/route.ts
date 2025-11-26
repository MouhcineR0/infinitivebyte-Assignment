import path from "path"
import fs from "fs"
import Papa from "papaparse"
import { NextResponse } from "next/server";
import { parseBundlerArgs } from "next/dist/lib/bundler";
import Agency from "@/app/interfaces/Agency";
import Contact from "@/app/interfaces/Contact";


function ConvertSchemaAgency(Data: any): Array<Agency> | null {
	if (!Data || !Data.length)
		return null;
	var newObj = Data?.map((ele: string[]) => ({
		name: ele[0],
		state: ele[1],
		state_code: ele[2],
		type: ele[3],
		population: ele[4],
		website: ele[5],
		total_schools: ele[6],
		total_students: ele[7],
		mailing_address: ele[8],
		grade_span: ele[9],
		locale: ele[10],
		csa_cbsa: ele[11],
		domain_name: ele[12],
		physical_address: ele[13],
		phone: ele[14],
		status: ele[15],
		student_teacher_ratio: ele[16],
		supervisory_union: ele[17],
		county: ele[18],
		created_at: ele[19],
		updated_at: ele[20],
		id: ele[21],
	}))
	return newObj;
}

function ConvertSchemaContact(Data: any): Array<Contact> | null {
	if (!Data || !Data.length) return null;

	const newObj = Data.map((ele: string[]) => ({
		id: ele[0],
		first_name: ele[1],
		last_name: ele[2],
		email: ele[3],
		phone: ele[4],
		title: ele[5],
		email_type: ele[6],
		contact_form_url: ele[7],
		created_at: ele[8],
		updated_at: ele[9],
		agency_id: ele[10],
		firm_id: ele[11],
		department: ele[12],
	}));

	return newObj;
}


export function GET(request: Request) {
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
		console.log(typeof ParseContent?.data);
		// const DataConverted: Agency[] | null = ConvertSchemaAgency(ParseContent?.data);
		// if (!DataConverted)
		// 	NextResponse.json({ message: "Error" }, { status: 401 });
		if (target == "agencies")
			return NextResponse.json({ Agencies: { ...ConvertSchemaAgency(ParseContent?.data) } });
		return NextResponse.json({ Contacts: { ...ConvertSchemaContact(ParseContent?.data) } });
	}

	catch (err) {
		console.log("Error => ", err);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}
