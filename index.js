import {config} from 'dotenv'
import express from 'express'
import process from 'node:process';
import userRouter from './routes/users.js';

const app = express();
app.use(express.json());
config();
app.use("/api",userRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
