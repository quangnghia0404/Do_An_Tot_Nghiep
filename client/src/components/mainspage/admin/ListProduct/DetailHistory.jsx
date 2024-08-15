import React, { useContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";

function DetailHistory() {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [users] = state.userAPI.users;

  const params = useParams();

  useEffect(() => {
    if (params.id) {
      history.forEach((item) => {
        if (item._id === params.id) setOrderDetails(item);
      });
    }
  }, [params.id, history]);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.replace("/login");
  };

  if (orderDetails.length === 0) return null;

  return (
    <div>
      <input type="checkbox" id="sidebar-toggle" />
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="brand">
            <span className="ti-unlink">
              <Link to="/">
                <span>administrator</span>
              </Link>
            </span>
          </h3>
          <label htmlFor="sidebar-toggle" className="ti-menu-alt"></label>
        </div>
        <div className="sidebar-menu">
          <ul>
            <li>
              <Link to="/">
                <span className="ti-home"></span>
                <span> Trang chủ</span>
              </Link>
            </li>
            <li>
              <Link to="/list_coupon">
                <span className="ti-notepad"></span>
                <span> Phiếu nhập hàng</span>
              </Link>
            </li>
            <li>
              <Link to="/list_provider">
                <span className="ti-book"></span>
                <span> Nhà cung cấp</span>
              </Link>
            </li>
            <li>
              <Link to="/list_product">
                <span className="ti-layers-alt"></span>
                <span> Sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to="/category">
                <span className="ti-clipboard"></span>
                <span> Loại sản phẩm</span>
              </Link>
            </li>
            <li>
              <Link to="/list_member">
                <span className="ti-id-badge"></span>
                <span> Nhân viên</span>
              </Link>
            </li>
            <li>
              <Link to="/duty">
                <span className="ti-write"></span>
                <span> Chức vụ</span>
              </Link>
            </li>
            <li>
              <Link to="/list_contact">
                <span className="ti-book"></span>
                <span> Liên hệ</span>
              </Link>
            </li>
            <li>
              <Link to="/list_history">
                <span className="ti-receipt"></span>
                <span> Đơn đặt hàng</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="main-content">
        <header>
          <div className="search-form">
            <span className="ti-search"></span>
            <input type="search" placeholder="Tìm kiếm" />
          </div>
          <div className="social-icons">
            {isLogged ? (
              <>
                <span className="ti-user user"> Xin chào, {users}</span>
                <span
                  className="ti-power-off logout"
                  onClick={logoutUser}
                ></span>
              </>
            ) : (
              <></>
            )}
            <div></div>
          </div>
        </header>
        <main>
          <div className="dashboard-title">
            <div className="note">
              <div className="note-left">Lịch sử đơn đặt hàng</div>
              <div className="note-right">
                <Link to="/" id="link">
                  Admin
                </Link>
                / Lịch sử đơn đặt hàng / Chi tiết đơn đặt hàng
              </div>
            </div>
          </div>
          <section className="recents" style={{ padding: 0 }}>
            <div className="activity-girds">
              <div className="activity-carts">
                <h4 style={{ paddingTop: 20, fontSize: 24 }}>
                  Thông tin khách hàng
                </h4>
                <table border="1" id="table-to-xls">
                  <thead>
                    <tr>
                      <th>Tên</th>
                      <th>Địa chỉ</th>
                      <th>Mã bưu điện</th>
                      <th>Mã quốc gia</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{orderDetails.address.recipient_name}</td>
                      <td>
                        {orderDetails.address.line1 +
                          " - " +
                          orderDetails.address.city}
                      </td>
                      <td>{orderDetails.address.postal_code}</td>
                      <td>{orderDetails.address.country_code}</td>
                    </tr>
                  </tbody>
                </table>
                <h4 style={{ paddingTop: 20, fontSize: 24 }}>
                  Chi tiết đơn hnàg
                </h4>
                <table style={{ margin: "30px 0px" }}>
                  <thead>
                    <tr>
                      <th></th>
                      <th>Sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
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
                        <td>$ {item.price}</td>
                        <td>$ {item.price * item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default DetailHistory;
