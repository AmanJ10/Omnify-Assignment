import React, { useState } from "react";
import Button from "./Button";
import Modal from "./Modal";
import LoginPage from "../pages/Auth/LoginPage";
import SignUpPage from "../pages/Auth/SignUp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext"; // Assuming useAuth is exported

const Navbar = () => {
  const { user, logout, loading } = useAuth(); // ✅ use user from AuthContext
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  const openModal = (content) => {
    setModalContent(content);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <nav className="bg-white shadow-md p-4 flex justify-between items-center w-full fixed top-0 left-0 z-50">
        <div className="flex flex-col">
          <div
            className="flex items-center text-2xl font-bold space-x-2"
            onClick={() => navigate("/")}
          >
            <span>Travel</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
              className="w-6 h-6 text-blue-500"
            >
              <path d="M192 32c0 17.7 14.3 32 32 32c123.7 0 224 100.3 224 224c0 17.7 14.3 32 32 32s32-14.3 32-32C512 128.9 383.1 0 224 0c-17.7 0-32 14.3-32 32zm0 96c0 17.7 14.3 32 32 32c70.7 0 128 57.3 128 128c0 17.7 14.3 32 32 32s32-14.3 32-32c0-106-86-192-192-192c-17.7 0-32 14.3-32 32zM96 144c0-26.5-21.5-48-48-48S0 117.5 0 144L0 368c0 79.5 64.5 144 144 144s144-64.5 144-144s-64.5-144-144-144l-16 0 0 96 16 0c26.5 0 48 21.5 48 48s-21.5 48-48 48s-48-21.5-48-48l0-224z" />
            </svg>
            <span>log</span>
          </div>
          <div className="text-gray-600 text-sm italic mt-1">
            Document Every Journey
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Button label="Subscribe" className="text-black" />
          <Button label="Contact" className="text-black-500" />

          {!loading && user ? (
            <div className="flex items-center space-x-4">
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => navigate("/account")}
              >
                <img
                  src={user.profilePicture || "https://via.placeholder.com/40"}
                  alt="Profile"
                  className="w-8 h-8 rounded-full border"
                />
                <span className="text-gray-700 font-medium">
                  {user.name || "Profile"}
                </span>
              </div>
              <Button
                onClick={logout}
                label="Logout"
                className="bg-black text-white hover:bg-gray-800"
              />
            </div>
          ) : (
            <>
              <Button
                label="Log In"
                className="text-black"
                onClick={() => openModal("login")}
              />
              <Button
                label="Sign Up"
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => openModal("signup")}
              />
            </>
          )}
        </div>
      </nav>

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent === "login" ? "Log In" : "Sign Up"}
        body={
          modalContent === "login" ? (
            <LoginPage
              onSuccess={closeModal}
              switchToSignup={() => setModalContent("signup")}
            />
          ) : (
            <SignUpPage
              onSuccess={closeModal}
              switchToLogin={() => setModalContent("login")}
            />
          )
        }
      />
    </>
  );
};

export default Navbar;
