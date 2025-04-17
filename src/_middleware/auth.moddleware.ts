import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import process from "node:process";

// Interface for JWT payload
interface TokenPayload extends JwtPayload {
  id: number;
  email: string;
}

// Extend Express Request interface to include `user`
declare module 'express-serve-static-core' {
  interface Request {
    user?: TokenPayload;
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'] as string | undefined;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ message: 'Token missing or malformed' });
    return;
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as TokenPayload;
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};
