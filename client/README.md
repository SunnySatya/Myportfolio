# Portfolio Client

React frontend for the Shani Devpriya portfolio website. Built with Vite, React 19, and React Router.

## Features

- Modern, responsive UI with dark/light mode toggle
- Lazy-loaded pages for code splitting
- Contact form wired to the Express backend
- User registration & login (JWT-free, MongoDB-backed)
- Admin dashboard for viewing users and contact messages
- SEO meta tags via `react-helmet-async`

## Scripts

| Command           | Description                       |
| ----------------- | --------------------------------- |
| `npm install`     | Install dependencies              |
| `npm run dev`     | Start Vite dev server (port 5173) |
| `npm run build`   | Production build to `dist/`       |
| `npm run preview` | Preview the production build      |
| `npm run lint`    | Run ESLint                        |

## API Proxy

During development, the Vite dev server proxies `/api` requests to the backend at `http://localhost:5000` (see `vite.config.js`).

## Backend

The API server lives in the `server/` directory at the project root. See the root `README.md` for full-stack setup instructions.
</content>
