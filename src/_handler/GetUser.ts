import { Request, Response } from "express";
import pool from "../Db";

export async function getUsers(req: Request, res: Response): Promise<void> {
  try {
    const result = await pool.query('SELECT * FROM users ORDER BY name ASC');
    
    if (result.rows.length === 0) {
      res.status(404).json({ error: 'No users found' });
      return;
    }

    res.status(200).json(result.rows);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
