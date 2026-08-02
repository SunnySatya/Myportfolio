# 👨‍💻 Shani Devpriya — Portfolio

A full-stack portfolio website built with a **React 19 + Vite** frontend and a **Node.js + Express 5** backend, backed by **MongoDB (Mongoose)**. It features a modern, responsive UI with dark/light mode, user registration & login, a contact form, and an admin dashboard to manage users and messages — plus automated email notifications on new registrations and logins.

---

## ✨ Features

- **Modern, responsive UI** — clean design with dark/light mode toggle
- **Lazy-loaded pages** — code splitting via `React.lazy` & `Suspense` for fast loads
- **SEO ready** — meta tags, Open Graph & Twitter cards, JSON-LD structured data via `react-helmet-async`
- **Contact form** — submissions stored in MongoDB and viewable from the admin dashboard
- **User authentication** — register & login with **bcrypt** password hashing
- **Admin dashboard** — view all registered users, contact messages, and dashboard statistics
- **Email notifications** — instant email alerts to the admin on new user registration and login (via Nodemailer / Gmail SMTP)
- **Toast notifications** — polished in-app feedback for user actions
- **Error boundaries & page loaders** — graceful fallbacks and loading states
- **Production-ready server** — serves the built React app, SPA fallback, and REST API from a single Express process

---

## 🧰 Tech Stack

### Frontend (`client/`)

| Technology             | Purpose                        |
| ---------------------- | ------------------------------ |
| **React 19**           | UI library                     |
| **Vite 7**             | Build tool & dev server        |
| **React Router 6**     | Client-side routing            |
| **react-helmet-async** | SEO & document head management |
| **react-icons**        | Icons                          |
| **ESLint**             | Code linting                   |

### Backend (`server/`)

| Technology          | Purpose                         |
| ------------------- | ------------------------------- |
| **Node.js** (>= 18) | Runtime                         |
| **Express 5**       | Web framework / REST API        |
| **Mongoose 9**      | MongoDB ODM                     |
| **bcryptjs**        | Password hashing                |
| **Nodemailer**      | Email notifications             |
| **cors**            | Cross-origin resource sharing   |
| **dotenv**          | Environment variable management |
| **nodemon**         | Auto-restart during development |

### Database

- **MongoDB** (local or [MongoDB Atlas](https://www.mongodb.com/atlas) cloud)

---

## 📁 Project Structure

```
My-Portfolio/
├── package.json              # Root scripts & shared metadata
├── client/                   # React frontend (Vite)
│   ├── index.html
│   ├── vite.config.js        # Dev server + /api proxy to :5000
│   ├── public/
│   │   └── images/           # Profile images
│   └── src/
│       ├── App.jsx           # Routes & app shell
│       ├── main.jsx
│       ├── components/       # Navbar, Footer, Toast, PageLoader,
│       │                     # ScrollToTop, ErrorBoundary, ...
│       └── pages/            # Home, About, Service, Contact,
│                             # Register, Login, Admin, Error
└── server/                   # Node.js + Express backend
    ├── server.js             # Express app entry point
    ├── controllers/          # auth, contact, admin logic
    ├── models/               # Mongoose schemas (User, Contact)
    ├── router/               # auth, contact, admin routes
    └── utils/
        ├── db.js             # MongoDB connection
        └── emailService.js   # Nodemailer notifications
```

---

## ✅ Prerequisites

Before you begin, make sure you have installed:

- **[Node.js](https://nodejs.org/)** **v18 or higher** (v20+ recommended)
- **npm** (comes with Node.js)
- **MongoDB** — either:
  - A local MongoDB instance, or
  - A free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (recommended for production)
- **(Optional)** A Gmail account with an [App Password](https://support.google.com/accounts/answer/185833) for email notifications

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/shanidevpriya/my-portfolio.git
cd My-Portfolio
```

### 2. Install dependencies

You can install both `client` and `server` dependencies at once:

```bash
npm run install:all
```

Or install them individually:

```bash
# Server
npm run install:server

# Client
npm run install:client
```

### 3. Configure environment variables

The server needs a `.env` file inside the `server/` directory:

```bash
cd server
cp .env.example .env   # if provided, otherwise create it manually
```

Create `server/.env` with the following variables:

```env
# Server
PORT=5000
NODE_ENV=development

# MongoDB connection string
MONGO_URI=mongodb://127.0.0.1:27017/my-portfolio
# Or use MongoDB Atlas:
# MONGO_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/my-portfolio

# Email notifications (optional)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-gmail-app-password
ADMIN_EMAIL=admin@example.com
```

> **Note:** Email notifications are optional. If `EMAIL_USER`/`EMAIL_PASS` are not set, the server will run normally and simply skip sending emails (a warning is logged).

### 4. Start the application (Development)

Run the backend and frontend in **two separate terminals**.

**Terminal 1 — Backend** (http://localhost:5000):

```bash
npm run dev:server
```

**Terminal 2 — Frontend** (http://localhost:5173):

```bash
npm run dev:client
```

Then open **http://localhost:5173** in your browser.

> The Vite dev server proxies all `/api` requests to `http://localhost:5000`, so no CORS issues occur during development.

---

## 🏗️ Production Build

Build the client for production and start the server:

```bash
# Build the client (installs deps + builds to client/dist)
npm run build

# Start the production server (serves API + built client)
npm start
```

The production server will:

1. Serve the static React build from `client/dist`
2. Fall back to `index.html` for any non-API GET/HEAD request (SPA routing)
3. Respond with JSON errors for unknown API routes

---

## 📡 API Reference

Base URL: `http://localhost:5000/api` (production: your deployed domain)

| Method | Endpoint              | Description                                                   | Auth    |
| ------ | --------------------- | ------------------------------------------------------------- | ------- |
| `GET`  | `/api/health`         | Health check — server status & timestamp                      | —       |
| `GET`  | `/api/auth`           | Welcome message                                               | —       |
| `POST` | `/api/auth/register`  | Register a new user (username, email, phone, password)        | —       |
| `POST` | `/api/auth/login`     | Login (email, password)                                       | —       |
| `POST` | `/api/form`           | Submit the contact form (username, email, message)            | —       |
| `GET`  | `/api/admin/users`    | List all registered users (password excluded)                 | Admin\* |
| `GET`  | `/api/admin/contacts` | List all contact form submissions                             | Admin\* |
| `GET`  | `/api/admin/stats`    | Dashboard stats (total users, contacts, admins, recent users) | Admin\* |

\* **Admin routes** are protected. They require an `x-user-email` request header with the email of a user whose `isAdmin` field is `true` in the database.

---

## ✉️ Email Notifications

The backend sends automated email notifications to the admin when:

- 🔔 A **new user registers** — includes name, email, phone, and timestamp
- 🔑 A **user logs in** — includes name, email, and timestamp

To enable this feature:

1. Use a Gmail account and generate an **[App Password](https://support.google.com/accounts/answer/185833)** (requires 2-Step Verification).
2. Set `EMAIL_USER`, `EMAIL_PASS`, and `ADMIN_EMAIL` in `server/.env`.
3. Restart the server.

Emails are sent in the background and **never block** the API response — if email sending fails, the request still succeeds.

---

## 🛡️ Admin Dashboard

The admin dashboard (`/admin`) lets you:

- View **all registered users**
- View **all contact form messages**
- See **dashboard statistics** (total users, total contacts, total admins, recent users)

To access the dashboard, your account must be flagged as an admin. Set `isAdmin: true` for your user directly in MongoDB:

```javascript
// Example — run in mongosh
db.users.updateOne({ email: "your@email.com" }, { $set: { isAdmin: true } });
```

---

## 📜 Available Scripts

All commands are run from the **project root**.

| Command                  | Description                                               |
| ------------------------ | --------------------------------------------------------- |
| `npm run install:client` | Install frontend dependencies                             |
| `npm run install:server` | Install backend dependencies                              |
| `npm run install:all`    | Install both client & server dependencies                 |
| `npm run dev:client`     | Start the Vite dev server on port 5173                    |
| `npm run dev:server`     | Start the API server with nodemon on port 5000            |
| `npm run build`          | Install deps and build the client to `client/dist`        |
| `npm start`              | Start the production server (serves API + built frontend) |

Additional client commands (run inside `client/`):

| Command           | Description                            |
| ----------------- | -------------------------------------- |
| `npm run dev`     | Start Vite dev server (port 5173)      |
| `npm run build`   | Build the production bundle to `dist/` |
| `npm run preview` | Preview the production build locally   |
| `npm run lint`    | Run ESLint                             |

---

## ☁️ Deployment (Render / Hosting)

The app is configured for deployment to **Render** (see the CORS allow-list in `server/server.js` which includes `https://myportfolio.onrender.com`).

1. **Push your code** to a Git repository.
2. **Create a new Web Service** on Render and connect your repo.
3. Set the build command to:
   ```bash
   npm run build
   ```
4. Set the start command to:
   ```bash
   npm start
   ```
5. Add the environment variables (`MONGO_URI`, `EMAIL_USER`, `EMAIL_PASS`, `ADMIN_EMAIL`, `NODE_ENV=production`) in the Render dashboard.
6. Deploy! The server will serve both the API and the built React app.

> The SPA fallback and static file serving are already implemented in `server/server.js`, so no additional static site hosting is required.

---

## 🧑‍💻 Author

**Shani Devpriya** — Mern Stack Developer

- GitHub: [@shanidevpriya](https://github.com/shanidevpriya)
- LinkedIn: [in/shanidevpriya](https://linkedin.com/in/shanidevpriya)

---

## 📄 License

This project is licensed under the **ISC License**. See the [LICENSE](./LICENSE) file for details.
