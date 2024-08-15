import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../utils/loading/Loading";
import Swal from "sweetalert2";

const initialState = {
  product_id: "",
  title: "",
  sold: 0,
  price: 0,
  description: "please enter description...",
  content: "please enter content...",
  category: "",
  provider: "",
  _id: "",
};

function CreateProducts() {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [isLogged] = state.userAPI.isLogged;
  const [categories] = state.categoriesAPI.categories;
  const [providers] = state.providersAPI.providers;
  const [users, setUsers] = state.userAPI.users;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [products] = state.productsAPI.products;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.productsAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      products.forEach((product) => {
        if (product._id === param.id) {
          setProduct(product);
          setImages(product.images);
        }
      });
    } else {
      setOnEdit(false);
      setProduct(initialState);
      setImages(false);
    }
  }, [param.id, products]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin)
        return Swal.fire({
          icon: "error",
          title: "Bạn không phải là người quản trị",
          text: "Vui lòng kiểm tra lại!",
        });
      const file = e.target.files[0];

      if (!file)
        return Swal.fire({
          icon: "error",
          title: "Tệp không tồn tại.",
          text: "Vui lòng kiểm tra lại!",
        });

      if (file.size > 1024 * 1024)
        return Swal.fire({
          icon: "error",
          title: "Kích thước tệp quá lớn",
          text: "Vui lòng kiểm tra lại!",
        });

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return Swal.fire({
          icon: "error",
          title: "Định dạng tệp không chính xác.",
          text: "Vui lòng kiểm tra lại!",
        });

      let formData = new FormData();
      formData.append("file", file);

      setLoading(true);
      const res = await axios.post("/api/upload", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setLoading(false);
      setImages(res.data);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data.msg,
        text: "Vui lòng kiểm tra lại!",
      });
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin)
        return Swal.fire({
          icon: "error",
          title: "Bạn không phải là người quản trị",
          text: "Vui lòng kiểm tra lại!",
        });
      setLoading(true);
      await axios.post(
        "/api/destroy",
        { public_id: images.public_id },
        {
          headers: { Authorization: token },
        }
      );
      setLoading(false);
      setImages(false);
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data.msg,
        text: "Vui lòng kiểm tra lại!",
      });
    }
  };

  const handleChangeInput = async (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
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
      if (!images)
        return Swal.fire({
          icon: "error",
          title: "Không có hình ảnh để upload",
          text: "Vui lòng kiểm tra lại!",
        });

      if (onEdit) {
        await axios.put(
          `/api/products/${product._id}`,
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Cập nhập thành công!",
        });
      } else {
        await axios.post(
          "/api/products",
          { ...product, images },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Thêm mới thành công",
        });
      }
      setCallback(!callback);
      history.push("/list_product");
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: err.response.data.msg,
        text: "Vui lòng kiểm tra lại!",
      });
    }
  };

  const styleUpload = {
    display: images ? "block" : "none",
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
            <input type="search" placeholder="Search" />
          </div>
          <div className="social-icons">
            {isLogged ? (
              <>
                <span className="ti-user user"> Hi, {users}</span>
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
                  {onEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </div>
                <div className="note-right">
                  <Link to="/" id="link">
                    Admin
                  </Link>
                  / {onEdit ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}
                </div>
              </div>
            </div>
            <div className="create_product">
              <div className="upload">
                <input
                  type="file"
                  name="file"
                  id="file_up"
                  onChange={handleUpload}
                />
                {loading ? (
                  <div id="file_img">
                    <Loading />
                  </div>
                ) : (
                  <div id="file_img" style={styleUpload}>
                    <img src={images ? images.url : ""} alt="" />
                    <span onClick={handleDestroy}>X</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <label htmlFor="product_id">Product ID</label>
                  <input
                    type="text"
                    name="product_id"
                    id="product_id"
                    required
                    value={product.product_id}
                    onChange={handleChangeInput}
                    disabled={onEdit}
                  />
                </div>

                <div className="row">
                  <label htmlFor="title">Tên</label>
                  <input
                    type="text"
                    name="title"
                    id="title"
                    required
                    value={product.title}
                    onChange={handleChangeInput}
                  />
                </div>

                <div className="row">
                  <label htmlFor="price">Đơn giá</label>
                  <input
                    type="number"
                    name="price"
                    id="price"
                    required
                    value={product.price}
                    onChange={handleChangeInput}
                  />
                </div>

                <div className="row">
                  <label htmlFor="description">Mô tả</label>
                  <textarea
                    type="text"
                    name="description"
                    id="description"
                    required
                    value={product.description}
                    rows="5"
                    onChange={handleChangeInput}
                  />
                </div>

                <div className="row">
                  <label htmlFor="content">Nội dung</label>
                  <textarea
                    type="text"
                    name="content"
                    id="content"
                    required
                    value={product.content}
                    rows="7"
                    onChange={handleChangeInput}
                  />
                </div>

                <div className="row">
                  <label htmlFor="categories">Loại sản phẩm: </label>
                  <select
                    name="category"
                    value={product.category}
                    onChange={handleChangeInput}
                  >
                    <option value="">Vui lòng chọn loại sản phẩm</option>
                    {categories.map((category) => (
                      <option value={category._id} key={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="row">
                  <label htmlFor="categories">Nhà cung cấp: </label>
                  <select
                    name="provider"
                    value={product.provider}
                    onChange={handleChangeInput}
                  >
                    <option value="">Vui lòng chọn nhà cung cấp</option>
                    {providers.map((provider) => (
                      <option value={provider.name} key={provider._id}>
                        {provider.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button type="submit">{onEdit ? "Cập nhật" : "Thêm"}</button>
              </form>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default CreateProducts;
