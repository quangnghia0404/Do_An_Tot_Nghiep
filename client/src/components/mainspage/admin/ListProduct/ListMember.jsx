import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";

function ListProduct() {
  const state = useContext(GlobalState);
  const [members, setMembers] = state.membersAPI.members;
  const [token] = state.token;
  const [isLogged] = state.userAPI.isLogged;
  const [callback, setCallback] = state.membersAPI.callback;
  const [users] = state.userAPI.users;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    members.forEach((member) => {
      if (member._id === id) member.checked = !member.checked;
    });
    setMembers([...members]);
  };

  const deleteMember = async (id, public_id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhân viên này?")) {
      try {
        setLoading(true);
        const destroyImg = await axios.post(
          "api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteMember = await axios.delete(`api/members/${id}`, {
          headers: { Authorization: token },
        });

        await destroyImg;
        await deleteMember;
        Swal.fire({
          icon: "success",
          title: "Xóa thành công.!",
        });
        setCallback(!callback);
        setLoading(false);
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
    members.forEach((member) => {
      member.checked = !isCheck;
    });
    setMembers([...members]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả nhân viên?")) {
      members.forEach((member) => {
        if (member.checked) deleteMember(member._id, member.images.public_id);
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
              <div className="note-left">Nhân viên</div>
              <div className="note-right">
                <Link to="/" id="link">
                  Admin
                </Link>{" "}
                / Danh sách nhân viên
              </div>
            </div>
          </div>
          <section className="recents" style={{ padding: 0 }}>
            <div className="create">
              <Link to="/create_member" style={{ textDecoration: "none" }}>
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
                <h3>Danh sách nhân viên</h3>
                <table border="1" id="table-to-xls">
                  <thead>
                    <tr>
                      <th style={{ width: 100 }}></th>
                      <th>Tên</th>
                      <th>Mô tả</th>
                      <th>Chức vụ</th>
                      <th className="td-images">Images</th>
                      {/* <th>Category</th> */}
                      <th className="actions" style={{ width: 150 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {members.map((member) => {
                      return (
                        <tr key={member._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={member.checked}
                              onChange={() => handleCheck(member._id)}
                            />
                          </td>
                          <td>{member.name}</td>
                          <td>{member.content}</td>
                          <td>{member.duty}</td>
                          <td>
                            <img src={member.images.url} alt="" />
                          </td>
                          <td>
                            <Link to={`/edit_member/${member._id}`}>
                              <button
                                className="ti-pencil-alt"
                                style={{ color: "blue" }}
                              ></button>
                            </Link>
                            <span> |</span>
                            <button
                              className="ti-trash"
                              style={{ color: "red" }}
                              onClick={() =>
                                deleteMember(
                                  member._id,
                                  member.images.public_id
                                )
                              }
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

export default ListProduct;
