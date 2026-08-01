# Render Deployment Fix — TODO

## Goal

Fix `Error: Cannot find module 'dotenv'` on Render so the portfolio deploys and runs successfully.

## Root Cause

- Render auto-deploys `master` branch, whose root `package.json` has **no `dependencies`** and **no `package-lock.json`**.
- Render's default install (`npm install`) runs only at repo root → nothing installed at root → `require("dotenv")` in `server/server.js` fails.

## Steps

- [ ] 1. Ensure root `package.json` contains all server runtime dependencies (dotenv, express, mongoose, cors, bcryptjs, nodemailer)
- [ ] 2. Generate root `package-lock.json` by running `npm install` at repo root
- [ ] 3. Make `dotenv` loading resilient in `server/server.js` (try/catch fallback)
- [ ] 4. Create `render.yaml` with explicit build/start commands and env vars
- [ ] 5. Update `README.md` deployment instructions
- [ ] 6. Merge fix to `master` and push (so Render picks it up)
- [ ] 7. Verify deployment on Render
