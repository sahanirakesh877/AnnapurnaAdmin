import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  // const products = [
  //   {
  //     id: 1,
  //     image: "https://via.placeholder.com/150",
  //     name: "Product 1",
  //     category: "Category 1",
  //     price: "$10",
  //     stock: 100,
  //   },
  //   {
  //     id: 2,
  //     image: "https://via.placeholder.com/150",
  //     name: "Product 2",
  //     category: "Category 2",
  //     price: "$20",
  //     stock: 50,
  //   },
  //   {
  //     id: 3,
  //     image: "https://via.placeholder.com/150",
  //     name: "Product 3",
  //     category: "Category 3",
  //     price: "$30",
  //     stock: 75,
  //   },
  // ];

  useEffect(() => {
    async function getProducts() {
      setLoading(true);
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/products`
        );
        if (response.data.success) {
          setProducts(response.data.products);
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong getting products");
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  async function handleDelete(id) {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setProducts(response.data.products);
      }
    } catch (err) {
      console.error(err);
    }
  }

  console.log(products);

  return (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <main className="flex-grow bg-gray-100 px-6">
          <h2 className="text-2xl font-bold text-gray-800  text-center py-2">
            Product List
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md">
              <thead className="bg-red-400">
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-300">
                    Image
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-300">Name</th>
                  <th className="px-4 py-2 border-b-2 border-gray-300">
                    Category
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-300">
                    Price
                  </th>

                  <th className="px-4 py-2 border-b-2 border-gray-300">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border-b flex justify-center">
                      <img
                        src={`${
                          import.meta.env.VITE_SERVERAPI
                        }/${product.image.replace(/\\/g, "/")}`}
                        alt={product.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </td>
                    <td className="px-4 py-2 border-b">{product.name}</td>
                    <td className="px-4 py-2 border-b">
                      {product.category.title}
                    </td>
                    <td className="px-4 py-2 border-b">Rs {product.price}</td>
                    <td className="px-4 py-2 border-b flex items-center">
                      <Link
                        to={`/${product._id}`}
                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition duration-300"
                      >
                        View
                      </Link>
                      {/* <button
                        onClick={() => navigate("/editproduct")}
                        className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition duration-300"
                      >
                        Edit
                      </button> */}
                      <button
                        className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                        onClick={() => handleDelete(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Home;
