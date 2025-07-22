import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await fetch("http://localhost:5000/api/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({ ...form, role: "admin" }),
  //   });
  //   // handle response...
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // start loading state
    setError(""); // Reset any previous error

    try {
      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, role: "admin" }),
      });

      const data = await response.json();
      console.log(data);
      if (response.ok) {
        // Successfully registered, navigate to login or dashboard
        navigate("/Admin"); // Replace with the route you want to navigate to
      } else {
        // Handle server error, show error message
        setError(data.message || "Something went wrong!");
      }
    } catch (error) {
      // Handle any unexpected errors (like network issues)
      setError(`Failed to register. Please try again later. ${error.message}`);
    } finally {
      setLoading(false); // stop loading state
    }
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
        {error && <p className="text-red-500 text-sm mb-2">{error}</p>} {/* Show error message */}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg font-semibold transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
        <div className="w-full text-center mt-2">
          <span>
            Already have an account?{' '}
            <button
              type="button"
              className="text-primary underline font-medium"
              onClick={() => { navigate(-1) }}
            >
              Login Now
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default AdminRegister;