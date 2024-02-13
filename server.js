import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./db/connect.js";
import imgRouter from "./router/imgRouter.js";
import user from "./router/user.js";
import notFoundMiddleware from "./middleware/not-found.js";

dotenv.config();

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Enable CORS for all routes
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

app.use(express.static(path.resolve(__dirname, "./images")));
app.use(express.json());

// API Routes
app.use("/api/v1", imgRouter);
app.use("/api/v1/user", user);

// 404 Not Found Middleware
app.use(notFoundMiddleware);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 4000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    console.log("Connected to MongoDB...");

    const server = app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });

    // Graceful Shutdown
    process.on("SIGINT", () => {
      server.close(() => {
        console.log("Server is shutting down...");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("Error starting the server:", error);
  }
};

start();
