const process = require("node:process");

// const { createClient } = require('@supabase/supabase-js');
// require('dotenv').config();

// const supabase = createClient(
//   process.env.SUPABASE_URL,
//   process.env.SUPABASE_KEY
// );

// module.exports = supabase;

const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

module.exports = pool;

