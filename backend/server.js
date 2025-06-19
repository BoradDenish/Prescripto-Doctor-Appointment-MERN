import express from "express";
import cors from 'cors';
import 'dotenv/config'; // This loads the .env file
import connectDB from "./config/mongodb.js"; // MongoDB connection
import connectCloudinary from "./config/cloudinary.js"; // Assuming Cloudinary is being used
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import multer from 'multer';  // Updated: Use import instead of require
import path from 'path';     // Updated: Use import instead of require
import { fileURLToPath } from 'url';  // To handle __dirname in ES modules

// Get the current directory path using import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 4000; // Default port or from .env

// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads', express.static('uploads'));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});

// Set storage engine for Multer (to specify where and how to save files)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the folder to save the files (uploads folder)
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    // Set the file name (avoid overwriting by using the original name with timestamp)
    cb(null, Date.now() + path.extname(file.originalname)); // e.g., 1634590234567.jpg
  }
});

// Initialize the multer upload function with the storage settings
const upload = multer({ storage: storage });

app.listen(port, () => console.log(`Server started on PORT: ${port}`));











// import express from "express"
// import cors from 'cors'
// import 'dotenv/config'
// import connectDB from "./config/mongodb.js"
// import connectCloudinary from "./config/cloudinary.js"
// import userRouter from "./routes/userRoute.js"
// import doctorRouter from "./routes/doctorRoute.js"
// import adminRouter from "./routes/adminRoute.js"

// // app config
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()
// connectCloudinary()

// // middlewares
// app.use(express.json())
// app.use(cors())

// // api endpoints
// app.use("/api/user", userRouter)
// app.use("/api/admin", adminRouter)
// app.use("/api/doctor", doctorRouter)

// app.get("/", (req, res) => {
//   res.send("API Working")
// });

// app.listen(port, () => console.log(`Server started on PORT:${port}`))