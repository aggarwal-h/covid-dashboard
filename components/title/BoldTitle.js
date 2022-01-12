import React from "react";

function BoldTitle({ children }) {
  return (
    <h1 className="font-poppins font-bold text-4xl text-gray-800 dark:text-white text-center md:text-left">
      {children}
    </h1>
  );
}

export default BoldTitle;
