import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import LoadMore from "../../products/LoadMore";
import Filters from "../../products/Filters";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import Swal from "sweetalert2";

function ListProduct() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [users] = state.userAPI.users;
  const [products, setProducts] = state.productsAPI.products;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    if (window.confirm("Bạn có chắc muốn xóa sản phẩm này?")) {
      try {
        setLoading(true);
        const destroyImg = await axios.post(
          "api/destroy",
          { public_id },
          {
            headers: { Authorization: token },
          }
        );

        const deleteProduct = await axios.delete(`api/products/${id}`, {
          headers: { Authorization: token },
        });

        await destroyImg;
        await deleteProduct;
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
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    if (window.confirm("Bạn có chắc muốn xóa tất cả sản phẩm?")) {
      products.forEach((product) => {
        if (product.checked)
          deleteProduct(product._id, product.images.public_id);
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
              <div className="note-left">Sản phẩm</div>
              <div className="note-right">
                <Link to="/" id="link">
                  Admin
                </Link>{" "}
                / Danh sách sản phẩm
              </div>
            </div>
          </div>
          <section className="recents" style={{ padding: 0 }}>
            <div style={{ paddingTop: 20 }}>
              <Filters />
            </div>
            <div className="create">
              <Link to="/create_product" style={{ textDecoration: "none" }}>
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
                <h3>Danh sách sản phẩm</h3>

                <table border="1" id="table-to-xls">
                  <thead>
                    <tr>
                      <th style={{ width: 50 }}></th>
                      <th style={{ width: 120 }}>Tên</th>
                      <th style={{ width: 100 }}>Số lương đã bán</th>
                      <th className="td-price" style={{ width: 120 }}>
                        Đơn giá ($)
                      </th>
                      <th className="td-images">Images</th>
                      <th>Mô tả</th>
                      <th style={{ width: 150 }}>Nhà cung cấp</th>

                      <th style={{ width: 90 }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => {
                      return (
                        <tr key={product._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={product.checked}
                              onChange={() => handleCheck(product._id)}
                            />
                          </td>
                          <td>{product.title}</td>
                          <td>{product.sold}</td>
                          <td>{product.price}</td>
                          <td>
                            <img src={product.images.url} alt="" />
                          </td>
                          <td>{product.description}</td>
                          <td>{product.provider}</td>

                          <td>
                            <Link to={`/edit_product/${product._id}`}>
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
                                deleteProduct(
                                  product._id,
                                  product.images.public_id
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
              <LoadMore />
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
