import React, { useState, useEffect } from "react";
import VerticalList from "./scrollList";
const Modal = ({ isOpen, onClose, children,onTypeChange}) => {
    const [currentType, setCurrentType] = useState("water");
     const handleItemClick = (type) => {
        console.log("Closing modal for type:", type);
        onTypeChange(type)
        onClose();
      };
  if (!isOpen) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div className="relative w-1/2 p-2 rounded bg-yellow-300 shadow-lg">
        {children}
        <VerticalList onItemClick={handleItemClick} />
                <button
          className="absolute top-0 right-0 m-4 text-white hover:text-red-700 cursor-pointer"
          onClick={onClose}
        >
          Close
        </button>
     
      </div>
    </div>
  );
};

export default Modal;
