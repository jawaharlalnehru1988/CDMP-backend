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
        await metric.save();
        res.status(201).json({message: "Metric logged successfully", metric});
    } catch (error) {
        res.status(500).json({message: "Error logging metric"});
    }
    } 

export const getPatientMatrics = async (req: Request, res: Response) => {
  try {
    if(typeof req.user !== "string" && req.user ){
      const userId = req.user.id;
      const metrics = await HealthMetric.find({user: userId});
      res.status(200).json(metrics);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching metrics", error });
  }
};

export const updateMetrics = async (req: Request, res: Response)=>{
  try{
    const value = req.body.data;
    const id = req.params.id;
    if(isNaN(value)){
         res.status(400).json({message:"Invalid data provided"});
         return;
    }
    const updateMet = await HealthMetric.findByIdAndUpdate(id, {$set: {value: value}}, {new: true});
        res.status(200).json(updateMet);
    } catch(errr){
      res.status(500).json({message: "could not update due to server error", errr})
    }
  }

