const { Pool } = require('pg');

// Prefer POSTGRES_URL (Vercel/Neon) then DATABASE_URL (local or custom)
const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  // eslint-disable-next-line no-console
  console.warn('Neither POSTGRES_URL nor DATABASE_URL is set. PostgreSQL access will fail until one is configured.');
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

