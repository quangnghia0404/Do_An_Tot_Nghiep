import React, { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Link } from "react-router-dom";
import axios from "axios";
import Footer from "../../footers/Footer";
import Cart_Emty from "../../../images/donhangtrong.png";

function OrderHistory() {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistory(res.data);
        }
      };
      getHistory();
    }
  }, [token, isAdmin, setHistory]);

  if (history.length === 0) {
    return (
      <div>
        <div className=" note">
          <div className="note-left">
            <p>Lịch sử giao dịch</p>
          </div>
          <div className="note-right">
            <Link to="/" id="link">
              Trang chủ
            </Link>{" "}
            / Lịch sử giao dịch
          </div>
        </div>
        <div className="container d-flex justify-content-center">
          <img src={Cart_Emty} width="200" />
        </div>
        <div
          className="tittle container d-flex justify-content-center"
          style={{ padding: 10 }}
        >
          Bạn chưa có đơn hàng
        </div>
        <div className="load_more">
          <a href="http://localhost:3000/" style={{ textDecoration: "none" }}>
            <button className="btn btn-gradient container d-flex">
              Mua ngay
            </button>
          </a>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <>
      <div className=" note">
        <div className="note-left">
          <p>Lịch sử giao dịch</p>
        </div>
        <div className="note-right">
          <Link to="/" id="link">
            Home
          </Link>{" "}
          / Lịch sử giao dịch
        </div>
      </div>
      <div className="history-page">
        <h2>Lịch sử giao dịch</h2>

        <h4 style={{ color: "black" }}>
          Bạn đang có {history.length} đơn đặt hàng
        </h4>

        <table>
          <thead>
            <tr>
              {isAdmin ? <th>Name</th> : ""}
              <th>Payment ID</th>
              <th>Ngày mua</th>
              {isAdmin ? <th>Status</th> : ""}
            </tr>
          </thead>
          <tbody>
            {history.map((items) => (
              <tr key={items._id}>
                {isAdmin ? <td>{items.name}</td> : ""}
                <td>{items.paymentID}</td>
                <td>{new Date(items.createdAt).toLocaleDateString()}</td>
                {isAdmin ? (
                  <td>{items.status === "false" ? "Đã nhận" : "Chưa nhận"}</td>
                ) : (
                  ""
                )}
                <td>
                  <Link to={`/history/${items._id}`}>Xem chi tiết</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
}

export default OrderHistory;
