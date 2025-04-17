import { Request, Response } from "express";
import pool from "../Db";

export  async function registerUser(req: Request, res: Response):Promise<void> {
  try {
    console.log("Register User started");

    const { name, email } = req.body;

    const result = await pool.query(
      'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
      [name, email]
    );

    console.log("Register User ended");
      res.status(201).json(result.rows[0]);
  } catch (error: any) {
     res.status(500).json({ error: error.message });
  }
}
