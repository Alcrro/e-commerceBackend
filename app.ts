import dotenv from "dotenv";
import app from "./src/infrastructure/http/server"; // Ensure this imports your express app instance

dotenv.config();

export default app;
