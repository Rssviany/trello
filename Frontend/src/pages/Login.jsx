import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import login from '../assets/images/login.svg'
import { useNavigate } from "react-router-dom";
import React from 'react'
import { fecthUser } from "../redux/UserSlice";

const Login = () => {
  const dispatch = useDispatch()
  const { loading, error } = useSelector(state => state.user);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await dispatch(fecthUser(formData)).unwrap();

      // ✅ now result is real user data
      localStorage.setItem("user", JSON.stringify(result));

      navigate("/");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };
  return (
    <div className="min-h-screen bg-indigo-50 flex items-center justify-center">
      <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* LEFT IMAGE */}
        <div className="hidden md:flex items-center justify-center bg-indigo-100 p-10">
          <img
            src={login}
            alt="Login illustration"
            className="max-w-md"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 sm:p-12">
          <div className="max-w-md mx-auto">
            <h2 className="text-2xl font-semibold text-gray-900">
              Welcome Back
            </h2>
            <p className="text-gray-500 mt-1">
              Login to your account
            </p>

            {error && (
              <div className="mt-4 text-sm text-red-600 bg-red-50 p-2 rounded">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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

              <button
                type="submit"
                disabled={loading}
                className="w-full h-11 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
              >
                {loading ? "Logging in..." : "Login"}
              </button>
            </form>
            <p
              className="text-sm text-indigo-600 text-right cursor-pointer hover:underline"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot password?
            </p>


            <p className="mt-6 text-sm text-gray-600 text-center">
              Don’t have an account?{" "}
              <a href="/register" className="text-indigo-600 font-medium">
                Register
              </a>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
