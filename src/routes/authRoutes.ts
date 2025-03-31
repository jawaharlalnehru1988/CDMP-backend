import express from "express";
import { registerNewUser, loginUser, getUserById, getAllUsers, updateUserProfile, deleteUserProfile } from "../controllers/authController";

const authRouter = express.Router();

authRouter.post("/register", registerNewUser);
authRouter.post("/login", loginUser);

authRouter.get("/profile/:id", getUserById);
authRouter.get("/alluser", getAllUsers);

authRouter.put("/update/:id", updateUserProfile);
authRouter.delete("/delete/:id", deleteUserProfile);




export default authRouter;