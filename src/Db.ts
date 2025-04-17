import pkg from 'pg';
import { config } from 'dotenv';
import process from "node:process";

// Load environment variables from .env file
config();

// Extract Pool from the default import
const { Pool } = pkg;

// Ensure environment variables are loaded properly
const requiredEnvVars = ['DB_USER', 'DB_HOST', 'DB_NAME', 'DB_PASSWORD', 'DB_PORT'] as const;
for (const varName of requiredEnvVars) {
  if (!process.env[varName]) {
    throw new Error(`Missing environment variable: ${varName}`);
  }
}

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Test the database connection
pool.connect()
  .then(() => console.log('DB connected successfully'))
  .catch((err: unknown) => {
    if (err instanceof Error) {
      console.error('DB connection error:', err.message);
    } else {
      console.error('DB connection error:', err);
    }
  });


export default pool;
