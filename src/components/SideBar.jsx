import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const SideBar = () => {
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);

  return (
    <aside className="w-64 bg-gray-800 text-white flex flex-col">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Annapurna</h1>
      </div>
      <nav className="flex flex-col flex-grow p-4">
        {loggedInUser ? (
          <>
            <Link
              to="/"
              className="mb-4 hover:bg-gray-700 p-2 rounded bg-red-500 text-center"
            >
              Home
            </Link>
            <Link
              to="/addproducts"
              className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
            >
              AddProduct
            </Link>

            <Link
              to="/getcategory"
              className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
            >
              Category
            </Link>
            <Link
              to="/logout"
              className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
            >
              Logout
            </Link>
            <Link
              to="/profile"
              className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
            >
              {loggedInUser.name}
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/register"
              className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
            >
              Register
            </Link>
            <Link
              to="/login"
              className="mb-4 hover:bg-gray-700 p-2 rounded border text-center"
            >
              Login
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
};

export default SideBar;
