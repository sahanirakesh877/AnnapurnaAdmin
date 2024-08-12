import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/register', formData);
      console.log('Registration successful', response.data);
      // Handle success (e.g., redirect, show a message)
    } catch (error) {
      console.error('Error during registration', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">Register</h2>
      <form onSubmit={handleSubmit}>

      <div className="mb-2">
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            UserName
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
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
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
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
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
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Register
        </button>
      </form>
      <p className="mt-4 text-center text-gray-600">
        Already have an account? 
        <Link to="/login" className="text-blue-600 hover:underline ml-1">
          Login here
        </Link>
      </p>
    </div>
  </div>
  );
}

export default Register;
