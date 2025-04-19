import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import process from 'node:process';

import pool from '../Db';


// Signup
export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists in the database

    console.log("Signup started");
    const existingUserResult = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    const existingUser = existingUserResult.rows[0];
    console.log("existingUser", existingUser);

    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user into the database
    await pool.query(
      'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)',
      [name, email.toLowerCase(), hashedPassword]
    );

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Signup failed', error });
  }
}

// Login
// export async function login(req: Request, res: Response): Promise<void> {
//   try {
//     const { email, password } = req.body;

//     if (!email || !password) {
//       res.status(400).json({ message: 'Email and password are required' });
//       return;
//     }

//     const user = users.find(
//       u => u.email.toLowerCase() === email.toLowerCase()
//     );

//     if (!user) {
//       res.status(401).json({ message: 'Invalid credentials (user not found)' });
//       return;
//     }

//     const isValidPassword = await bcrypt.compare(password, user.password);
//     if (!isValidPassword) {
//       res.status(401).json({ message: 'Invalid credentials (incorrect password)' });
//       return;
//     }

//     const token = jwt.sign(
//       { id: user.id, email: user.email },
//       process.env.JWT_SECRET as string,
//       { expiresIn: '1h' }
//     );

//     res.status(200).json({ message: 'Login successful', token });
//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({ message: 'Login failed', error: (error as Error).message });
//   }
// }
// // Profile (assumes JWT middleware sets req.user)
// export async function profile(req: Request, res: Response): Promise<void> {
//   try {
//     const userId = (req as any).user?.id; // cast if no extended type

//     const user = users.find(u => u.id === userId);
//     if (!user) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     res.json({ id: user.id, name: user.name, email: user.email });
//   } catch (error) {
//     res.status(500).json({ message: 'Could not fetch profile', error });
//   }
// }


export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email.toLowerCase()]);
    const user = result.rows[0];

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials (user not found)' });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: 'Invalid credentials (incorrect password)' });
      return;
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed', error: (error as Error).message });
  }
}
export async function profile(req: Request, res: Response): Promise<void> {
  try {
    const userId = (req as any).user?.id;

    const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [userId]);
    const user = result.rows[0];

    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Could not fetch profile', error });
  }
}
