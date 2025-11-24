import dotenv from "dotenv";
dotenv.config({path: './.env'});
import connectDB from "./config/db.js";
import app from "./app.js";

console.log("Loaded MONGO_URI:", process.env.MONGO_URI);


//Mongo DB connection
connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server running on Port: ${PORT}`)
})