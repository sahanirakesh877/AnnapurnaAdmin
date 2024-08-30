import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const [confirmPassword, setConfirmPassword] = useState();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== confirmPassword) {
      return toast.error("Passwords does not match");
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/register`,
        formData
      );

      if (response.data.success) {
        setFormData({
          name: "",
          email: "",
          password: "",
        });
        toast.success(response.data.message);
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Error during registration");
      console.error("Error during registration", error);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Admin Register
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="name"
          >
            Full name
          </label>
          <input
            type="text"
            name="name"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-2">
          <label
            className="block text-gray-700 text-sm font-semibold mb-2"
            htmlFor="confirmpassword"
          >
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmpassword"
            id="confirmpassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>
      {/* <p className="mt-4 text-center text-gray-600">
        Already have an account?
        <Link to="/login" className="text-blue-600 hover:underline ml-1">
          Login here
        </Link>
      </p> */}
    </div>
  );
};

export default Register;
