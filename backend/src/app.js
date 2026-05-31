import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Health Check Route - FIRST
app.get("/", (req, res) => {
  res.json({ message: "Task Manager API Running" });
});

// Auth Routes
app.use("/api/auth", authRoutes);

// Task Routes  
app.use("/api/tasks", taskRoutes);

export default app;