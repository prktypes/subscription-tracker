import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

const connectDB = async () => {
  try {
    console.log("Attempting DB connection...");
    console.log("DB_URI:", DB_URI); // debug

    await mongoose.connect(DB_URI);

    console.log(`MongoDB Connected Successfully in ${NODE_ENV} mode`);
  } catch (error) {
    console.error("MongoDB connection error:");
    console.error(error.message); 
    process.exit(1);
  }
};

export default connectDB;
