import mongoose from 'mongoose';
import 'dotenv/config';

const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error('Mongo URI is missing from environment variables!');
  process.exit(1);
}

const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;
