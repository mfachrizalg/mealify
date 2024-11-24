import React from "react";

const Modal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
      <div className="bg-orange-500 rounded-lg p-8 w-96">
        <h2 className="text-white text-lg font-semibold text-center mb-4">
          Would you like to add this meal to your schedule?
        </h2>
        <div className="flex justify-center gap-6">
          <button
            onClick={onConfirm}
            className=" bg-yellow-300 text-black px-6 py-2 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={onClose}
            className="bg-white text-black px-6 py-2 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
