## Guess The Country

A short description of the Guess The Country project will go here.

### Dependencies

- `express` — backend HTTP server
- `ejs` — server-side templates for the frontend
- `pg` — PostgreSQL client

### Environment

Set one of these so the app can connect to PostgreSQL:

- **`POSTGRES_URL`** — used when set (e.g. Vercel + Neon).
- **`DATABASE_URL`** — used if `POSTGRES_URL` is not set (e.g. local or Docker).

Example (PowerShell): `$env:POSTGRES_URL = "postgresql://user:pass@host/db?sslmode=require"`

### How to Run

1. **Prerequisites:** Node.js, npm, and a PostgreSQL database (e.g. Neon, local, Docker).
2. **Set connection:** Set `POSTGRES_URL` or `DATABASE_URL` in your environment.
3. **Install dependencies:** From the project root, run `npm install`.
4. **Seed the database (once):** Run `node backend/seedCountries.js`.
5. **Start the server:** Run `node backend/server.js`.
6. **Open in browser:** Go to `http://localhost:3000`.

### Project Structure

Details about the project structure will be added here.
