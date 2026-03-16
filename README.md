## Guess The Country

A game where the user gets 3 clues for a random country and has to guess its name.

### Live app

**[https://guessthecountry-nadavmas.vercel.app](https://guessthecountry-nadavmas.vercel.app)**

### How to run the project locally

**Prerequisites:** Node.js and npm.

1. Clone the repo (or open the project folder).
2. From the project root, run: `npm install`.
3. Create a `.env` file in the project root and set `POSTGRES_URL` (or `DATABASE_URL`) to a valid PostgreSQL connection string.
4. (Optional, once per database) Run: `node backend/seedCountries.js` to create/seed the `countries` table.
5. Run: `node backend/server.js`.
6. Open `http://localhost:3000` in your browser.

### Dependencies

- **express** — HTTP server for the backend.
- **ejs** — Server-side templates for the frontend.
- **pg** — PostgreSQL client (connects to Neon when deployed, or the demo/local database when run locally).

### Project structure

The app runs **locally** (Node server with `listen`) or on **Vercel** (serverless). When deployed on Vercel, the database is powered by **Neon** via the `POSTGRES_URL` environment variable provided by the Vercel/Neon integration. Locally, the app uses the same Neon-compatible PostgreSQL — either a built-in demo URL or your own `POSTGRES_URL` / `DATABASE_URL`.

| Path | Purpose |
|------|--------|
| **api/index.js** | Vercel serverless entry: loads the Express app and exports it so every request is handled by the same app. |
| **backend/app.js** | Express application: routes (`/`, `/game`, `/game/validate`), middleware, helpers, error handler. No `listen` — used by both the local server and Vercel. |
| **backend/server.js** | Local-only entry: requires the app and calls `app.listen(PORT)` so you can run the app with `node backend/server.js`. |
| **backend/db.js** | Database layer: connects to PostgreSQL using `POSTGRES_URL` or `DATABASE_URL` (required, no built-in demo URL). Exposes `getRandomCountry` and `getCountryById`. |
| **backend/seedCountries.js** | One-time script: creates the `countries` table if needed and seeds it with the game data. Run locally when using a new or empty database. |
| **frontend/index.ejs** | Single EJS template: landing (Start a Game), game view (clues + guess form), and result/error views. |
| **frontend/styles.css** | Styles for the frontend; served as a static file by Express. |
| **vercel.json** | Vercel config: rewrites all routes to `/api` so the Express app handles every request on deploy. |
| **package.json** | npm manifest: project name, dependencies (express, ejs, pg), and scripts. |
