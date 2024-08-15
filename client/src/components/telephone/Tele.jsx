import React from "react";

function Tele() {
  function handleChangee(e) {
    e.preventDefault();
    let modalCall = document.querySelector(".modal-call");
    modalCall.classList.toggle("active");
  }

  return (
    <div
      className="hotline-phone-ring-wrap"
      onClick={(e) => {
        handleChangee(e);
      }}
    >
      <div className="hotline-phone-ring">
        <div className="hotline-phone-nring-circle" />
        <div className="hotline-phone-ring-circle-fill" />
        <div className="hotline-phone-ring-img-circle">
          <a href="" className="pps-btn-img">
            <img
              src="https://nguyenhung.net/wp-content/uploads/2019/05/icon-call-nh.png"
              alt="Gọi điện thoại"
              width={50}
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Tele;
