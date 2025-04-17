import { Router } from 'express';
import { registerUser } from "../_handler/RegisterUser";
import { getUsers } from "../_handler/GetUser";
import { login, profile, signup } from "../_handler/SignupAndLogin";
import { authenticate } from "../_middleware/auth.moddleware";

const userRouter = Router();

userRouter.post('/create-user', registerUser);
userRouter.get('/users', getUsers);
userRouter.post('/signup', signup);
userRouter.post('/login', login);
userRouter.get('/profile', authenticate, profile);

export default userRouter;
