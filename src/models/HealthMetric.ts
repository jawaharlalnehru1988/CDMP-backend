import mongoose, { Schema, Document}  from "mongoose";

export interface IHealthMetric extends Document{
    user: mongoose.Types.ObjectId;
    type: "blood_sugar" | "blood_pressure" | "weight";
    value: number;
}

const HealthMetricSchema: Schema<IHealthMetric> = new Schema({
    user: {type: Schema.Types.ObjectId, ref:"User", required:true},
    type: {type: String, enum:["blood_sugar", "blood_pressure", "weight"]},
    value: {type: Number, required:true},
},
    {timestamps:true}
);

export default mongoose.model<IHealthMetric>("HealthMetric", HealthMetricSchema);