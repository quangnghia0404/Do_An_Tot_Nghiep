import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../../GlobalState";
import { useHistory, useParams } from "react-router-dom";
import Loading from "../../utils/loading/Loading";

const initialState = {
  member_id: "",
  name: "",
  phone: 0,
  duty: "",
  _id: "",
};

function CreateMembers() {
  const state = useContext(GlobalState);
  const [member, setMember] = useState(initialState);
  const [duties] = state.dutiesAPI.duties;
  const [isLogged] = state.userAPI.isLogged;
  const [users, setUsers] = state.userAPI.users;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);

  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;

  const history = useHistory();
  const param = useParams();

  const [members] = state.membersAPI.members;
  const [onEdit, setOnEdit] = useState(false);
  const [callback, setCallback] = state.membersAPI.callback;

  useEffect(() => {
    if (param.id) {
      setOnEdit(true);
      members.forEach((member) => {
        if (member._id === param.id) {
          setMember(member);
          setImages(member.images);
        }
      });
    } else {
      setOnEdit(false);
      setMember(initialState);
      setImages(false);
    }
  }, [param.id, members]);

  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      const file = e.target.files[0];

      if (!file) return alert("File not exist.");

      if (file.size > 1024 * 1024) return alert("Size to large!.");

      if (file.type !== "image/jpeg" && file.type !== "image/png")
        return alert("File format is incorrect!.");

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
      alert(err.response.data.msg);
    }
  };

  const handleDestroy = async () => {
    try {
      if (!isAdmin) return alert("You're not an admin");
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
      alert(err.response.data.msg);
    }
  };

  const handleChangeInput = async (e) => {
    const { name, value } = e.target;
    setMember({ ...member, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return alert("You're not an admin");
      if (!images) return alert("No image upload");

      if (onEdit) {
        await axios.put(
          `/api/members/${member._id}`,
          { ...member, images },
          {
            headers: { Authorization: token },
          }
        );
        alert("Update successfully!");
        window.location.href = "/list_member";
      } else {
        if (window.confirm("Bạn có muốn thêm nhân viên này?")) {
          await axios.post(
            "/api/members",
            { ...member, images },
            {
              headers: { Authorization: token },
            }
          );
          alert("Create member successfully!");
          window.location.href = "/list_member";
        }
      }
      setCallback(!callback);
      history.push("/");
    } catch (err) {
      alert(err.response.data.msg);
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
                  {onEdit ? "cập nhật nhân viên" : "Thêm nhân viên"}
                </div>
                <div className="note-right">
                  <Link to="/" id="link">
                    Admin
                  </Link>{" "}
                  / {onEdit ? "cập nhật nhân viên" : "Thêm nhân viên"}
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
                  <label htmlFor="member_id">Member ID</label>
                  <input
                    type="text"
                    name="member_id"
                    id="product_id"
                    required
                    value={member.member_id}
                    onChange={handleChangeInput}
                    disabled={onEdit}
                  />
                </div>

                <div className="row">
                  <label htmlFor="name">Tên</label>
                  <input
                    type="text"
                    name="name"
                    id="title"
                    required
                    value={member.name}
                    onChange={handleChangeInput}
                  />
                </div>
                <div className="row">
                  <label htmlFor="content">Mô tả</label>
                  <input
                    type="text"
                    name="content"
                    id="content"
                    required
                    value={member.content}
                    onChange={handleChangeInput}
                  />
                </div>

                <div className="row">
                  <label htmlFor="duties">Chức vụ: </label>
                  <select
                    name="duty"
                    value={member.duty}
                    onChange={handleChangeInput}
                  >
                    <option value="">Vui lòng chọn chức vụ</option>
                    {duties.map((duty) => (
                      <option value={duty.name} key={duty.name}>
                        {duty.name}
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

export default CreateMembers;
