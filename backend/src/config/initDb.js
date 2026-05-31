import pool from "./db.js";

const initDB = async () => {
  try {

    console.log("Creating tables...");

    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(100),
        email VARCHAR(255) UNIQUE,
        password VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        stage VARCHAR(50),
        priority VARCHAR(20) DEFAULT 'medium',
        user_id INTEGER REFERENCES users(id),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    await pool.query(`
      ALTER TABLE tasks
      ADD COLUMN IF NOT EXISTS priority VARCHAR(20) DEFAULT 'medium'
    `);

    console.log("Tables Ready");

  } catch (error) {

    console.error("Init DB Error:");
    console.error(error);

  }
};

export default initDB;
