import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import teamRoutes from "./routes/teamRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB error:", err));

app.use("/teams", teamRoutes);

app.listen(4000, () => {
  console.log("Server running on port 4000");
});
