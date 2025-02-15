import mongoose, { connect, connection } from "mongoose";
import { log } from "node:console";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("Database connection string (MONGODB_URI) is not defined.");
  }

  try {
    await connect(uri);
    log("Database connected successfully.");
  } catch (error) {
    log("Database connection failed:", error);
    process.exit(1);
  }

  connection.on("connected", () => {
    log("Mongoose connected to the database.");
  });

  connection.on("error", (err) => {
    log("Mongoose connection error:", err);
  });

  connection.on("disconnected", () => {
    log("Mongoose connection disconnected.");
  });
};

export default connectDB;
