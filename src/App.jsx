import React, { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
const AddProduct = React.lazy(() => import("./pages/AddProduct"));
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/productDetails";
import Logout from "./pages/Logout";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authAction } from "./redux/authSlice";
import toast from "react-hot-toast";
import GetCategory from "./pages/GetCategory";
import CategoryProducts from "./pages/categoryProducts";

const App = () => {
  const loggedInUser = useSelector((state) => state.userReducer.loggedInUser);

  const dispatch = useDispatch();

  const [adminStat, setAdminStat] = useState("pending");

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
          dispatch(authAction.setLoggedInUser(null));
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

  useEffect(() => {
    async function checkServerStatus() {
      console.log("chcking");
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVERAPI}/api/v1/checkStatus`
        );

        if (response.data && response.data.exists) {
          setAdminStat("exists");
        } else {
          setAdminStat("not");
        }
      } catch (error) {
        console.error(error);
        setAdminStat("down");
      }
    }
    if (!loggedInUser) {
      checkServerStatus();
    }
  }, [loggedInUser]);

  console.log(loggedInUser);

  if (adminStat === "pending" && !loggedInUser) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center text-xl font-semibold">
        Please Wait...
      </div>
    );
  }

  if (adminStat === "exists" && !loggedInUser) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center text-xl font-semibold">
        <Login />
      </div>
    );
  }

  if (adminStat === "down" && !loggedInUser) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center text-xl font-semibold">
        Server Down please contact
        <a href="https://technavata.com" target="_blank">
          Navata Tech
        </a>
      </div>
    );
  }

  if (adminStat === "not" && !loggedInUser) {
    return (
      <div className="h-[100vh] w-[100vw] flex justify-center items-center">
        <Register />
      </div>
    );
  }

  return (
    <div className="flex ">
      <SideBar />
      <div className="flex-grow">
        <Suspense fallback={<div className="w-full h-full">Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<Home />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route
              path="/product/:id/edit"
              element={<AddProduct edit={true} />}
            />

            <Route path="/addproducts" element={<AddProduct />} />
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/getcategory" element={<GetCategory />} />
            <Route
              path="/getcategory/:categoryId"
              element={<CategoryProducts />}
            />

            {/* <Route path="/editproduct" element={<EditProduct />} /> */}

            {/* <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} /> */}
            <Route path="/logout" element={<Logout />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
};

export default App;
