import mongoose from "mongoose";

export async function connectDB() {
  if (mongoose.connection.readyState >= 1) return;

  // const mongoURI = process.env.MONGODB_URI;
  const mongoURI = "mongodb://127.0.0.1:27017/task-manager";
  if (!mongoURI) {
    throw new Error("❌ MONGODB_URI is not defined in environment variables.");
  }

  try {
    await mongoose.connect(mongoURI);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Failed:", error);
  }
}
