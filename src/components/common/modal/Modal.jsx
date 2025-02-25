import React, { useEffect } from "react";

function Modal({ children, setShouldShow, shouldShow }) {
  useEffect(() => {
    if (shouldShow) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }
    return () => (document.body.style.overflow = "auto"); // Cleanup
  }, [shouldShow]);

  return (
    <>
      {shouldShow && (
        <div className="modalBackground" onClick={() => setShouldShow(false)}>
          <div
            className="ModalBody"
            onClick={(e) => e.stopPropagation()} // Prevent background click
          >
            {children}
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
