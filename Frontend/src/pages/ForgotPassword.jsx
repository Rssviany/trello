import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    otp: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const sendOtp = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:6969/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // include cookies in request
        body: JSON.stringify({ email: form.email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to send OTP");
      }

      setStep(2);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetPassword = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("http://localhost:6969/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // include cookies in request
        body: JSON.stringify({
          email: form.email,
          otp: form.otp,
          newPassword: form.password,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Failed to reset password");
      }

      navigate("/login");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-indigo-50">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg transition-all hover:shadow-2xl">
        <h2 className="text-2xl font-semibold text-center mb-6">
          {step === 1 ? "Forgot Password" : "Reset Password"}
        </h2>

        {error && (
          <p className="text-red-500 mb-4 text-center font-semibold">{error}</p>
        )}

        {step === 1 && (
          <>
            <input
              type="email"
              name="email"
              placeholder="Registered Email"
              className="w-full h-11 border px-4 rounded-lg mb-4 focus:ring-2 focus:ring-indigo-500"
              onChange={handleChange}
              value={form.email}
              required
            />
            <button
              onClick={sendOtp}
              disabled={loading || !form.email}
              className={`w-full py-2 rounded-lg text-white transition ${
                loading || !form.email
                  ? "bg-indigo-300 cursor-not-allowed"
                  : "bg-indigo-600 hover:bg-indigo-700"
              }`}
            >
              {loading ? "Sending OTP..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <input
              type="text"
              name="otp"
              placeholder="Enter OTP"
              className="w-full h-11 border px-4 rounded-lg mb-3"
              onChange={handleChange}
              value={form.otp}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="New Password"
              className="w-full h-11 border px-4 rounded-lg mb-4"
              onChange={handleChange}
              value={form.password}
              required
            />
            <button
              onClick={resetPassword}
              disabled={
                loading || !form.otp || form.password.length < 6
              }
              className={`w-full py-2 rounded-lg text-white transition ${
                loading || !form.otp || form.password.length < 6
                  ? "bg-green-300 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Resetting Password..." : "Reset Password"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
