import mongoose from "mongoose";
import dotenv from "dotenv";

const connectDB = async () => {
    try{

        console.log("MONGO_URI: ", process.env.MONGO_URI)
        const connect = await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to MongoDB");
    } catch (err) {
        console.log(err)
    }
}

export default connectDB;