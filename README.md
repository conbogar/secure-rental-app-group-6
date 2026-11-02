# secure-rental-app-group-6

The backend provides REST API endpoints for user authentication and rental management. It connects to a PostgreSQL database using Prisma ORM.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Prisma ORM
- JSON Web Tokens (JWT)
- bcrypt for password hashing

## Backend Setup

From the project root, run:

```bash
npm ci
npm run dev
```

The backend runs at:

`http://localhost:3000`

## Health Check

To check whether the backend is running:

`GET http://localhost:3000/api/health`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Log in and receive an authentication token |

### Rentals

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/rentals` | Get the logged-in user's rentals |
| GET | `/api/rentals/:id` | Get a specific rental |
| POST | `/api/rentals` | Create a new rental |
| PUT | `/api/rentals/:id` | Update an existing rental |
| DELETE | `/api/rentals/:id` | Delete a rental |

## Authentication

Rental endpoints require a valid JWT token.

Include the token in the request header:

```text
Authorization: Bearer <token>
```

Users can only access and manage their own rental records.

## Database

The backend uses PostgreSQL to store application data and Prisma ORM to manage database operations.

Database configuration is stored in the local `.env` file.

Never commit the `.env` file or share database passwords and JWT secrets.