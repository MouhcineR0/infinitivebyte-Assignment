# infinitivebyte Assignment Documentation

## What this app does

This is a small dashboard app built with Next.js 16 and Clerk.  
Users have to sign in before they can access anything. Once logged in, they get a dashboard with links to two main pages: Agencies and Contacts.

The Agencies page shows all agencies (right now using card components, but it could be changed to a table later if needed).

The Contacts page shows a paginated list of contact IDs. When you click “View details”, it loads the full contact info.

Free users can only open 50 contact details per day. After reaching the limit, they get a message asking them to upgrade (there’s no real payment; upgrading just flips a flag that marks the user as premium). Premium users don’t have any limits.

---

## Technologies

- Next.js 16 (App Router)
- Clerk (authentication and user session handling)
- Vercel for deployment
- Data stored in CSV files inside the `/public` folder, then fetched through one API route
- Tailwind CSS for styling the UI
- LocalStorage to keep track of:
  - whether the user is premium  
    → `premium_{userId}`
  - how many contacts they opened today  
    → `contacts_viewed_{userId}_{YYYY-MM-DD}`

---

## Pages overview

### `/home`
Simple landing page. Shows sign-in and sign-up buttons provided by Clerk.

### `/dashboard`
After signing in, users land here. It shows:
- links to the Agencies and Contacts pages  
- whether they are premium or not  
- buttons to upgrade or cancel premium status  

### `/agencies`
Loads agencies with pagination.  
Each agency is displayed as a card.  
Clicking a card opens a popup with full agency details.

### `/contacts`
Shows a list of contact IDs only (also paginated).  
When the user clicks “View details”, it fetches the full contact info from the server side.  
If the user is not premium, viewing a *new* contact counts toward the 50-per-day limit.

---

## Daily contact limit (how it works)

- Free users can open up to 50 unique contact details per day.
- Only the first time a user opens a contact counts.  
  Clicking the same contact again doesn’t subtract anything.
- The limit resets automatically each day because the key in localStorage includes the current date.
- When the user reaches 50, the app blocks new contact views and shows an upgrade message.  
  Upgrading simply sets the `premium_{userId}` key in localStorage.

---

## API Route: `/api/data`

All data (agencies and contacts) comes from a single API endpoint.

### Supported query parameters

- `target=agencies` or `target=contacts`
- `page` and `pageSize` for pagination
- `idsOnly=true` (used on the Contacts page to only show IDs)
- `id=123` to fetch a single contact by ID

---

![Alt text](https://github.com/)


## About the AI Help

GitHub Copilot (AI) is the main builder of this project, responsible for generating most of the code structure and implementation. It also helped clean up several parts of the logic, including the 50-per-day contact view limit.

My role is focused on tracking, reviewing, and refining the contact-handling logic to ensure everything works correctly and to prevent issues before they grow into bigger problems.

