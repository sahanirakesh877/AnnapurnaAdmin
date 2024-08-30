import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FaPlus } from "react-icons/fa";
import toast from "react-hot-toast";
import { BeatLoader } from "react-spinners";
import { useNavigate, useParams } from "react-router-dom";

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
  ClassicEditor,
  Bold,
  Essentials,
  Heading,
  Indent,
  IndentBlock,
  Italic,
  Link,
  List,
  MediaEmbed,
  Paragraph,
  Table,
  Undo,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

const AddProduct = ({ edit, reupload }) => {
  const navigate = useNavigate();
  let id;
  if (edit) {
    id = useParams().id;
  }

  const editorRef = useRef();

  useEffect(() => {
    async function getSelectedProduct() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`
        );
        console.log(response.data);
        if (response.data.success) {
          setFormData({
            brand: response.data.product.brand,
            category:
              response.data.product.category && response.data.product.category
                ? response.data.product.category._id
                : null,
            description: response.data.product.desc,
            name: response.data.product.name,
            price: response.data.product.price,
          });
        }
      } catch (err) {
        console.error(err);
        alert(err);
      } finally {
        setLoading(false);
      }
    }
    if (edit) {
      getSelectedProduct();
    }
  }, [id]);

  const [formData, setFormData] = useState({
    image: null,
    name: "",
    description: "",
    price: "",
    category: "",
    brand: "",
  });

  const [categories, setCategories] = useState([]);

  const [addCategory, setAddCategory] = useState(false);
  const [newCategory, setNewCategory] = useState();

  const [loading, setLoading] = useState("false");

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function getCategories() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/category`
        );
        if (response.data.success) {
          setCategories(response.data.categories);
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong with the contact form");
      } finally {
        setLoading(false);
      }
    }
    getCategories();
  }, []);

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

    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("productImage", formData.image);
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("brand", formData.brand);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          image: null,
          name: "",
          description: "",
          price: "",
          category: "",
          brand: "",
        });
        setImagePreview(null);
        navigate("/");
        console.log("Product added successfully", response.data);
      } else {
        toast.error("smthng went wrong");
      }
      // Handle success (e.g., redirect, show a message)
    } catch (error) {
      console.error("Error adding product", error);
      // Handle error (e.g., show an error message)
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();

    setSubmitting(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category);
    formDataToSend.append("brand", formData.brand);

    try {
      const response = await axios.put(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/products/${id}`,
        {
          name: formData.name,
          description: formData.description,
          price: formData.price,
          category: formData.category,
          brand: formData.brand,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setFormData({
          image: null,
          name: "",
          description: "",
          price: "",
          category: "",
          brand: "",
        });
        console.log("Product edited successfully", response.data);
        navigate(`/${id}`);
      } else {
        toast.error(response.data.message);
      }
      // Handle success (e.g., redirect, show a message)
    } catch (error) {
      console.error("Error adding product", error);
      // Handle error (e.g., show an error message)
    } finally {
      setSubmitting(false);
    }
  };

  const addCategoryHandler = async (e) => {
    setLoading(true);
    console.log(newCategory);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVERAPI}/api/v1/category`,
        { title: newCategory },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        setCategories(response.data.categories);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error);
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong with the contact form");
    } finally {
      setLoading(false);
      setAddCategory(false);
    }
  };

  return (
    <div
      className={`flex items-center justify-center min-h-screen bg-gray-100 p-4 ${
        submitting && "opacity-60 cursor-not-allowed"
      }`}
    >
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center">
          {edit ? "Edit" : "Add"} Product
        </h2>
        <form
          onSubmit={edit ? handleEdit : handleSubmit}
          className={`${submitting && "pointer-events-none"}`}
        >
          <div className="mb-1 text-center relative">
            {!edit && (
              <>
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
              </>
            )}
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
              {/* <input
                type="text"
                name="category"
                id="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              /> */}
              {loading ? (
                <div className="d-flex">
                  Please wait <BeatLoader color="black" size={20} />
                </div>
              ) : addCategory ? (
                <>
                  <input
                    type="text"
                    placeholder="Category Name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  />
                  <button
                    className={`p-2 bg-green-800 text-white rounded-md m-2 ${
                      loading ? "cursor-wait" : ""
                    }`}
                    onClick={addCategoryHandler}
                    disabled={loading}
                  >
                    {loading ? "Adding" : "Add"}
                  </button>
                  <button
                    className="p-2 bg-red-800 text-white rounded-md m-2"
                    onClick={() => setAddCategory(false)}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <select
                  name="category"
                  id="blogcategory"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={formData.category}
                  onChange={(e) => {
                    if (e.target.value === "add-new") {
                      setAddCategory(true);
                    } else {
                      setFormData((prev) => ({
                        ...prev,
                        ["category"]: e.target.value,
                      }));
                    }
                  }}
                  required
                >
                  <option value="">Choose...</option>
                  {!loading && categories && categories.length ? (
                    categories.map((x, i) => (
                      <option value={x._id} key={i}>
                        {x.title}
                      </option>
                    ))
                  ) : (
                    <option value="" disabled>
                      No categories
                    </option>
                  )}
                  <option value="add-new">+ Add Category</option>
                </select>
              )}
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
            {/* <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            /> */}
            <CKEditor
              editor={ClassicEditor}
              id="blogDescription"
              className="p-4"
              config={{
                toolbar: [
                  "undo",
                  "redo",
                  "|",
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "|",
                  "link",
                  "insertTable",
                  "mediaEmbed",
                  "|",
                  "bulletedList",
                  "numberedList",
                  "indent",
                  "outdent",
                ],
                plugins: [
                  Bold,
                  Essentials,
                  Heading,
                  Indent,
                  IndentBlock,
                  Italic,
                  Link,
                  List,
                  MediaEmbed,
                  Paragraph,
                  Table,
                  Undo,
                ],
              }}
              data={formData.description}
              onReady={(editor) => {
                editorRef.current = editor;
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setFormData((prev) => ({
                  ...prev,
                  description: data,
                }));
              }}
            />
          </div>
          <button
            type="submit"
            className={`w-full bg-red-600 text-white py-2 px-4 rounded-lg  transition duration-300 ${
              submitting ? "cursor-wait bg-red-300" : "hover:bg-red-700"
            }`}
            disabled={submitting}
          >
            {submitting
              ? "Please Wait..."
              : edit
              ? "Edit Product"
              : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
