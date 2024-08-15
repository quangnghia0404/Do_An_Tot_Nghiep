import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import Footer from "../../footers/Footer";

function OrderDetails() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);
  console.log(orderDetails);

  if (orderDetails.length === 0) return null;

  return (
    <>
      <div className=" note">
        <div className="note-left">
          <p>Chi tiết lịch sử giao dịch</p>
        </div>
        <div className="note-right">
          <Link to="/" id="link">
            Trang chủ
          </Link>{" "}
          / Lịch sử giao dịch / Chi tiết
        </div>
      </div>
      <div className="history-page">
        <h1>Chi tiết lịch sử giao dịch</h1>
        <table>
          <thead>
            <tr>
              <th>Tên người nhận</th>
              <th>Địa chỉ</th>
              <th>Mã bưu điện</th>
              <th>Mã quốc gia</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{orderDetails.address.recipient_name}</td>
              <td>
                {orderDetails.address.line1 + " - " + orderDetails.address.city}
              </td>
              <td>{orderDetails.address.postal_code}</td>
              <td>{orderDetails.address.country_code}</td>
            </tr>
          </tbody>
        </table>

        <table style={{ margin: "30px 0px" }}>
          <thead>
            <tr>
              <th></th>
              <th>Danh sách sản phẩm</th>
              <th>Số lượng</th>
              <th>Tổng tiền</th>
            </tr>
          </thead>
          <tbody>
            {orderDetails.cart.map((item) => (
              <tr key={item._id}>
                <td className="imagehistory">
                  <img src={item.images.url} alt="" />
                </td>
                <td>{item.title}</td>
                <td>{item.quantity}</td>
                <td>$ {item.price * item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default OrderDetails;
