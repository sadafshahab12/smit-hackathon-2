import mongoose from "mongoose";
import dotenv from "dotenv";
import { Admin } from './../models/Admin.js';



dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");

  } catch (error) {
    console.error("MongoDB Error:", error);
    process.exit(1);
  }
};

const seedAdmin = async () => {
  await connectDB();
  const alreadyAdminExist = await Admin.findOne({
    email: process.env.EMAIL,
  });
  if (alreadyAdminExist) {
    console.log("Admin already exist");
    process.exit(0);
  }

  const admin = new Admin({
    name: process.env.NAME,
    email: process.env.EMAIL,
    password: process.env.PASSWORD,
  });

  await admin.save();
  console.log("Admin created successfully.");
  process.exit();
};

seedAdmin();
