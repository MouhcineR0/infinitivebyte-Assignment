export default interface Contact {
	id: string | number
	first_name: string
	last_name: string
	title: string
	department?: string
	agency_id?: string | number
	firm_id?: string | number
	email_type?: string
	contact_form_url?: string
	email?: string
	phone?: string
	created_at?: string
	updated_at?: string
}
