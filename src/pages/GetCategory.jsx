import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const GetCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/category`
        );
        if (response.data.success) {
          setCategory(response.data.categories);
        } else {
          toast.error("Failed to load categories");
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        toast.error("Something went wrong getting categories");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/category/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);

        // Update the category list after deletion
        setCategory((prevCategories) =>
          prevCategories.filter((cat) => cat._id !== id)
        );
      } else {
        toast.error("Failed to delete the category");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting the category");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-grow bg-gray-100 px-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">
          Category List
        </h2>

        {loading ? (
          <div className="text-center py-4">Loading categories...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-red-400">
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-300">
                    Category
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.map((cat) => (
                  <tr key={cat.id} className="hover:bg-gray-200">
                    <td className="px-4 py-2 border-b text-center">
                      {cat.title}
                    </td>
                    <td className="px-4 py-2 border-b flex items-center text-start">
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 "
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default GetCategory;
