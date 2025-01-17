import express from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import authenticate from "../middlewares/authUser.middleware.js";

const userRouter = express.Router();

userRouter.post('/signup', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', authenticate, logoutUser);

export default userRouter