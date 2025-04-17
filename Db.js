import pkg from 'pg';
import { config } from 'dotenv';

// Load env variables
config();

// Extract Pool from the default import
const { Pool } = pkg;

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Test connection
pool.connect()
  .then(() => console.log('DB connected'))
  .catch((err) => console.error('DB connection error:', err));

export default pool;
