import dotenv from "dotenv";

dotenv.config();

export const config = {
  env: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,

  mongoURI: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET || "devSecret",
};
