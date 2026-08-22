import mongoose from 'mongoose';

let isMongoConnected = false;

export const connectDB = async () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/svit_career_hub';
  try {
    const conn = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 3000 // Quick timeout to fallback smoothly if local mongod is not running
    });
    isMongoConnected = true;
    console.log(`[Database] MongoDB Connected: ${conn.connection.host}`);
    return true;
  } catch (error) {
    isMongoConnected = false;
    console.warn(`[Database Warning] MongoDB connection not available (${error.message}).`);
    console.log(`[Database Fallback] SVIT Career Hub is running using the zero-config High-Fidelity Mock & In-Memory Persistence Layer.`);
    return false;
  }
};

export const getDBStatus = () => isMongoConnected;
