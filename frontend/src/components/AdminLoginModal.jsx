import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const AdminLoginModal = ({ onClose, onLoginSuccess }) => {
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!credentials.email || !credentials.password) {
      toast.error("All fields are required", {
        position: "top-right",
        duration: 2000,
      });
      return;
    }
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_BASE_URL}/api/admin-auth/login`,
        credentials
      );
      const { token } = res.data;
      localStorage.setItem("adminToken", token);
      toast.success(res.data.message, {
        position: "top-right",
        duration: 2000,
      });

      setCredentials({
        email: "",
        password: "",
      });

      onLoginSuccess(); // Notify Navbar about login success

      onClose();
      // No need to navigate here if Navbar handles redirect on login success
      // navigate("/admin/dashboard");
    } catch (error) {
      console.error(
        "Error while admin login",
        error.response?.data || error.message
      );
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message, {
          position: "top-right",
          duration: 2000,
        });
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-xl bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Admin Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={credentials.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={credentials.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-md text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginModal;
