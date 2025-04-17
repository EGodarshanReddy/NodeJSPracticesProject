import pool from "../Db.js";
export async function getUsers (req, res) {
    try {
      const result = await pool.query('SELECT * FROM users ORDER BY name ASC');
      res.json(result.rows);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }