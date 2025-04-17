import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { users, User } from "../_model/user.model";
import process from "node:process";

// Named async function for signup
export async function signup(req: Request, res: Response): Promise<void> {
  const { name, email, password } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    res.status(400).json({ message: 'User already exists' });
    return;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser: User = {
    id: users.length + 1,
    name,
    email,
    password: hashedPassword,
  };
  users.push(newUser);
  res.status(201).json({ message: 'User registered successfully' });
}

// Named async function for login
export async function login(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email);
  if (!user) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    res.status(401).json({ message: 'Invalid credentials' });
    return;
  }

  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET as string, { expiresIn: '1h' });
  res.json({ token });
}

// Named async function for profile
export async function profile(req: Request, res: Response): Promise<void> {
  const user = users.find(u => u.id === req.user?.id);
  if (!user) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  res.json({ id: user.id, name: user.name, email: user.email });
}
