import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authAction } from "../redux/authSlice";
import ConfirmationModal from "../components/logoutConfirmationModel";

const Logout = () => {
  const [showModal, setShowModal] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleConfirm = () => {
    localStorage.removeItem("token");
    dispatch(authAction.setLoggedInUser(null));
    navigate("/");
  };

  const handleCancel = () => {
    setShowModal(false);
    navigate(-1);
  };

  return (
    <>
      <ConfirmationModal
        show={showModal}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

export default Logout;
