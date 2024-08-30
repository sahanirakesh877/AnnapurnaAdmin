import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../redux/authSlice";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");
    dispatch(authAction.setLoggedInUser(null));

    navigate("/");
  }, [navigate]);

  return null;
};

export default Logout;
