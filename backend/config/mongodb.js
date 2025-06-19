// import mongoose from "mongoose";

// const connectDB = async () => {

//     mongoose.connection.on('connected', () => console.log("Database Connected"))
//     await mongoose.connect(`${process.env.MONGODB_URI}/prescripto`)

// }

// export default connectDB;

// // Do not use '@' symbol in your databse user's password else it will show an error.



import mongoose from 'mongoose';

// Load environment variables from .env file
import 'dotenv/config';

// MongoDB URI from environment variables
const mongoUri = process.env.MONGO_URI;

// Check if Mongo URI is available
if (!mongoUri) {
  console.error('Mongo URI is missing from environment variables!');
  process.exit(1);
}

// Function to connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
};

export default connectDB;

