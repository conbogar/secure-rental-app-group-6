# Secure Rental Application Tracker

A private web application that helps renters organize their housing search. Renters find properties on external sites like Zillow, Kijiji, or liv.rent, then log them here to track applications, viewings, deadlines, contacts, and follow-up tasks — all in one place.

This is the **frontend** for the project. The backend is being developed separately and will connect to this frontend via a REST API.

## What It Does

- **Register and log in** with a private account
- **Dashboard** showing upcoming viewings, deadlines, and recent activity
- **My Rentals** — a searchable, filterable list of every rental you're tracking
- **Add / Edit / Delete rentals** with full property, contact, and application details
- **Search and filter** by status, rent range, bedrooms, deadline, and amenities (pets, accessibility, furnished, parking)

Each rental record contains:
- Property: name, address, city, rent, listing link
- Contact: landlord/agent name, email, phone
- Application: status, viewing date, deadline, required documents
- Follow-up: next action
- Notes
- Amenities: pets allowed, accessible, furnished, parking

## Tech Stack

**Frontend**
- **React** (via Vite) — component-based UI
- **React Router** — client-side routing
- **React Context** — shared state across pages
- **Tailwind CSS** — utility-first styling

**Backend (in progress, separate repo folder)**
- Node.js + Express
- PostgreSQL
- Prisma ORM
- JWT authentication

## Project Structure

frontend/
├── public/ Static assets
├── src/
│ ├── assets/ Images
│ ├── components/
│ │ └── Nav.jsx Top navigation bar
│ ├── data/
│ │ ├── mockData.js Sample rental records (temporary)
│ │ ├── RentalsContext.jsx Shared state provider
│ │ └── useRentals.js Custom hook for accessing state
│ ├── pages/
│ │ ├── Login.jsx
│ │ ├── Register.jsx
│ │ ├── Dashboard.jsx
│ │ ├── RentalList.jsx
│ │ ├── RentalDetail.jsx
│ │ └── RentalForm.jsx Used for both Add and Edit
│ ├── App.jsx Routes and providers
│ ├── main.jsx Entry point
│ └── index.css Global styles and Tailwind imports
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js

## Running the Frontend

```sh
cd frontend
npm install
npm run dev
```

The app runs at http://localhost:5173

## Routes

| Route | Page |
|-------|------|
| `/login` | Sign in |
| `/register` | Create an account |
| `/dashboard` | Overview of upcoming actions |
| `/rentals` | List of all rentals |
| `/rentals/new` | Add a new rental |
| `/rentals/:id` | View a rental's full record |
| `/rentals/:id/edit` | Edit an existing rental |

## Current Status

**Release 1.0 (frontend)**

- [x] Auth flow (register, login, logout)
- [x] Dashboard with viewings, deadlines, and recent activity
- [x] Rental list with search and filters
- [x] Rental detail page
- [x] Add / edit / delete rentals
- [x] Tailwind styling throughout
- [x] Data persists across sessions

**Still to come**

- [ ] Replace mock data with live API calls (pending backend)
- [ ] Register page API integration
- [ ] JWT authentication (pending backend)
- [ ] Comments and code documentation
- [ ] UI polish and animations

## Notes

- The app currently uses mock data stored in localStorage. Once the backend API is live, the RentalsContext will fetch and update rentals from the server instead.

- Authentication is currently mocked for UI development. Real JWT auth will be implemented with the backend.

## Project Team 6

- **Frontend:** Kelly Burden, Basit Baddwi
- **Backend:** Connor Gardiner, Adrian Hidalgo
- **QA:** Emily Kotsis-Wilder, Marwa Shahab, Aysha Almoslim
- **Project Manager:** Arsal Shaheryar

## License

Software license to be determined.