import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import SafeHtml from "../components/safeHtml";
import { DeleteConfirmation } from "../components/deleteConfirmation";

export default function ProductDetails() {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

  const [delCon, setDelCon] = useState(false);

  const [deleting, setDeleting] = useState(false);

  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState();

  useEffect(() => {
    async function getSelectedProduct() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`
        );
        if (response.data.success) {
          setSelectedProduct(response.data.product);
        } else {
          setSelectedProduct("not found");
        }
      } catch (err) {
        console.error(err);
        setSelectedProduct("error");
        // alert(err);
      } finally {
        setLoading(false);
      }
    }
    getSelectedProduct();
  }, [id]);

  console.log(selectedProduct);

  async function handleDelete() {
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
        navigate("/");
      } else {
        toast.error(response.data.message);
        setDeleting(false);
      }
    } catch (err) {
      console.error(err);
      setDeleting(false);
    }
  }

  return (
    <>
      {selectedProduct && !loading && (
        <section className="text-gray-600 body-font overflow-hidden">
          <div className="container px-5 py-24 mx-auto">
            {selectedProduct === "not found" ? (
              <div className="flex justify-center items-center">
                Product not found
              </div>
            ) : selectedProduct === "error" ? (
              <div className="flex justify-center items-center">
                Error finding product
              </div>
            ) : (
              <>
                <div className="w-full mb-10 flex justify-center items-center">
                  <Link
                    to={`/product/${id}/edit`}
                    className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition duration-300"
                  >
                    Edit
                  </Link>
                  <button
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
                    // onClick={handleDelete}
                    onClick={() => setDelCon(true)}
                  >
                    Delete
                  </button>
                </div>
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                  <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest text-uppercase">
                      Product Name
                    </h2>
                    <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">
                      {selectedProduct.name.toUpperCase()}
                    </h1>
                    <div className="flex mb-4">
                      <a className="flex-grow text-indigo-500 border-b-2 border-indigo-500 py-2 text-lg px-1">
                        Description
                      </a>
                    </div>
                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">Brand</span>
                      <span className="ml-auto text-gray-900">
                        {selectedProduct.brand}
                      </span>
                    </div>
                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">Listed On</span>
                      <span className="ml-auto text-gray-900">
                        {new Date(selectedProduct.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </span>
                    </div>
                    <div className="flex border-t border-gray-200 py-2">
                      <span className="text-gray-500">Type</span>
                      <span className="ml-auto text-gray-900">
                        {selectedProduct.category
                          ? selectedProduct.category.title
                          : "Please specify Category for this item"}
                      </span>
                    </div>
                    <p className="mb-4 bg-slate-100 p-2 rounded-md">
                      <SafeHtml htmlString={selectedProduct.desc} />
                    </p>
                    {/* <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Color</span>
                <span className="ml-auto text-gray-900">Blue</span>
              </div>
              <div className="flex border-t border-gray-200 py-2">
                <span className="text-gray-500">Size</span>
                <span className="ml-auto text-gray-900">Medium</span>
              </div>
              <div className="flex border-t border-b mb-6 border-gray-200 py-2">
                <span className="text-gray-500">Quantity</span>
                <span className="ml-auto text-gray-900">4</span>
              </div> */}
                    <div className="flex">
                      <span className="title-font font-medium text-2xl text-gray-900">
                        Rs.{selectedProduct.price}
                      </span>
                      <button className="flex ml-auto text-white bg-red-700 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                        Download Catalogue
                      </button>
                      {/* <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                  <svg
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                  </svg>
                </button> */}
                    </div>
                  </div>
                  {delCon && (
                    <DeleteConfirmation
                      type={"product"}
                      name={selectedProduct.name}
                      delFunc={() => {
                        handleDelete();
                      }}
                      setDelCon={setDelCon}
                      deleting={deleting}
                    />
                  )}
                  <img
                    alt="ecommerce"
                    className="lg:w-1/2 w-full h-[500px] object-cover object-center rounded"
                    src={`${
                      import.meta.env.VITE_SERVERAPI
                    }/${selectedProduct.image.replace(/\\/g, "/")}`}
                  />
                </div>
              </>
            )}
          </div>
        </section>
      )}
    </>
  );
}
