import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);

  console.log(loggedInUser);

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Annapurna</h1>
      </div>
      <nav className="flex flex-col flex-grow p-4">
        <>
          <Link
            to="/"
            className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
          >
            All Products
          </Link>
          <Link
            to="/addproducts"
            className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
          >
            Add Product
          </Link>

          <Link
            to="/getcategory"
            className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
          >
            Category
          </Link>

          <Link
            // to="/profile"
            className="mb-4 p-2 rounded border text-center bg-white text-xl text-black pointer-events-none"
          >
            {loggedInUser.fullname} (Admin)
          </Link>
          <Link
            to="/logout"
            className="mb-4 hover:bg-gray-700 p-2 rounded border text-center bg-red-500"
          >
            Logout
          </Link>
        </>
      </nav>
    </aside>
  );
};

export default SideBar;
