import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Banner from "./banner.svg";
import Swal from "sweetalert2";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const loginSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/login", { ...user });

      localStorage.setItem("firstLogin", true);

      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đăng nhập thành công",
        showConfirmButton: false,
        timer: 1100,
      });
      window.location.replace("/");
    } catch (err) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: err.response.data.msg,
        showConfirmButton: false,
        timer: 1100,
      });
    }
  };

  return (
    <div>
      <div className="split-screen">
        <div className="left-login">
          <img src={Banner} alt="" className="left__img" />
        </div>
        <div className="right-login">
          <form onSubmit={loginSubmit}>
            <section className="copy">
              <h2>Đăng nhập</h2>
            </section>
            <div className="input-container name">
              <label>Email</label>
              <input
                type="email"
                name="email"
                required
                autoComplete="off"
                value={user.email}
                onChange={onChangeInput}
              />
            </div>
            <div className="input-container password">
              <label>Mật khẩu</label>
              <div>
                <input
                  type="password"
                  name="password"
                  required
                  autoComplete="on"
                  value={user.password}
                  onChange={onChangeInput}
                />
              </div>
            </div>

            <button className="signup-btn" id="submitLogin">
              Đăng nhập
            </button>
            <div className="connect">
              <p>
                Bạn chưa có tài khoản ? <Link to="/register">Đăng ký</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
