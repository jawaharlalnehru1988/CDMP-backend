import mongoose, { Schema, Document}  from "mongoose";

export interface IHealthMetric extends Document{
    user: mongoose.Types.ObjectId;
    type: "blood_sugar" | "blood_pressure" | "weight";
    value: number;
    date: Date;
}

const HealthMetricSchema: Schema<IHealthMetric> = new Schema({
    user: {type: Schema.Types.ObjectId, required:true},
    type: {type: String, enum:["blood_sugar", "blood_pressure", "weight"]},
    value: {type: Number, required:true},
    date: {type: Date, default: Date.now},
},
    {timestamps:true}
);

export default mongoose.model<IHealthMetric>("HealthMetric", HealthMetricSchema);