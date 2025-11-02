import pkg from "pg";
const { Pool } = pkg;

// make a connection pool to supabase using env var
export const db = new Pool({
  connectionString: process.env.DB_CONN, // use DB_CONN value from .env
});
