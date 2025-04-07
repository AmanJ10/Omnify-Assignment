import React from "react";

const Button = ({ label, onClick, className }) => {
  return (
    <button
      className={`px-4 py-2 rounded-md transition-all duration-200 ${className}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default Button;
