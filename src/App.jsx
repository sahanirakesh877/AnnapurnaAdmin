import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/productDetails";
import Logout from "./pages/Logout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authAction } from "./redux/authSlice";
import toast from "react-hot-toast";
import GetCategory from "./pages/GetCategory";

const App = () => {
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);

  const dispatch = useDispatch();

  useEffect(() => {
    async function checkForLoggedInUser() {
      try {
        const response = await axios.post(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/token`,
          {},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        if (response.data.success) {
          dispatch(authAction.setLoggedInUser(response.data.user));
        } else {
          localStorage.removeItem("token");
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        alert("error getting user");
      }
    }

    if (localStorage.getItem("token")) {
      checkForLoggedInUser();
    }
  }, []);

  console.log(loggedInUser);

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-grow">
        <Routes>
          {loggedInUser ? (
            <>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<ProductDetails />} />
              <Route path="/:id/edit" element={<AddProduct edit={true} />} />

              <Route path="/addproducts" element={<AddProduct />} />
              <Route path="/" element={<Home />} />
              <Route path="/getcategory" element={<GetCategory />} />
              <Route path="/editproduct" element={<EditProduct />} />

              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/register" element={<Register />} />
              <Route path="*" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
