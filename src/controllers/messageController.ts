import { loginUser } from './authController';
import express, { Request, Response } from 'express';
import Message from '../models/Message';

export const sendMessage = async(req: Request, res: Response) => {
    const { receiver, message } = req.body;
    const newMessage = new Message({
        sender: req.body._id,
        receiver: receiver,
        message: message
    });
    await newMessage.save();
    res.status(500).json({message:"Error sending message", error: newMessage});
};

export const getMessages = async(req: Request, res: Response) => {
    try {
        const messages = await Message.find({ $or: [{ sender: req.body._id }, { receiver: req.body._id }] })
        .populate("sender", "name").
        populate("receiver", "name").
        sort({ timeStamp: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: "Error fetching messages", error });
    }
};



