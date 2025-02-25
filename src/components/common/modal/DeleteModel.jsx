import React from "react";

export default function DeleteModel({
  setShouldShow,
  handleDelete,
  handleCancel,
  isLoading,
}) {
  return (
    <div className="fixed inset-0  bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-sm md:max-w-md p-6 rounded-lg shadow-lg">
        {/* Close Icon */}
        <p className="text-end text-gray-600 cursor-pointer text-lg">
          <i
            className="fa-solid fa-x"
            onClick={() => {
              if (isLoading) return;
              setShouldShow(false);
            }}
          ></i>
        </p>

        {/* Title */}
        <p className="text-center text-xl font-semibold text-gray-800 font-nunito">
          Are you sure?
        </p>

        {/* Action Buttons */}
        <div className="flex justify-evenly mt-6">
          <button
            className="delete-modal-btn bg-red-500 hover:bg-red-600 text-white"
            onClick={async () => {
              await handleDelete();
              handleCancel();
            }}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Yes"}
          </button>
          <button
            className="delete-modal-btn"
            disabled={isLoading}
            onClick={handleCancel}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}
