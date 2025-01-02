import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import Pending from "./Pending"; // Import Pending com
import AdminImg from "../User/fintrack.webp"

const Adminlogin = () => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [token, setToken] = useState(""); // State to store the token

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `https://ftbackend.vercel.app/api/admin/login`,
        credentials,
        { headers }
      );

      if (response.status === 200) {
        setSuccess("Login successful!");
        setToken(response.data.token); // Set token in state
        localStorage.setItem("token", response.data.token); // Save token to local storage
        console.log("Token after login:", response.data.token); // Log token for debugging

        navigate("/all-users"); // Navigate to /admin-sidebar
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div>
      <section className="bg-white">
        <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
          {/* Left Section */}
          <section className="relative flex h-32 items-end bg-gray-900 lg:col-span-5 lg:h-full xl:col-span-6">
            <img
              alt="Fintrack"
              src={AdminImg}
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="hidden lg:relative lg:block lg:p-12">
              <h2 className="mt-6 text-2xl font-bold text-white sm:text-3xl md:text-4xl">
                Welcome to FinTrack
              </h2>
              <p className="mt-4 leading-relaxed text-white/90">Login</p>
            </div>
          </section>

          {/* Login Form */}
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
            <div className="max-w-xl lg:max-w-3xl">
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-6 gap-6">
                  <div className="col-span-6">
                    <label
                      htmlFor="Email"
                      className="text-base font-semibold text-gray-700"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="Email"
                      name="email"
                      value={credentials.email}
                      onChange={handleChange}
                      required
                      className="p-4 h-2 mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="Password"
                      className="text-base font-semibold text-gray-700"
                    >
                      Password
                    </label>
                    <input
                      type="password"
                      id="Password"
                      name="password"
                      value={credentials.password}
                      onChange={handleChange}
                      required
                      className="p-4 h-2 mt-1 w-full rounded-md border-2 border-gray-300 bg-white text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="col-span-6 sm:flex sm:flex-col sm:items-start sm:gap-4">
                    <button
                      type="submit"
                      className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500"
                    >
                      Login
                    </button>
                  </div>
                </div>
              </form>

              {error && <p className="mt-4 text-red-500">{error}</p>}
              {success && <p className="mt-4 text-green-500">{success}</p>}
            </div>
          </main>
        </div>
      </section>

      {token && <Pending token={token} />}
    </div>
  );
};

export default Adminlogin;
