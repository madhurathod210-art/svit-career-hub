import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB, getDBStatus } from './config/db.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Route Imports
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import companyRoutes from './routes/companyRoutes.js';
import internshipRoutes from './routes/internshipRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import skillRoutes from './routes/skillRoutes.js';
import careerPathRoutes from './routes/careerPathRoutes.js';
import resourceRoutes from './routes/resourceRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import notificationRoutes from './routes/notificationRoutes.js';
import collegeInfoRoutes from './routes/collegeInfoRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import searchRoutes from './routes/searchRoutes.js';

dotenv.config();

const app = express();

// Middlewares
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health / Status check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    app: 'SVIT Student Career Hub API',
    timestamp: new Date(),
    database: getDBStatus() ? 'MongoDB Connected' : 'High-Fidelity In-Memory Persistence Layer',
    version: '1.0.0'
  });
});

// API Routes Mounting
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/companies', companyRoutes);
app.use('/api/internships', internshipRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/skills', skillRoutes);
app.use('/api/career-paths', careerPathRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/college-info', collegeInfoRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/search', searchRoutes);

// Error Handling
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Start Server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`\n======================================================`);
    console.log(`  🚀 SVIT Student Career Hub API Server Running!`);
    console.log(`  🌐 Port: http://localhost:${PORT}`);
    console.log(`  ⚡ Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  🗄️  Storage: ${getDBStatus() ? 'MongoDB' : 'Mock & In-Memory Store'}`);
    console.log(`======================================================\n`);
  });
};

startServer();
