import React from "react";

const BouncingDots = () => {
  return (
    <div className="flex justify-center items-center h-10">
      <div className="dot bg-gray-500 rounded-full w-2 h-2 mx-1 animate-bounce"></div>
      <div className="dot bg-gray-500 rounded-full w-2 h-2 mx-1 animate-bounce delay-200"></div>
      <div className="dot bg-gray-500 rounded-full w-2 h-2 mx-1 animate-bounce delay-400"></div>
    </div>
  );
};

export default BouncingDots;
