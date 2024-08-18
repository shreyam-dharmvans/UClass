import { Router } from "express";
import { loginUser, logoutUser } from "../controllers/authController.js";


export const authRouter = Router();

authRouter.post("/login", loginUser);
authRouter.post("/logout", logoutUser)