import React, { useState } from "react";

const DoctorRegister = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role: "doctor" }),
    });
    // handle response...
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9FD] to-[#e0e7ff]">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center mb-2">
            <span className="text-white text-3xl font-bold">D</span>
          </div>
          <h2 className="text-2xl font-bold text-green-500">
            Doctor Registration
          </h2>
          <p className="text-gray-500">Create your doctor account</p>
        </div>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="mb-2 w-full p-3 border border-[#DADADA] rounded-lg focus:outline-green-500 transition"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-2 w-full p-3 border border-[#DADADA] rounded-lg focus:outline-green-500 transition"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-2 w-full p-3 border border-[#DADADA] rounded-lg focus:outline-green-500 transition"
        />
        <input
          name="specialization"
          placeholder="Specialization"
          value={form.specialization}
          onChange={handleChange}
          required
          className="mb-2 w-full p-3 border border-[#DADADA] rounded-lg focus:outline-green-500 transition"
        />
        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          required
          className="mb-4 w-full p-3 border border-[#DADADA] rounded-lg focus:outline-green-500 transition"
        />
        <button
          type="submit"
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-lg font-semibold transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default DoctorRegister;