import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { authAction } from "../redux/authSlice";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [logging, setLogging] = useState(false);

  const [formData, setFormData] = useState({
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
    setLogging(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/login`,
        formData
      );

      if (response.data.success) {
        const { user_token } = response.data;
        localStorage.setItem("token", user_token);

        toast.success("Login successful!");
        setFormData({
          email: "",
          password: "",
        });
        window.location.href = "/";
        dispatch(
          authAction.setLoggedInUser({
            email: response.data.email,
            name: response.data.name,
          })
        );
      } else {
        toast.error(response.data.message);
      }

      console.log("Login successful", response.data);
    } catch (error) {
      toast.error("Error during login");
      console.error("Error during login", error);
      setLogging(false);
    } finally {
      setLogging(false);
    }
  };

  return (
    <>
      {/* <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4"> */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
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
          <button
            type="submit"
            className={`w-full bg-blue-600 text-white py-2 px-4 rounded-lg transition duration-300 ${
              logging ? "cursor-not-allowed opacity-60" : "hover:bg-blue-700"
            }`}
            disabled={logging}
          >
            {logging ? "Logging..." : "Login"}
          </button>
        </form>
        {/* <p className="mt-4 text-center text-gray-600">
          Don't have an account?
          <Link to="/register" className="text-blue-600 hover:underline ml-1">
            Register here
          </Link>
        </p> */}
      </div>
      {/* </div> */}
    </>
  );
};

export default Login;
