import express from "express";
import cors from 'cors';
import 'dotenv/config'; // This loads the .env file
import connectDB from "./config/mongodb.js"; // MongoDB connection
import connectCloudinary from "./config/cloudinary.js"; // Assuming Cloudinary is being used
import userRouter from "./routes/userRoute.js";
import doctorRouter from "./routes/doctorRoute.js";
import adminRouter from "./routes/adminRoute.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// App config
const app = express();
const port = process.env.PORT || 3001; // Default port or from .env


// Connect to DB and Cloudinary
connectDB();
connectCloudinary();

// Middlewares
app.use(express.json());
app.use(cors());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API endpoints
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/doctor", doctorRouter);

app.get("/", (req, res) => {
  res.send("API Working");
});


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