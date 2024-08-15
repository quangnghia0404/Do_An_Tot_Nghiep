import React, { useState } from "react";
import image from "../../images/modalCall.png";
import { Link } from "react-router-dom";
import axios from "axios";

function CourseAdvice() {
  const [contact, setContact] = useState({
    name: "",
    phone: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/registercontact", { ...contact });
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const handleChange = () => {
    let modalCall = document.querySelector(".modal-call");
    modalCall.classList.remove("active");
  };

  const handleToast = () => {
    let domToast = document.querySelector(".toast-message");
    domToast.classList.add("active");

    let modalCall = document.querySelector(".modal-call");
    modalCall.classList.remove("active");

    let valuePhoneModal = document.querySelector(".modal-call-input").value;
    let valuePhoneModals = document.querySelector(".modal-call-inputs").value;
    let domNotificationToast = document.querySelector(".notificationToast");
    if (valuePhoneModal.length === 10 && valuePhoneModals.length !== "") {
      domNotificationToast.innerHTML =
        "Chúng tôi đã nhận được thông tin của quý khách và sẽ liên hệ với bạn trong khoảng thời gian sớm nhất. Xin chân thành cảm ơn";
    } else {
      domNotificationToast.innerHTML =
        "Số điện thoại này không có, Vui lòng kiểm tra lại số điện thoại";
    }
  };
  return (
    <div className="modal-call">
      <div
        className="modal-call__close"
        onClick={() => {
          handleChange();
        }}
      >
        <i className="fa fa-times" />
      </div>
      <div className="modal-call__image">
        <img src={image} alt="" />
      </div>
      {/* <div className="modal-call__title">Tư vấn Sale</div>
      <div className="modal-call__phone">
        <a>0969.209.088</a>
      </div> */}
      <div className="modal-call__description">
        Vui lòng kết nối tai nghe hoặc hệ thống sẽ sử dụng loa và microphone
        trên thiết bị của bạn để gọi điện
        <span style={{ color: "#ea6c6c" }}>MIỄN PHÍ</span>
      </div>
      <div onSubmit={registerSubmit}>
        <form>
          <div className="phoneDevice">
            <span>Họ và tên:</span>
            <input
              type="text"
              name="name"
              required
              className="modal-call-inputs"
              placeholder="Nhập số điện thoại của bạn"
              value={contact.name}
              onChange={onChangeInput}
            />
          </div>
          <div className="phoneDevice">
            <span>Số điện thoại:</span>
            <input
              className="modal-call-input"
              type="text"
              name="phone"
              placeholder="Nhập số điện thoại của bạn"
              value={contact.phone}
              onChange={onChangeInput}
            />
          </div>
          <button
            className="btn modal-call-btn"
            onClick={() => {
              handleToast();
            }}
          >
            GỌI ĐIỆN
          </button>
        </form>
      </div>
    </div>
  );
}

export default CourseAdvice;
