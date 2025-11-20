import dotenv from "dotenv";
import connectDB from "./config/db.js";
import app from "./app.js";

dotenv.config();

//Mongo DB connection
connectDB();

const PORT = process.env.PORT || 3000;