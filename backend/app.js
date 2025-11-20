import express from "express";
import dotenv from  "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import watchlistRoutes from " ./routes/watchlsitRoutes.js";
import notesRoutes from "./routes/notesRoutes.js";

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/watchlist", watchlistRoutes);
app.use("/api/notes", notesRoutes);

// Main route
app.get("/", (req, res) => {
    res.json("Backend running");
})