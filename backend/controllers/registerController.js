import doctorModel from "../models/doctorModel.js";
import bcrypt from "bcrypt";
import validator from "validator";

// Register User Controller
export const registerUser = async (req, res) => {
  const {
    name,
    email,
    password,
    role,
    specialization,
    degree,
    experience,
    about,
    fees,
    address,
  } = req.body;

  const imageFile = req.file;

  try {
    // Handle non-doctor roles
    if (role !== "doctor") {
      return res.status(400).json({ message: "Only doctor registration is supported." });
    }

    // Check required fields
    if (
      !name ||
      !email ||
      !password ||
      !specialization ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address ||
      !imageFile
    ) {
      return res.status(400).json({ success: false, message: "Missing required details." });
    }

    // Check if email is already registered
    const existingDoctor = await doctorModel.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ success: false, message: "Email is already registered." });
    }

    // Validate email format
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email format." });
    }

    // Validate password length
    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Password must be at least 8 characters." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Construct image URL
    const imageUrl = `${process.env.SERVER_URL}/uploads/${imageFile.filename}`;

    // Create new doctor
    const newDoctor = new doctorModel({
      name,
      email,
      password: hashedPassword,
      speciality: specialization,
      degree,
      experience,
      about,
      fees,
      image: imageUrl,
      address,
      date: Date.now(),
    });

    // Save to DB
    await newDoctor.save();

    return res.status(201).json({ message: "Doctor registered successfully.", user: newDoctor });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};
