import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";

function History() {
  const state = useContext(GlobalState);
  const [token] = state.token;
  const [historys, setHistorys] = state.userAPI.history;
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [users] = state.userAPI.users;
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    historys.forEach((history) => {
      if (history._id === id) history.checked = !history.checked;
    });
    setHistorys([...historys]);
  };
  const deletePayment = async (id, public_id) => {
    if (window.confirm("Bạn có chắc muốn xóa đơn hàng này?")) {
      try {
        const deletePayment = await axios.delete(`api/payment/${id}`, {
          headers: { Authorization: token },
        });
        Swal.fire({
          icon: "success",
          title: "Xóa thành công.!",
        });
        await deletePayment;
        window.location.href = "/list_history";
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
    historys.forEach((history) => {
      history.checked = !isCheck;
    });
    setHistorys([...historys]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả?")) {
      historys.forEach((history) => {
        if (history.checked) deletePayment(history._id);
      });
    }
  };

  useEffect(() => {
    if (token) {
      const getHistorys = async () => {
        if (isAdmin) {
          const res = await axios.get("/api/payment", {
            headers: { Authorization: token },
          });
          setHistorys(res.data);
        } else {
          const res = await axios.get("/user/history", {
            headers: { Authorization: token },
          });
          setHistorys(res.data);
        }
      };
      getHistorys();
    }
  }, [token, isAdmin, setHistorys]);

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
              <div className="note-left">Lịch sử đơn đặt hàng</div>
              <div className="note-right">
                <Link to="/" id="link">
                  Admin
                </Link>{" "}
                / Lịch sử các đơn đặt hàng
              </div>
            </div>
          </div>
          <div className="create">
            <div className="delete-all">
              <span>Chọn tất cả</span>
              <input type="checkbox" checked={isCheck} onChange={checkAll} />
              <button onClick={deleteAll}>Xóa tất cả</button>
            </div>
          </div>
          <section className="recents" style={{ padding: 0 }}>
            <div className="activity-girds">
              <div className="activity-carts">
                <h4 style={{ paddingTop: 20 }}>
                  Đang có {historys.length} đơn đặt hàng chờ bạn xử lý
                </h4>
                <table border="1" id="table-to-xls">
                  <thead>
                    <tr>
                      <th></th>
                      <th style={{ width: 300 }}>tài khoản</th>
                      <th>Payment ID</th>
                      <th>Ngày mua</th>
                      <th>trạng thái</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {historys.map((items) => {
                      return (
                        <tr key={items._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={items.checked}
                              onChange={() => handleCheck(items._id)}
                            />
                          </td>
                          <td>{items.name}</td>
                          <td>{items.paymentID}</td>
                          <td>
                            {new Date(items.createdAt).toLocaleDateString()}
                          </td>
                          <td>
                            {items.status === "false" ? "Đã nhận" : "Chưa nhận"}
                          </td>
                          <td>
                            <Link
                              style={{ textDecoration: "none" }}
                              to={`/detail_history/${items._id}`}
                            >
                              Xem chi tiết
                            </Link>
                            <span> | </span>
                            <button
                              className="ti-trash"
                              style={{ color: "red" }}
                              onClick={() => deletePayment(items._id)}
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

export default History;
