import pkg from "pg";
const { Pool } = pkg;

const pool = new Pool({
  host: "ep-autumn-wave-aooi3ics-pooler.c-2.ap-southeast-1.aws.neon.tech",
  database: "neondb",
  user: "neondb_owner",
  password: "npg_0RlEwNxyBHd2",
  port: 5432,
  ssl: { rejectUnauthorized: false },
  max: 3,
  idleTimeoutMillis: 30000,
});

export default pool;