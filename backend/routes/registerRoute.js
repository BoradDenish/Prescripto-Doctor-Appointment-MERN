import express from 'express';
import { registerUser } from "../controllers/registerController.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/register", upload.single("image"), registerUser);

export default router;
