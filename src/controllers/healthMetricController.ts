import { Request, Response } from "express";
import HealthMetric from "../models/HealthMetric";

export const submitMetric = async (req:Request, res: Response) => {
    try{
        const { type, value } = req.body;
        const metric = new HealthMetric({
            userId: req.user,
            type: type,
            value: value
        });
        await metric.save();
        res.status(201).json({message: "Metric logged successfully", metric});
    } catch (error) {
        res.status(500).json({message: "Error logging metric"});
    }
    } 

export const getPatientMatrics = async (req: Request, res: Response) => {
  try {
    const metrics = await HealthMetric.find({ user: req.params.id })
      .sort({ date: -1 })
      .limit(7);
    res.status(200).json(metrics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching metrics", error });
  }
};
