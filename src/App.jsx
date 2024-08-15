import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/productDetails";

const App = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:id" element={<ProductDetails />} />
          <Route path="/:id/edit" element={<AddProduct edit={true} />} />

          <Route path="/addproducts" element={<AddProduct />} />

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
