import React, { useState } from "react";

const AdminRegister = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch("http://localhost:5000/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, role: "admin" }),
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
          <div className="bg-blue-500 rounded-full w-16 h-16 flex items-center justify-center mb-2">
            <span className="text-white text-3xl font-bold">A</span>
          </div>
          <h2 className="text-2xl font-bold text-blue-500">Admin Registration</h2>
          <p className="text-gray-500">Create your admin account</p>
        </div>
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="mb-2 w-full p-3 border border-[#DADADA] rounded-lg focus:outline-blue-500 transition"
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-2 w-full p-3 border border-[#DADADA] rounded-lg focus:outline-blue-500 transition"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-4 w-full p-3 border border-[#DADADA] rounded-lg focus:outline-blue-500 transition"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegister;