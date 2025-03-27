import { configDotenv } from "dotenv";
import connectDB from "./config/db";
import express from "express";
import cors from "cors";
import authRouter from "./routes/authRoutes";
import metricRouter from "./routes/healthMetricRoutes";
import messageRouter from "./routes/messageRoutes";

const app = express();
app.use(express.json());
app.use(cors());

configDotenv();
connectDB();

app.use("/api/auth", authRouter);
app.use("/api", metricRouter);
app.use("/api/messages", messageRouter);

app.get("/", (req, res) => {
    res.send("Chronic Disease Management API is running");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
