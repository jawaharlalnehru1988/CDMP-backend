import { Request, Response } from "express";
import User from "../models/User";
import jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_TOKEN || "MANAGEDISEASE";

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
       res.status(400).json({ message: "User already exists" });
       return;
    }
    const user = new User({ name, email, password, role });
    const savedUser = await user.save();
    res.status(201).json({ message: "User created successfully", user: savedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
       res.status(401).json({ message: "Invalid email or password" });
       return
    }
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
       res.status(401).json({ message: "Invalid email or password" });
       return;
    }
    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name },
      JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};


