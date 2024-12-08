import { useRef } from "react";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export default function EventUpload() {
  const [title, setTitle] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const { eventId } = useParams();

  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  // Handle change for title
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    setErrors({ ...errors, title: "" });
  };

  // Handle change for images
  const handleImageChange = (e) => {
    const selectedFiles = Array.from(e.target.files); // Convert FileList to an array
    if (selectedFiles.length) {
      setImages(selectedFiles);

      // Generate preview URLs for all selected images
      const previews = selectedFiles.map((file) => URL.createObjectURL(file));
      setImagePreviews(previews);
      setErrors({ ...errors, images: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!title && !eventId) {
      setErrors({ ...errors, title: "Please enter a title!" });
      return;
    }

    if (!images.length) {
      setErrors({ ...errors, images: "Please select at least one image!" });
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    images.forEach((image) => formData.append("event", image));
    try {
      let response;
      if (eventId) {
        response = await axios.post(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/event/${eventId}`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      } else {
        response = await axios.post(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/event`,
          formData,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
      }
      console.log("response received", response);

      if (response.data.success) {
        toast.success(response.data.message);
        setTitle("");
        setImages([]);
        setImagePreviews([]);
        navigate("/event");
      } else {
        console.error("Form submission failed:", response.statusText);
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
      console.error(error);
    }
  };

  return (
    <>
      <div className="box">
        <div className="container">
          <section className="min-h-screen flex flex-col items-center justify-center py-4">
            <div className="container">
              <div className="row justify-center">
                <div className="col-lg-4 col-md-6 flex flex-col items-center justify-center">
                  <h3 className="flex justify-center py-4">
                    <span className="hidden lg:block border-b-2 border-red-500">
                      {eventId ? "Add photos to event" : "Add Event"}
                    </span>
                  </h3>
                  <div className="card mb-3 rounded-md p-3 shadow-lg">
                    <div className="card-body py-4">
                      <form
                        className="space-y-4 needs-validation"
                        noValidate
                        method="post"
                        onSubmit={handleSubmit}
                      >
                        {!eventId && (
                          <div className="w-full">
                            <label
                              htmlFor="title"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Event Name
                            </label>
                            <input
                              type="text"
                              name="title"
                              className={`w-full px-4 py-2 border rounded-md ${
                                errors.title
                                  ? "border-red-500"
                                  : "border-gray-300"
                              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                              id="title"
                              value={title}
                              onChange={handleTitleChange}
                              required
                            />
                            {errors.title && (
                              <div className="text-sm text-red-500">
                                {errors.title}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Image input */}
                        <div className="w-full">
                          <label
                            htmlFor="galleries"
                            className="block text-sm font-medium text-gray-700"
                          >
                            Images
                          </label>
                          <input
                            type="file"
                            name="images"
                            className={`w-full px-4 py-2 border rounded-md ${
                              errors.images
                                ? "border-red-500"
                                : "border-gray-300"
                            } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                            id="galleries"
                            accept="image/*"
                            multiple
                            onChange={handleImageChange}
                            ref={fileInputRef}
                            required
                          />
                          {errors.images && (
                            <div className="text-sm text-red-500">
                              {errors.images}
                            </div>
                          )}
                        </div>

                        {/* Preview of selected images */}
                        {imagePreviews.length > 0 && (
                          <div className="w-full">
                            <div className="grid grid-cols-3 gap-3">
                              {imagePreviews.map((preview, index) => (
                                <div className="w-full" key={index}>
                                  <img
                                    src={preview}
                                    alt={`Selected ${index}`}
                                    className="w-28 h-auto border"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        <p className="text-sm">
                          <strong>**</strong>Make sure that all the images are
                          less than 2mb.
                        </p>
                        {/* Submit button */}
                        <div className="w-full">
                          <button
                            className="w-full px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                            type="submit"
                          >
                            {eventId ? "Add Image" : "Upload Images"}
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
