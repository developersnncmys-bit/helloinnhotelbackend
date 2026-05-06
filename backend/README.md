# Hello Inn Backend

REST API for the Hello Inn Hotel management dashboard. Built with Node.js, Express, and MongoDB (Mongoose).

## Setup

```bash
cd backend
npm install
cp .env.example .env       # then edit MONGO_URI to point at your MongoDB
npm run dev                # starts with nodemon on http://localhost:5000
```

## Project structure

```
backend/
├── server.js              # entry point
├── config/db.js           # mongoose connection
├── middleware/            # error handler
├── models/                # mongoose schemas
├── controllers/           # request handlers (CRUD)
└── routes/                # express routers (mount under /api/*)
```

## API

All resources support full CRUD. List endpoints accept `q` (search), plus filters per resource.

### Bookings — `/api/bookings`

| Method | Path | Body / Query |
|---|---|---|
| GET | `/api/bookings?q=&status=&source=` | filter / search |
| GET | `/api/bookings/:id` | — |
| POST | `/api/bookings` | `{ guest, phone, source, room, nights, checkin, status }` |
| PUT | `/api/bookings/:id` | partial booking |
| DELETE | `/api/bookings/:id` | — |

### Rooms — `/api/rooms`

| Method | Path | Body / Query |
|---|---|---|
| GET | `/api/rooms?status=&type=` | — |
| GET | `/api/rooms/:id` | — |
| POST | `/api/rooms` | `{ no, type, floor, price, status, image }` |
| PUT | `/api/rooms/:id` | partial room |
| DELETE | `/api/rooms/:id` | — |

### Users — `/api/users`

| Method | Path | Body / Query |
|---|---|---|
| GET | `/api/users?q=&role=&status=` | — |
| GET | `/api/users/:id` | — |
| POST | `/api/users` | `{ name, email, role, status, avatar, color }` |
| PUT | `/api/users/:id` | partial user |
| DELETE | `/api/users/:id` | — |

### Guests — `/api/guests`

| Method | Path | Body / Query |
|---|---|---|
| GET | `/api/guests?q=&status=` | — |
| GET | `/api/guests/:id` | — |
| POST | `/api/guests` | `{ name, phone, email, room, checkin, checkout, idType, status }` |
| PUT | `/api/guests/:id` | partial guest |
| PATCH | `/api/guests/:id/checkout` | flips status to "Checked Out" with current timestamp |
| DELETE | `/api/guests/:id` | — |

### Payments — `/api/payments`

| Method | Path | Body / Query |
|---|---|---|
| GET | `/api/payments/summary` | aggregated totals by status |
| GET | `/api/payments?q=&status=&method=` | — |
| GET | `/api/payments/:id` | — |
| POST | `/api/payments` | `{ booking, guest, method, amount, date, status }` |
| PUT | `/api/payments/:id` | partial payment |
| DELETE | `/api/payments/:id` | — |

## Notes

- CORS allows the origin set via `CORS_ORIGIN` (defaults to `*`).
- Validation errors, cast errors, and duplicate-key errors are translated into clean JSON responses by `middleware/errorHandler.js`.
