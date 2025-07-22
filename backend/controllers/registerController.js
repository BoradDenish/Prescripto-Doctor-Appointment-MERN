import userModel from '../models/userModel.js';
import doctorModel from '../models/doctorModel.js';

export const registerUser = async (req, res) => {
  const { name, email, password, role, specialization, phone } = req.body;

  try {
    if (role === "admin") {
      // You may want to create an admin model for proper storage
      return res.status(400).json({ message: "Admin registration not implemented in DB." });
    }

    if (role === "doctor") {
      const newDoctor = new doctorModel({
        name,
        email,
        password,
        image: '', // Provide default or required image path
        speciality: specialization,
        degree: '', // Add degree if available
        experience: '', // Add experience if available
        about: '', // Add about if available
        fees: 0, // Add fees if available
        address: { line1: '', line2: '' }, // Add address if available
        date: Date.now()
      });
      await newDoctor.save();
      return res.status(201).json({ message: "Doctor registered", user: newDoctor });
    }
  } catch (error) {
    return res.status(500).json({ message: "Registration failed", error: error.message });
  }
};