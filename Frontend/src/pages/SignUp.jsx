import { useState } from "react";
import axios from "axios"; 
import checklist from '../assets/images/checklist.svg'
import React from 'react'
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
     password: "",
    phoneNumber: "",
   
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await axios.post(`${BASE_URL}/api/auth/register`, formData, {
        withCredentials: true,
      });

 
      window.location.href = "/login";
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

       
        <div className="hidden md:flex items-center justify-center bg-indigo-50 p-10">
          <img
            src={checklist}
            alt="Register illustration"
            className="max-w-md"
          />
        </div>

      
        <div className="p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900">
              Create Account
            </h2>
            <p className="text-gray-500 mt-1">
              Join us and get started
            </p>

            {error && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email address"
                required
                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />

              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />

              <input
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                required
                className="w-full h-11 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChange}
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Creating account..." : "Register"}
              </button>
            </form>

            <p className="mt-6 text-sm text-gray-600 text-center">
              Already have an account?{" "}
              <a href="/login" className="text-indigo-600 font-medium">
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;


