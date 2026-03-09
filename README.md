## Guess The Country

A short description of the Guess The Country project will go here.

### Dependencies

- `express` — backend HTTP server
- `ejs` — server-side templates for the frontend
- `pg` — PostgreSQL client

### Environment

The app can run with **no environment variables** (it uses a built-in demo PostgreSQL database). To use your own database instead, set **`POSTGRES_URL`** or **`DATABASE_URL`**; either overrides the demo. Example (PowerShell): `$env:POSTGRES_URL = "postgresql://user:pass@host/db?sslmode=require"`

### How to Run

**Prerequisites:** Node.js and npm. From the project root, run `npm install`. The demo DB is already seeded; to seed your own DB, set `POSTGRES_URL` or `DATABASE_URL` and run `node backend/seedCountries.js` once.

- **Zero setup (testers):** Run `node backend/server.js` and open `http://localhost:3000`. No env vars required; the app uses the built-in demo DB. To use your own DB, set `POSTGRES_URL` or `DATABASE_URL` before starting the server.
- **Vercel:** Deploy the repo to Vercel and set `POSTGRES_URL` in the project's environment variables. The app runs as a serverless function; you do not run `server.js` on Vercel.

### Project Structure

Details about the project structure will be added here.
