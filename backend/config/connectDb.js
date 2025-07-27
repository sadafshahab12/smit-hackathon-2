import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoDbUrl = process.env.MONGO_URI;

export const connectDb = async () => {
  if (!mongoDbUrl) {
    console.error("❌ MONGO_URI is not defined in .env");
    process.exit(1);
  }

  try {
    const conn = await mongoose.connect(mongoDbUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Hard fail in case of DB crash
  }
};