import React, { useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "image" ? files[0] : value,
    }));
    if (name === "image" && files[0]) {
      setImagePreview(URL.createObjectURL(files[0]));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("image", formData.image);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("brand", formData.brand);

    try {
      const response = await axios.post(
        "http://localhost:5000/products",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Product added successfully", response.data);
      // Handle success (e.g., redirect, show a message)
    } catch (error) {
      console.error("Error adding product", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          Add Product
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-1 text-center relative">
            <input
              type="file"
              name="image"
              id="image"
              onChange={handleChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              required
            />
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-full mx-auto flex items-center justify-center relative">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <FaPlus className="text-gray-500 text-3xl" />
              )}
            </div>
            <label
              htmlFor="image"
              className="absolute inset-0 flex items-center justify-center cursor-pointer"
            ></label>
          </div>
          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-semibold mb-1"
              htmlFor="price"
            >
              Price
            </label>
            <input
              type="text"
              name="price"
              id="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex justify-between mb-2">
            <div className="w-full pr-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-1"
                htmlFor="category"
              >
                Category
              </label>
              <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="w-full pl-2">
              <label
                className="block text-gray-700 text-sm font-semibold mb-1"
                htmlFor="brand"
              >
                Brand
              </label>
              <input
                type="text"
                name="brand"
                id="brand"
                value={formData.brand}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="mb-2">
            <label
              className="block text-gray-700 text-sm font-semibold mb-2"
              htmlFor="description"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition duration-300"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
