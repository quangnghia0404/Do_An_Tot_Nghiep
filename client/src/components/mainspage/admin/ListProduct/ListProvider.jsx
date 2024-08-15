import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";

function ListProvider() {
  const state = useContext(GlobalState);
  const [providers, setProviders] = state.providersAPI.providers;
  const [token] = state.token;
  const [isLogged] = state.userAPI.isLogged;
  const [callback, setCallback] = state.providersAPI.callback;
  const [users] = state.userAPI.users;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    providers.forEach((provider) => {
      if (provider._id === id) provider.checked = !provider.checked;
    });
    setProviders([...providers]);
  };

  const deleteMember = async (id, public_id) => {
    if (window.confirm("Bạn có chắc muốn xóa nhà cung cấp này?")) {
      try {
        setLoading(true);
        const destroyImg = await axios.post(
          "api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        );
        const deleteProvider = await axios.delete(`api/providers/${id}`, {
          headers: { Authorization: token },
        });

        await destroyImg;
        await deleteProvider;
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
    providers.forEach((provider) => {
      provider.checked = !isCheck;
    });
    setProviders([...providers]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả nhà cung cấp?")) {
      providers.forEach((provider) => {
        if (provider.checked)
          deleteMember(provider._id, provider.images.public_id);
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
              <div className="note-left">Nhà cung cấp</div>
              <div className="note-right">
                <Link to="/" id="link">
                  Admin
                </Link>{" "}
                / Danh sách nhà cung cấp
              </div>
            </div>
          </div>
          <section className="recents" style={{ padding: 0 }}>
            <div className="create">
              <Link to="/create_provider" style={{ textDecoration: "none" }}>
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
                <h3>Danh sách nhà cung cấp</h3>
                <table border="1" id="table-to-xls">
                  <thead>
                    <tr>
                      <th style={{ width: 50 }}></th>
                      <th>Tên</th>
                      <th style={{ width: 200 }}>Email</th>
                      <th style={{ width: 150 }}>Số điện thoại</th>
                      <th className="td-images">Images</th>
                      <th>Địa chỉ</th>
                      <th className="actions"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {providers.map((provider) => {
                      return (
                        <tr key={provider._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={provider.checked}
                              onChange={() => handleCheck(provider._id)}
                            />
                          </td>
                          <td>{provider.name}</td>
                          <td>{provider.email}</td>
                          <td>{provider.phone}</td>
                          <td>
                            <img src={provider.images.url} alt="" />
                          </td>
                          <td>{provider.address}</td>
                          <td>
                            <Link to={`/edit_provider/${provider._id}`}>
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
                                  provider._id,
                                  provider.images.public_id
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

export default ListProvider;
