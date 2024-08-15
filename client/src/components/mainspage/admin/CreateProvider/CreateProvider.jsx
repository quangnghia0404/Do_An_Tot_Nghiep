import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../utils/loading/Loading";
import Swal from "sweetalert2";

const initialState = {
  provider_id: "",
  name: "",
  email: "",
  phone: 0,
  address: "",
  _id: "",
};

function CreateProvider() {
  const state = useContext(GlobalState);
  const [provider, setProvider] = useState(initialState);
  const [isLogged] = state.userAPI.isLogged;
  const [users] = state.userAPI.users;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [providers] = state.providersAPI.providers;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.providersAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      providers.forEach((provider) => {
        if (provider._id === param.id) {
          setProvider(provider);
          setImages(provider.images);
        }
      });
    } else {
      setOnEdit(false);
      setProvider(initialState);
      setImages(false);
    }
  }, [param.id, providers]);

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
    setProvider({ ...provider, [name]: value });
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
          `/api/providers/${provider._id}`,
          { ...provider, images },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Cập nhập thành công!",
        });
        window.location.href = "/list_provider";
      } else {
        await axios.post(
          "/api/providers",
          { ...provider, images },
          {
            headers: { Authorization: token },
          }
        );
        Swal.fire({
          icon: "success",
          title: "Thêm mới thành công",
        });
        window.location.href = "/list_provider";
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
                <span>easywire</span>
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
                <span> Home</span>
              </Link>
            </li>
            <li>
              <Link to="/list_coupon">
                <span className="ti-notepad"></span>
                <span> Import</span>
              </Link>
            </li>
            <li>
              <Link to="/list_provider">
                <span className="ti-book"></span>
                <span> Providers</span>
              </Link>
            </li>
            <li>
              <Link to="/list_product">
                <span className="ti-layers-alt"></span>
                <span> Products</span>
              </Link>
            </li>
            <li>
              <Link to="/category">
                <span className="ti-clipboard"></span>
                <span> Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/list_member">
                <span className="ti-id-badge"></span>
                <span> Members</span>
              </Link>
            </li>
            <li>
              <Link to="/duty">
                <span className="ti-write"></span>
                <span> Duties</span>
              </Link>
            </li>
            <li>
              <Link to="/list_contact">
                <span className="ti-book"></span>
                <span> Contacts</span>
              </Link>
            </li>
            <li>
              <Link to="/list_history">
                <span className="ti-receipt"></span>
                <span> History</span>
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
                  {onEdit ? "Edit Providers" : "Create Providers"}
                </div>
                <div className="note-right">
                  <Link to="/" id="link">
                    Admin
                  </Link>{" "}
                  / {onEdit ? "Edit Providers" : "Create Providers"}
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
                  <label htmlFor="provider_id">Provider ID</label>
                  <input
                    type="text"
                    name="provider_id"
                    id="product_id"
                    required
                    value={provider.provider_id}
                    onChange={handleChangeInput}
                    disabled={onEdit}
                  />
                </div>

                <div className="row">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={provider.name}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="row">
                  <label htmlFor="content">Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    required
                    value={provider.email}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="row">
                  <label htmlFor="content">Phone</label>
                  <input
                    type="text"
                    name="phone"
                    id="phone"
                    maxlength="10"
                    required
                    value={provider.phone}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="row">
                  <label htmlFor="content">Address</label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    required
                    value={provider.address}
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

export default CreateProvider;
