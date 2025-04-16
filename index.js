const process = require("node:process");
const express = require('express');
const pool = require('./Db.js');
require('dotenv').config();

const app = express();
app.use(express.json());

// GET all users
app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY name ASC');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST new user
app.post('/CreateUser', async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
