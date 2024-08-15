import React from "react";

function ToastMessage() {
  const handleChangeClose = () => {
    let domToast = document.querySelector(".toast-message");
    domToast.classList.remove("active");
  };
  return (
    <div className="toast-message">
      <div className="toast-message__warning">
        <i className="fa fa-exclamation-triangle" />
      </div>
      <div className="toast-message__content">
        <p className="notificationToast"></p>
      </div>
      <div
        className="toast-message__close close"
        onClick={() => {
          {
            handleChangeClose();
          }
        }}
      >
        <i className="fa fa-times" aria-hidden="true" />
      </div>
    </div>
  );
}

export default ToastMessage;
