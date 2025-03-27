import express from "express";
import { registerNewUser, loginUser } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", registerNewUser);
authRouter.post("/login", loginUser);

export default authRouter;