import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/deleteConfirmation";

const CategoryProducts = () => {
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [delCon, setDelCon] = useState(false);

  const { categoryId } = useParams();

  console.log(categoryId);

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/products`,
          {
            params: {
              categoryId,
            },
          }
        );
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryProducts();
  }, [categoryId]);

  async function handleDelete(id) {
    try {
      setDeleting(true);
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setDeleting(false);
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  }

  console.log(products);

  return (
    <div className="flex flex-col min-h-screen w-full">
      <main className="flex-grow bg-gray-100 px-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center py-4">
          Product List for:
        </h2>

        {loading ? (
          <div className="text-center py-4">Loading Products...</div>
        ) : products.length < 1 ? (
          <div className="text-center py-4">No Product for this category</div>
        ) : (
          <div className="overflow-x-auto">
            <h2 className="text-center py-4 text-lg font-semibold">
              {products.length && products[0].category.title} Category:
            </h2>
            <table className="min-w-full bg-white rounded-lg shadow-md border-2 mb-8 text-lg py-6">
              <thead className="bg-[#16189e] text-white text-left">
                <tr>
                  <th className="px-4 py-2 border-2 border-gray-300">Image</th>
                  <th className="px-4 py-2 border-2 border-gray-300">Name</th>
                  <th className="px-4 py-2 border-2 border-gray-300">
                    Category
                  </th>
                  <th className="px-4 py-2 border-2 border-gray-300">Price</th>

                  <th className="px-4 py-2 border-2 border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 border-b-2 text-black "
                  >
                    <td className="px-4 py-2 flex justify-center ">
                      <img
                        src={`${
                          import.meta.env.VITE_SERVERAPI
                        }/${product.image.replace(/\\/g, "/")}`}
                        alt={product.name}
                        className="h-52 w-60 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-2 border-x-2">{product.name}</td>
                    <td className="px-4 py-2 border-r-2">
                      {product.category && product.category.title
                        ? product.category.title
                        : "please specify category again"}
                    </td>
                    <td className="px-4 py-2 border-r-2">Rs {product.price}</td>
                    <td className="px-4 py-2 flex justify-center items-center">
                      <Link
                        to={`/product/${product._id}`}
                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition duration-300"
                      >
                        View
                      </Link>
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                        // onClick={() => handleDelete(product._id)}
                        onClick={() => setDelCon(true)}
                      >
                        Delete
                      </button>
                      {delCon && (
                        <DeleteConfirmation
                          type={"product"}
                          name={product.name}
                          delFunc={() => {
                            handleDelete(product._id);
                          }}
                          setDelCon={setDelCon}
                          deleting={deleting}
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

export default CategoryProducts;
