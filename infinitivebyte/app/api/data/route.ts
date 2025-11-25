import path from "path"
import fs from "fs"
import Papa from "papaparse"
import { NextResponse } from "next/server";
import { parseBundlerArgs } from "next/dist/lib/bundler";

export interface Agency {
	name: string;
	state: string;
	state_code: string;
	type: string;
	population: string;
	website: string;
	total_schools: string;
	total_students: string;
	mailing_address: string;
	grade_span: string;
	locale: string;
	csa_cbsa: string;
	domain_name: string;
	physical_address: string;
	phone: string;
	status: string;
	student_teacher_ratio: string;
	supervisory_union: string;
	county: string;
	created_at: string;
	updated_at: string;
	id: string;
}

function ConvertSchema(Data: any): Array<Agency> | null {
	if (!Data || !Data.length)
		return null;
	var newObj = Data?.map(ele => ({
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
	console.log(newObj);
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
		const DataConverted: Agency[] | null = ConvertSchema(ParseContent?.data);
		if (!DataConverted)
			NextResponse.json({ message: "Error" }, { status: 401 });
		if (target == "agencies")
			return NextResponse.json({ Agencies: { ...DataConverted } });
		return NextResponse.json({ Contacts: { ...DataConverted } });
	}

	catch (err) {
		console.log("Error => ", err);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}
