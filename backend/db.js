const { Pool } = require('pg');

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  // Keeping this explicit so missing config fails fast in development.
  // For production (e.g. Vercel) DATABASE_URL should also be provided.
  // eslint-disable-next-line no-console
  console.warn('DATABASE_URL is not set. PostgreSQL access will fail until it is configured.');
}

const pool = new Pool(
  connectionString
    ? { connectionString }
    : undefined,
);

async function getRandomCountry() {
  const result = await pool.query(
    'SELECT id, name, clues FROM countries ORDER BY RANDOM() LIMIT 1;',
  );
  return result.rows[0] || null;
}

async function getCountryById(id) {
  const result = await pool.query(
    'SELECT id, name, clues FROM countries WHERE id = $1;',
    [id],
  );
  return result.rows[0] || null;
}

module.exports = {
  pool,
  getRandomCountry,
  getCountryById,
};

