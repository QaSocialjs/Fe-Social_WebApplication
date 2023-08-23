import "dotenv/config";
import mongoose from "mongoose";

const DB = process.env.DATABASE;
const connectToDatabase = async () => {
  try {
    const connection = await mongoose
      .connect(DB)
      .then((con) => console.log("Connected to MongoDB!"));
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectToDatabase;
