import { Request, Response } from "express";
import HealthMetric from "../models/HealthMetric";

export const submitMetric = async (req:Request, res: Response) => {
    try{
        const { type, value, userId } = req.body;
        const metric = new HealthMetric({
            user: userId,
            type: type,
            value: value
        });
        console.log('metric :', metric);
        await metric.save();
        res.status(201).json({message: "Metric logged successfully", metric});
    } catch (error) {
        res.status(500).json({message: "Error logging metric"});
    }
    } 

export const getPatientMatrics = async (req: Request, res: Response) => {
  console.log('req :', req);
  try {
    const metrics = await HealthMetric.find({ user: req.body.userId })
      .populate("user", "name email") // Populate user details
    .limit(7);
    res.status(200).json(metrics);
    console.log('metrics :', metrics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching metrics", error });
  }
};
