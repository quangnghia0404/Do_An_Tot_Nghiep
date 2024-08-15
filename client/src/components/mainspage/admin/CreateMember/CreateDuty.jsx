import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import Swal from "sweetalert2";

function CreateDuty() {
  const state = useContext(GlobalState);
  const [duties] = state.dutiesAPI.duties;
  const [duty, setDuty] = useState("");
  const [token] = state.token;
  const [callback, setCallback] = state.dutiesAPI.callback;
  const [onEdit, setOnEdit] = useState(false);
  const [id, setID] = useState("");
  const [isLogged] = state.userAPI.isLogged;
  const [users] = state.userAPI.users;

  const createDuty = async (e) => {
    e.preventDefault();
    try {
      if (onEdit) {
        const res = await axios.put(
          `/api/duty/${id}`,
          { name: duty },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire(res.data.msg, "Bạn hãy click vào nút này!", "success");
      } else {
        const res = await axios.post(
          "/api/duty",
          { name: duty },
          {
            headers: { Authorization: token },
          }
        );

        Swal.fire(res.data.msg, "Bạn hãy click vào nút này!", "success");
      }
      setOnEdit(false);
      setDuty("");
      setCallback(!callback);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data.msg,
        text: "Vui lòng kiểm tra lại!",
      });
    }
  };

  const editDuty = async (id, name) => {
    setID(id);
    setDuty(name);
    setOnEdit(true);
  };

  const deleteDuty = async (id) => {
    try {
      const res = await axios.delete(`/api/duty/${id}`, {
        headers: { Authorization: token },
      });
      Swal.fire(res.data.msg, "Bạn hãy click vào nút này!", "success");
      setCallback(!callback);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data.msg,
        text: "Vui lòng kiểm tra lại!",
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
                <span className="ti-power-off" onClick={logoutUser}></span>
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
              <div className="note-left">
                {onEdit ? "Cập nhật chức vụ" : "Thêm chức vụ"}
              </div>
              <div className="note-right">
                <Link to="/" id="link">
                  Admin
                </Link>{" "}
                / {onEdit ? "Cập nhật chức vụ" : "Thêm chức vụ"}
              </div>
            </div>
          </div>
          <section className="recent" style={{ padding: 0 }}>
            <div className="categories">
              <form onSubmit={createDuty}>
                <label htmlFor="category">Chức vụ</label>
                <input
                  type="text"
                  name="duty"
                  value={duty}
                  required
                  onChange={(e) => setDuty(e.target.value)}
                />

                <button type="submit">
                  {onEdit ? "Cập nhật" : "Thêm mới"}
                </button>
              </form>
              <div className="col">
                {duties.map((duty) => (
                  <div className="row" key={duty._id}>
                    <p>{duty.name}</p>
                    <div>
                      <button
                        className="ti-pencil-alt"
                        style={{ color: "blue" }}
                        onClick={() => editDuty(duty._id, duty.name)}
                      ></button>
                      <button
                        className="ti-trash"
                        style={{ color: "red" }}
                        onClick={() => deleteDuty(duty._id)}
                      ></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CreateDuty;
