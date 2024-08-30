import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/deleteConfirmation";

const GetCategory = () => {
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [delCon, setDelCon] = useState(false);

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
        `${import.meta.env.VITE_SERVERAPI}/api/v1/category/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
      setDeleting(false);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong while deleting the category");
      setDeleting(false);
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
        ) : category.length < 1 ? (
          <div className="text-center text-lg">
            No Categories Found. Add some products
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md border">
              <thead className="bg-[#16189e] text-white text-left">
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-300 border-r-2">
                    Category
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {category.map((cat) => (
                  <tr key={cat._id} className="hover:bg-gray-200">
                    <td className="px-4 py-2 border-b text-center border-r-2">
                      {cat.title}
                    </td>
                    <td className="px-4 py-2 border-b flex items-center text-start">
                      <Link
                        to={`/getcategory/${cat._id}`}
                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition duration-300"
                      >
                        View Products
                      </Link>
                      <button
                        // onClick={() => handleDelete(cat._id)}
                        onClick={() => setDelCon(true)}
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300 "
                        disabled={deleting}
                      >
                        {deleting ? "Deleting..." : "Delete"}
                      </button>
                      {delCon && (
                        <DeleteConfirmation
                          type={"category"}
                          name={cat.title}
                          delFunc={() => {
                            handleDelete(cat._id);
                          }}
                          setDelCon={setDelCon}
                        />
                      )}
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
