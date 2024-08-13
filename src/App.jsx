import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import SideBar from "./components/SideBar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import Logout from "./pages/Logout";

const App = () => {


  const [token , setToken] = useState()

  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-grow">
        <Routes>
          {localStorage.getItem("token") ? (
            <>
            
            <Route path="/" element={<Home />} />
            <Route path="/addproducts" element={<AddProduct />} />
            <Route path="/editproduct" element={<EditProduct />} />
  
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/logout" element={<Logout />} />
            </>

          ) : (
            <>
            
            <Route path="*" element={<Register />} />
            <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </div>
  );
};

export default App;
