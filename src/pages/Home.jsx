import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { DeleteConfirmation } from "../components/deleteConfirmation";
import ReactPaginate from "react-paginate";

const Home = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [delCon, setDelCon] = useState(false);
  const [productName, setProductName] = useState("");
  const [productId, setProductId] = useState("");

  const [currentPage, setCurrentPage] = useState(0); // Pagination state
  const productsPerPage = 6; // Number of products per page

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
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setDelCon(false);
    }
  }

  // Pagination logic
  const pageCount = Math.ceil(products.length / productsPerPage);
  const displayProducts = products.slice(
    currentPage * productsPerPage,
    (currentPage + 1) * productsPerPage
  );

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected);
  };

  if (!loading && products.length < 1) {
    return (
      <div className="h-full w-full border border-black flex justify-center items-center text-xl font-semibold flex-col">
        <p>No Products to show.</p>
        <Link
          to="/addproducts"
          className="border border-black p-2 rounded-md mt-4"
        >
          Add Product
        </Link>
      </div>
    );
  }

  return !loading ? (
    <>
      <div className="flex flex-col min-h-screen w-full">
        <main className="flex-grow bg-gray-100 px-6">
          <h2 className="text-2xl font-bold text-gray-800 text-center py-2">
            Product List
          </h2>

          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg shadow-md border-2 mb-8 text-lg py-6 min-h-screen">
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
                {displayProducts.map((product, index) => {
                  return (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 border-b-2 text-black "
                    >
                      <td className="px-4 py-2 flex justify-center">
                        <img
                          src={`${
                            import.meta.env.VITE_SERVERAPI
                          }/${product.image.replace(/\\/g, "/")}`}
                          alt={product.name}
                          className="h-52 w-60 object-contain rounded-lg"
                        />
                      </td>
                      <td className="px-4 py-2 border-x-2">{product.name}</td>
                      <td className="px-4 py-2 border-r-2">
                        {product.category && product.category.title
                          ? product.category.title
                          : "Please specify category again"}
                      </td>
                      <td className="px-4 py-2 border-r-2">
                        Rs {product.price}
                      </td>
                      <td className="px-4 py-2">
                        <Link
                          to={`/product/${product._id}`}
                          className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition duration-300"
                        >
                          View
                        </Link>
                        <button
                          className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                          onClick={() => {
                            setDelCon(true);
                            setProductName(product.name); // Set the name of the clicked product
                            setProductId(product._id); // Set the ID of the clicked product
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {delCon && (
              <DeleteConfirmation
                type={"product"}
                name={productName}
                delFunc={() => {
                  handleDelete(productId);
                }}
                setDelCon={setDelCon}
              />
            )}

            {/* Pagination Component */}
            <ReactPaginate
              previousLabel={<span className="block">Previous</span>} // Ensure full button is clickable
              nextLabel={<span className="block">Next</span>}
              breakLabel={<span className="block">...</span>}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageClick}
              containerClassName={
                "flex justify-center space-x-2 my-4 text-red-800 text-lg"
              }
              pageClassName={
                "px-3 py-1 rounded-md bg-white border border-red-300 hover:bg-red-200 transition block"
              }
              pageLinkClassName={"block w-full h-full text-center"} // Make the entire page number area clickable
              previousClassName={
                "px-4 py-2 rounded-md bg-red-800 text-white hover:bg-red-700 transition block"
              }
              nextClassName={
                "px-4 py-2 rounded-md bg-red-800 text-white hover:bg-red-700 transition block"
              }
              activeClassName={
                "px-3 py-1 rounded-md bg-blue-500 text-white font-bold block"
              }
              disabledClassName={"opacity-50 cursor-not-allowed block"}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  ) : (
    <div className="w-full h-full flex justify-center items-center text-3xl font-semibold">
      Please Wait...
    </div>
  );
};

export default Home;
