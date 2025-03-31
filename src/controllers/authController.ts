import { Request, Response } from "express";
import User from "../models/User";
import jwt  from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_TOKEN || "MANAGEDISEASE";

export const registerNewUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password, role } = req.body;
    const isUserExists = await User.findOne({ email });
    if (isUserExists) {
       res.status(400).json({ message: "User already exists" });
       return;
    }
    const user = new User({ username, email, password, role });
    console.log('user :', user);
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
      { id: user._id, role: user.role, username: user.username },
      JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const updateUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const { name, email, password } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, email, password },
      { new: true }
    ).select("-password");
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};

export const deleteUserProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "Internal server error", error });
  }
};


