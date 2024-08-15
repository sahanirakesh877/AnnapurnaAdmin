import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import SafeHtml from "../components/safeHtml";

export default function ProductDetails() {
  const { id } = useParams();
  console.log(id);

  const navigate = useNavigate();

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
        }
      } catch (err) {
        console.error(err);
        alert(err);
      } finally {
        setLoading(false);
      }
    }
    getSelectedProduct();
  }, [id]);

  console.log(selectedProduct);

  async function handleDelete() {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`
      );
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      {selectedProduct && !loading && (
        <div>
          <div>
            <div>
              <img
                src={`${
                  import.meta.env.VITE_SERVERAPI
                }/${selectedProduct.image.replace(/\\/g, "/")}`}
                alt=""
              />
            </div>
            <h2>{selectedProduct.name}</h2>
            <div>Brand: {selectedProduct.brand}</div>
            <div>Category: {selectedProduct.category.title}</div>
            <div>Price: Rs{selectedProduct.price}</div>
            <div>
              Description: <SafeHtml htmlString={selectedProduct.desc} />
            </div>
            <div>Added At: {selectedProduct.createdAt}</div>
          </div>
          <Link
            to={`/${id}/edit`}
            className="px-2 py-1 bg-blue-500 text-white rounded mr-2 hover:bg-blue-600 transition duration-300"
          >
            Edit
          </Link>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      )}
    </>
  );
}
