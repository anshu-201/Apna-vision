# Apna Vision — MERN Full-Stack Website

Modern full-stack MERN website for **Apna Vision** with:
- **Frontend**: React (Vite) + Tailwind CSS + Framer Motion + React Router
- **Backend**: Node.js + Express + Mongoose
- **Database**: MongoDB
- **Features**: Dark/Light mode, smooth animations, responsive UI, training + contact forms stored in MongoDB, admin panel to view submissions, chatbot placeholder.

## Project Structure

```
frontend/
backend/
```

## Prerequisites
- Node.js 18+ (recommended)
- MongoDB (local or Atlas)

---

## Backend Setup (Express + MongoDB)

1) Create `backend/.env`:

```bash
PORT=8080
MONGODB_URI=mongodb://127.0.0.1:27017/apna_vision
ADMIN_KEY=change_this_to_a_long_random_key
AUTH_JWT_SECRET=change_this_to_a_different_long_random_key
CORS_ORIGIN=http://localhost:5173
```

2) Install and run:

```bash
cd backend
npm install
npm run dev
```

Backend will run at `http://localhost:8080`.

### Admin API Protection
Admin endpoints require header:
- `x-admin-key: <ADMIN_KEY>`

---

## Frontend Setup (React)

1) Create `frontend/.env`:

```bash
VITE_API_BASE_URL=http://localhost:8080
```

2) Install and run:

```bash
cd frontend
npm install
npm run dev
```

Open `http://localhost:5173`.
Live Run:https://apna-vision-jet.vercel.app

---

## Pages
- `/` Home
- `/about` About
- `/services` Services
- `/training` Training (registration stored in MongoDB)
- `/portfolio` Portfolio
- `/contact` Contact (messages stored in MongoDB)
- `/signin` Sign In (Student/Client)
- `/signup` Sign Up (Student/Client)
- `/student` Student dashboard (protected)
- `/client` Client dashboard (protected)
- `/admin-login` Admin login
- `/admin` Admin panel (protected)

---

## Notes
- This project uses Tailwind `darkMode: 'class'` and stores theme preference in `localStorage`.
- Forms validate on client and server (basic).
- You can embed your real Google Map by replacing the iframe URL in `frontend/src/pages/Contact.jsx`.

---

## API Routes
- `POST /api/contact` → store contact message
- `POST /api/training` → store training registration
- `POST /api/leads/chatbot` → store chatbot lead (optional phone/email)
- `POST /api/auth/register` → register user (student/client)
- `POST /api/auth/login` → login user (student/client)
- `POST /api/auth/logout` → logout user
- `GET /api/auth/me` → current user (cookie session)
- `POST /api/admin/login` → admin login (sets httpOnly cookie)
- `POST /api/admin/logout` → admin logout (clears cookie)
- `GET /api/admin/me` → check admin session
- `GET /api/admin/contacts` (admin) → list contact messages
- `GET /api/admin/trainings` (admin) → list training registrations
 - `GET /api/admin/leads` (admin) → list chatbot leads

