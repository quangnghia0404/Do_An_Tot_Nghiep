import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const initialState = {
  coupon_id: "",
  name_user: "",
  name_product: "",
  amount: 0,
  price: 0,
  provider: "",
  note: "",
  _id: "",
};

function CreateCoupon() {
  const state = useContext(GlobalState);
  const [coupon, setCoupon] = useState(initialState);
  const [isLogged] = state.userAPI.isLogged;
  const [users] = state.userAPI.users;

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [providers] = state.providersAPI.providers;
  const [products] = state.productsAPI.products;
  const [coupons] = state.couponsAPI.coupons;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.couponsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      coupons.forEach((coupon) => {
        if (coupon._id === param.id) {
          setCoupon(coupon);
        }
      });
    } else {
      setOnEdit(false);
      setCoupon(initialState);
    }
  }, [param.id, coupons]);

  const handleChangeInput = async (e) => {
    const { name, value } = e.target;
    setCoupon({ ...coupon, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin)
        return Swal.fire({
          icon: "error",
          title: "Bạn không phải là người quản trị",
          text: "Vui lòng kiểm tra lại!",
        });

      if (onEdit) {
        await axios.put(
          `/api/coupons/${coupon._id}`,
          { ...coupon },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Cập nhập thành công!",
        });
        window.location.href = "/list_coupon";
      } else {
        await axios.post(
          "/api/coupons",
          { ...coupon },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Thêm mới thành công",
        });
        window.location.href = "/list_coupon";
      }
      setCallback(!callback);
      history.push("/");
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
          <section className="recents" style={{ padding: 0 }}>
            <div className="dashboard-title">
              <div className="note">
                <div className="note-left">
                  {onEdit ? "Cập nhật phiếu nhập hàng" : "Thêm phiếu nhập hàng"}
                </div>
                <div className="note-right">
                  <Link to="/" id="link">
                    Admin
                  </Link>{" "}
                  /{" "}
                  {onEdit ? "Cập nhật phiếu nhập hàng" : "Thêm phiếu nhập hàng"}
                </div>
              </div>
            </div>
            <h4 style={{ paddingTop: 20, fontSize: 24 }}>
              Thêm phiếu nhập hàng mới
            </h4>
            <div className="create_product">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <label htmlFor="coupon_id">Import ID</label>
                  <input
                    type="text"
                    name="coupon_id"
                    id="coupon_id"
                    required
                    value={coupon.coupon_id}
                    onChange={handleChangeInput}
                    disabled={onEdit}
                  />
                </div>
                <div className="row">
                  <label htmlFor="name_user">Tên người nhập</label>
                  <input
                    type="text"
                    name="name_user"
                    id="name_user"
                    required
                    value={coupon.name_user}
                    onChange={handleChangeInput}
                  />
                </div>

                <div className="row">
                  <label htmlFor="name_product">Name Product</label>
                  <select
                    name="name_product"
                    value={coupon.name_product}
                    onChange={handleChangeInput}
                  >
                    <option value="">Please select a name product</option>
                    {products.map((product) => (
                      <option value={product.title} key={product._id}>
                        {product.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <label htmlFor="provider">Providers: </label>
                  <select
                    name="provider"
                    value={coupon.provider}
                    onChange={handleChangeInput}
                  >
                    <option value="">Please select a provider</option>
                    {providers.map((provider) => (
                      <option value={provider._id} key={provider._id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="row">
                  <label htmlFor="amount">Amount</label>
                  <input
                    type="number"
                    name="amount"
                    id="amount"
                    required
                    value={coupon.amount}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="row">
                  <label htmlFor="price">Price</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    value={coupon.price}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="row">
                  <label htmlFor="note">Note</label>
                  <textarea
                    type="text"
                    name="note"
                    id="note"
                    required
                    rows="7"
                    value={coupon.note}
                    onChange={handleChangeInput}
                  />
                </div>

                <button type="submit">{onEdit ? "Update" : "Create"}</button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CreateCoupon;
