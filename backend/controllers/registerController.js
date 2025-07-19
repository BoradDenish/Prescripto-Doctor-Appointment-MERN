const admins = [];
const doctors = [];

export const registerUser = (req, res) => {
  const { name, email, password, role, specialization, phone } = req.body;

  if (role === "admin") {
    const newAdmin = { id: Date.now().toString(), name, email, password };
    admins.push(newAdmin);
    return res.status(201).json({ message: "Admin registered", user: newAdmin });
  }

  if (role === "doctor") {
    const newDoctor = { id: Date.now().toString(), name, email, password, specialization, phone };
    doctors.push(newDoctor);
    return res.status(201).json({ message: "Doctor registered", user: newDoctor });
  }

  return res.status(400).json({ message: "Invalid role" });
};