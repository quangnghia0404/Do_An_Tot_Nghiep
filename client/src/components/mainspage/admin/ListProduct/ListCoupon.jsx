import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Fillter from "../CreateProvider/Fillter";
import Load from "../CreateProvider/Loadmore";
import Swal from "sweetalert2";

function ListCoupon() {
  const state = useContext(GlobalState);
  const [coupons, setCoupons] = state.couponsAPI.coupons;
  const [token] = state.token;
  const [isLogged] = state.userAPI.isLogged;
  const [callback, setCallback] = state.couponsAPI.callback;
  const [users] = state.userAPI.users;
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    coupons.forEach((coupon) => {
      if (coupon._id === id) coupon.checked = !coupon.checked;
    });
    setCoupons([...coupons]);
  };

  const deleteMember = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa phiếu nhập này?")) {
      try {
        const deleteMember = await axios.delete(`api/coupons/${id}`, {
          headers: { Authorization: token },
        });

        await deleteMember;
        Swal.fire({
          icon: "success",
          title: "Xóa thành công.!",
        });
        setCallback(!callback);
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: err.response.data.msg,
          text: "Vui lòng kiểm tra lại!",
        });
      }
    }
  };

  const checkAll = () => {
    coupons.forEach((coupon) => {
      coupon.checked = !isCheck;
    });
    setCoupons([...coupons]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả các phiếu nhập?")) {
      coupons.forEach((coupon) => {
        if (coupon.checked) deleteMember(coupon._id);
      });
    }
  };

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.replace("/login");
  };
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
              <div className="note-left">Phiếu nhập hàng</div>
              <div className="note-right">
                <Link to="/" id="link">
                  Admin
                </Link>{" "}
                / Danh sách phiếu nhập hàng
              </div>
            </div>
          </div>
          <section className="recents" style={{ padding: 0 }}>
            <div style={{ paddingTop: 20 }}>
              <Fillter />
            </div>
            <div className="create">
              <Link to="/create_coupon" style={{ textDecoration: "none" }}>
                <button className="btn btn-danger">
                  Thêm mới <span className="ti-plus"></span>
                </button>
              </Link>
              <div className="delete-all">
                <span>Chọn tất cả</span>
                <input type="checkbox" checked={isCheck} onChange={checkAll} />
                <button onClick={deleteAll}>Xóa tất cả</button>
              </div>
            </div>
            <div className="activity-girds">
              <div className="activity-carts">
                <h3>Danh sách phiếu nhập hàng</h3>
                <table border="1" id="table-to-xls">
                  <thead>
                    <tr>
                      <th style={{ width: 50 }}></th>
                      <th>Người nhập</th>
                      <th>Tên sản phẩm</th>
                      <th>Số lượng</th>
                      <th>Đơn giá</th>
                      <th style={{ width: 150 }}>Tổng tiền</th>

                      <th>Ghi chú</th>
                      <th className="actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {coupons.map((coupon) => {
                      return (
                        <tr key={coupon._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={coupon.checked}
                              onChange={() => handleCheck(coupon._id)}
                            />
                          </td>
                          <td>{coupon.name_user}</td>
                          <td>{coupon.name_product}</td>
                          <td>{coupon.amount}</td>
                          <td>{coupon.price}</td>
                          <td>$ {coupon.amount * coupon.price}</td>

                          <td>{coupon.note}</td>

                          <td>
                            <Link to={`/edit_coupon/${coupon._id}`}>
                              <button
                                className="ti-pencil-alt"
                                style={{ color: "blue" }}
                              ></button>
                            </Link>
                            <span> |</span>
                            <button
                              className="ti-trash"
                              style={{ color: "red" }}
                              onClick={() => deleteMember(coupon._id)}
                            ></button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="load">
              <Load />
              <div className="dowload">
                <ReactHTMLTableToExcel
                  id="test-table-xls-button"
                  // className="download-table-xls-button"
                  className="ti-import"
                  table="table-to-xls"
                  filename="tablexls"
                  sheet="tablexls"
                  buttonText=" XLS"
                />
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default ListCoupon;
