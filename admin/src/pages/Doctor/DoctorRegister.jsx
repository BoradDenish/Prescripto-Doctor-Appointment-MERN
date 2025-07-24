import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const DoctorRegister = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
    degree: "",
    experience: "",
    about: "",
    fees: "",
    image: "",
    address: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setForm({ ...form, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      Object.keys(form).forEach((key) => {
        formData.append(key, form[key]);
      });
      formData.append("role", "doctor");

      const response = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/Doctor");
      } else {
        setError(data.message || "Something went wrong!");
      }
    } catch (error) {
      setError(`Failed to register. Please try again later. ${error.message}`);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9FD] to-[#e0e7ff] px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-10 flex flex-col gap-8"
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-2">
          <div className="bg-green-500 rounded-full w-16 h-16 flex items-center justify-center">
            <span className="text-white text-3xl font-bold">D</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-green-600">
            Doctor Registration
          </h2>
          <p className="text-gray-500 text-sm">Create your doctor account</p>
        </div>

        {/* Input Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div className="flex flex-col">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Dr. John Doe"
              value={form.name}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Profile Image Upload */}
          <div className="flex flex-col">
            <label htmlFor="image" className="text-sm font-medium text-gray-700 mb-1">Profile Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="p-2 border border-gray-300 rounded-lg"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="mt-2 w-20 h-20 object-cover rounded-full border shadow"
              />
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="example@domain.com"
              value={form.email}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Specialization */}
          <div className="flex flex-col">
            <label htmlFor="specialization" className="text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input
              id="specialization"
              name="specialization"
              type="text"
              placeholder="Cardiologist"
              value={form.specialization}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Degree */}
          <div className="flex flex-col">
            <label htmlFor="degree" className="text-sm font-medium text-gray-700 mb-1">Degree</label>
            <input
              id="degree"
              name="degree"
              type="text"
              placeholder="MBBS, MD"
              value={form.degree}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Experience */}
          <div className="flex flex-col">
            <label htmlFor="experience" className="text-sm font-medium text-gray-700 mb-1">Experience (Years)</label>
            <input
              id="experience"
              name="experience"
              type="text"
              placeholder="10"
              value={form.experience}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Fees */}
          <div className="flex flex-col">
            <label htmlFor="fees" className="text-sm font-medium text-gray-700 mb-1">Consultation Fees ($)</label>
            <input
              id="fees"
              name="fees"
              type="number"
              placeholder="100"
              value={form.fees}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* About */}
          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label htmlFor="about" className="text-sm font-medium text-gray-700 mb-1">About</label>
            <input
              id="about"
              name="about"
              type="text"
              placeholder="Brief bio or specialization area"
              value={form.about}
              onChange={handleChange}
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Address */}
          <div className="col-span-1 md:col-span-2 flex flex-col">
            <label htmlFor="address" className="text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              id="address"
              name="address"
              placeholder="Clinic or hospital address"
              value={form.address}
              onChange={handleChange}
              required
              rows={3}
              className="p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>

        {/* Error */}
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-semibold transition"
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>

        {/* Redirect to Login */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <button
              type="button"
              className="text-green-600 font-medium underline"
              onClick={() => navigate(-1)}
            >
              Login Now
            </button>
          </p>
        </div>
      </form>
    </div>
);

};

export default DoctorRegister;