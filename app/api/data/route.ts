import Papa from "papaparse"
import { NextResponse } from "next/server";
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


export async function GET(request: Request) {
	try {
		const req = new URL(request.url);
		const target = req.searchParams.get("target") ?? "default";
		const idParam = req.searchParams.get('id'); // optional contact id
		const idsOnly = req.searchParams.get('idsOnly') === 'true'; // optional flag to return only ids
		const pageParam = req.searchParams.get("page") || '1';
		const pageSizeParam = req.searchParams.get("pageSize") || '20';
		const page = Math.max(1, parseInt(pageParam));
		const pageSize = Math.max(1, parseInt(pageSizeParam));
		
		if (target == "default")
			return NextResponse.json({ message: "No target specified" }, { status: 400 });

		let fileUrl: string;
		const baseUrl = request.url.split('/api')[0];
		if (target == "agencies")
			fileUrl = `${baseUrl}/agencies_agency_rows.csv`;
		else if (target == "contacts")
			fileUrl = `${baseUrl}/contacts_contact_rows.csv`;
		else
			return NextResponse.json({ message: "Invalid target" }, { status: 400 });

		const response = await fetch(fileUrl);
		
		if (!response.ok) {
			return NextResponse.json({ message: "File not found" }, { status: 404 });
		}

		const fileContent = await response.text();
		const ParseContent = Papa.parse(fileContent);
		const rows: any[] = ParseContent?.data || [];

		// NOTE: If CSV contains header row, adjust conversion to skip it by detecting non-data row.

		if (target == "agencies") {
			const all = ConvertSchemaAgency(rows) || [];
			const total = all.length;
			const totalPages = Math.max(1, Math.ceil(total / pageSize));
			const start = (page - 1) * pageSize;
			const slice = all.slice(start, start + pageSize);
			// Pagination slice applied before returning JSON ensures not all data loads at once.
			return NextResponse.json({ Agencies: slice, meta: { total, page, pageSize, totalPages } });
		}

		// contacts logic
		const allContacts = ConvertSchemaContact(rows) || [];

		// If id provided, return single contact
		if (idParam) {
			const found = allContacts.find(c => String(c.id) === String(idParam));
			if (!found) return NextResponse.json({ contact: null }, { status: 404 });
			return NextResponse.json({ contact: found });
		}

		// If idsOnly requested, return only ids (paginated)
		if (idsOnly) {
			const total = allContacts.length;
			const totalPages = Math.max(1, Math.ceil(total / pageSize));
			const start = (page - 1) * pageSize;
			const slice = allContacts.slice(start, start + pageSize).map(c => ({ id: c.id }));
			return NextResponse.json({ ids: slice, meta: { total, page, pageSize, totalPages } });
		}

		// default: paginated contacts
		const totalC = allContacts.length;
		const totalPagesC = Math.max(1, Math.ceil(totalC / pageSize));
		const startC = (page - 1) * pageSize;
		const sliceC = allContacts.slice(startC, startC + pageSize);
		// Pagination slice applied before returning JSON ensures not all data loads at once.
		return NextResponse.json({ Contacts: sliceC, meta: { total: totalC, page, pageSize, totalPages: totalPagesC } });
	}
	catch (err) {
		console.log("Error => ", err);
		return NextResponse.json({ message: "Error" }, { status: 500 });
	}
}
