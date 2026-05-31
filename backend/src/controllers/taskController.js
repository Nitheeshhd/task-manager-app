import pool from "../config/db.js";

export const createTask = async (req, res) => {
  try {
    const { title, description, stage, priority = "medium" } = req.body;
    const userId = req.user.id;
    const result = await pool.query(
      `INSERT INTO tasks (title, description, stage, priority, user_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [title, description, stage, priority, userId]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getTasks = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query(
      `SELECT * FROM tasks WHERE user_id = $1 ORDER BY id DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, description, stage, priority = "medium" } = req.body;

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, stage = $3, priority = $4
       WHERE id = $5 AND user_id = $6
       RETURNING id, title, description, stage, priority, user_id, created_at`,
      [title, description, stage, priority, id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      `DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id`,
      [id, userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task Deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
