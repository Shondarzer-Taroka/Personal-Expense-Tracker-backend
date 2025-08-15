import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import expenseRoutes from './routes/expenseRoutes.js';
import { errorHandler, notFound } from './utils/errorHandler.js';
import userRoutes from "./routes/user.route.js";
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';

dotenv.config();

connectDB();

const app = express();


app.use(cors({
  origin: ["http://localhost:3000",'http://localhost:3001'],
  credentials: true
}));


app.use(express.json());
app.use(cookieParser());

app.use('/api/expenses', expenseRoutes);
app.use("/api/users", userRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;