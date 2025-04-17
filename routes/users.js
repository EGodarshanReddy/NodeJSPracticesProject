
import {Router} from 'express';
import { registerUser } from '../_handler/RegisterUser.js';
import { getUsers } from '../_handler/GetUser.js';

const userRouter=Router();

userRouter.post('/CreateUser',registerUser);
userRouter.get('/users', getUsers)

export default userRouter;