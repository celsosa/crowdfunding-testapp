import React from "react";

const Modal = ({ children, title, onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal"
    >
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {title}
          </h3>
          <div className="mt-2 px-7 py-3">{children}</div>
          <div className="items-center px-7 py-3">
            <button
              id="ok-btn"
              className="px-4 py-2 bg-red-700 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-900 focus:outline-none focus:ring-2 focus:ring-gray-300"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
