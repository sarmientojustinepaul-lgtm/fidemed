const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL + '?pgbouncer=true',
  ssl: { rejectUnauthorized: false }
});

module.exports = pool;