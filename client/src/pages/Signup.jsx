import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Notify } from "../components/common/Notify";
import axios from "axios";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(false);

  const clearForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      clearForm();
      Notify("Passwords do not match", "error");
      setTimeout(() => {
        setError(false);
      }, 2000);
      // closeSnackbar(key);
      return;
    }
    setError(false);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_APP_BASE_URL}/api/signup`,
        {
          email,
          password,
          confirmPassword,
        },
      );

      if (response.status === 200 || response.status === 201) {
        Notify(`${response.data.message}`);
        clearForm();
        return;
      }
    } catch (error) {
      clearForm();
      console.error("Error during signup:", error);
      Notify(`${error.response.data.message}`, "error");
    }
  };

  return (
    <div className="mx-[1.5em] mt-10 flex h-auto w-full max-w-3xl flex-col overflow-hidden rounded-xl bg-white shadow-lg lg:flex-row">
      {/* Left Side (Form) */}
      <div className="w-full p-6 sm:p-10 lg:w-1/2">
        <form className="flex w-full flex-col gap-4" onSubmit={handleSubmit}>
          <h2 className="mb-4 text-2xl font-bold text-green-600">Sign Up</h2>

          <label
            htmlFor="email-input"
            className="text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email-input"
            className="h-10 w-full rounded-md border border-green-600 bg-gray-100 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none"
            placeholder="you@example.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
          />

          <label
            htmlFor="password-input"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            type="password"
            id="password-input"
            className={`h-10 w-full rounded-md border ${error ? "border-red-600" : "border-green-600"} bg-gray-100 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none`}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            required
          />

          <label
            htmlFor="confirm-password-input"
            className="text-sm font-medium text-gray-700"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirm-password-input"
            className={`h-10 w-full rounded-md border ${error ? "border-red-600" : "border-green-600"} bg-gray-100 px-3 text-sm text-gray-900 focus:ring-2 focus:ring-green-500 focus:outline-none`}
            placeholder="Confirm your password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
            required
          />

          <input
            type="submit"
            value="Submit"
            className="text-md mt-4 h-10 w-full rounded-md bg-green-500 font-semibold text-white transition duration-200 hover:bg-green-600"
          />

          <p className="mt-4 text-sm text-gray-600">
            Have an account?{" "}
            <Link to="/login" className="text-green-700 hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>

      {/* Right Side (Image & Welcome Message) */}
      <div className="hidden flex-col items-center justify-between bg-green-700 p-6 lg:flex lg:w-1/2">
        <div className="flex h-64 w-full items-center justify-center">
          <img
            src="/src/assets/login-image.jpg"
            alt="Login Visual"
            className="h-full w-full rounded-lg object-cover"
            loading="lazy"
          />
        </div>
        <h3 className="mt-6 text-center text-2xl font-semibold text-white">
          Welcome to SPRK Technologies
        </h3>
        <Link
          to="/login"
          className="mt-6 w-1/2 rounded-md bg-white py-2 text-center font-semibold text-green-700 transition hover:bg-gray-200"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Signup;
