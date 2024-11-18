import { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Events() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    async function getGallery() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/event`
        );
        if (response.data.success) {
          console.log(response.data);
          setEvents(response.data.events);
        }
      } catch (error) {
        if (error.response && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error(error.message);
        }
      }
    }
    getGallery();
  }, []);

  console.log(events);

  return (
    <>
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center  pb-8">
          <h2 className=" border-b-2 border-green-400 uppercase text-center text-3xl text-red-700 font-semibold">
            Events
          </h2>
        </div>
        {events.length ? (
          <div className="columns-1 gap-5 sm:columns-2 sm:gap-8 md:columns-3 lg:columns-4 [&>div:not(:first-child)]:mt-8 px-4">
            {events.map((photo, index) => (
              <div key={photo._id} className="relative group">
                <img
                  src={`${import.meta.env.VITE_SERVERAPI}/${photo.images[0]}`}
                  alt={photo.title}
                  className="w-full h-auto object-cover rounded-lg"
                  onClick={() => {
                    console.log("clicked");
                  }}
                />
                <button
                  className="absolute top-2 left-2 rounded-md p-2 bg-red-300 z-20 text-sm"
                  onClick={() => {
                    deleteHandler(photo.id);
                  }}
                >
                  Delete
                </button>
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg pointer-events-none">
                  {/* <span className="text-white text-lg font-semibold">{photo.title}</span> */}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>No images found</div>
        )}
      </div>
      <div className="flex justify-center items-center">
        <Link
          to="./add"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 my-12"
        >
          Add Photos
        </Link>
      </div>
    </>
  );
}
