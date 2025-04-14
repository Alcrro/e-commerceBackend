import cookieParser from 'cookie-parser';
import express, {
  Application,
  NextFunction,
  ErrorRequestHandler,
  Request,
  Response,
} from 'express';
import cors from 'cors'; // For Cross-Origin Resource Sharing
import routers from './routes';
import { errorHandler } from './errorHandler';
// Create the Express application
const app: Application = express();

const corsOptions = {
  origin: 'http://localhost:3000', // Replace with frontend origin
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],

  credentials: true, // Required for credentials
};
// Middleware setup
app.use(cookieParser());
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded payloads
app.use(cors(corsOptions)); // Enable CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true'); // ✅ Explicitly allow credentials
  next();
});
app.use(express.json()); // Parse incoming JSON requests
app.use('/api', routers);
// Error handling middleware
app.use(errorHandler);
export default app;
