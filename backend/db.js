const { Pool } = require('pg');

const connectionString = process.env.POSTGRES_URL || process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error(
    'No PostgreSQL connection string configured. Set POSTGRES_URL or DATABASE_URL.',
  );
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

