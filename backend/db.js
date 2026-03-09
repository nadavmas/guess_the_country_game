const { Pool } = require('pg');

// Built-in demo DB for testers (no env vars required). Override with POSTGRES_URL or DATABASE_URL.
const DEMO_CONNECTION_STRING =
  'postgresql://neondb_owner:npg_v8QqCrxf9TpS@ep-summer-sunset-a4n4nuaf-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require';

const connectionString =
  process.env.POSTGRES_URL || process.env.DATABASE_URL || DEMO_CONNECTION_STRING;

if (!process.env.POSTGRES_URL && !process.env.DATABASE_URL) {
  // eslint-disable-next-line no-console
  console.warn('Using built-in demo PostgreSQL connection. Set POSTGRES_URL or DATABASE_URL to use your own DB.');
}

const pool = new Pool({ connectionString });

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

