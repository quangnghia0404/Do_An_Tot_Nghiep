import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Banner from "./banner.svg";
import Swal from "sweetalert2";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const registerSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/user/register", { ...user });

      localStorage.setItem("firstLogin", true);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Đăng ký thành công",
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
    // <div className="login-page">
    //     <form onSubmit={registerSubmit}>
    //         <h2>Register</h2>
    //         <input type="text" name="name" required placeholder="Name"
    //         autoComplete="off" value={user.name}  onChange={onChangeInput}/>

    //         <input type="email" name="email" required placeholder="Email"
    //         autoComplete="off" value={user.email}  onChange={onChangeInput}/>

    //         <input type="password" name="password" required placeholder="Password"
    //         autoComplete="on" value={user.password} onChange={onChangeInput}/>

    //         <div className="row">
    //             <div>
    //                 <button type="submit">Register</button>
    //             </div>
    //             <div>
    //                 <span>Do you already have an account? </span><Link to="/login">Login</Link>
    //             </div>
    //         </div>
    //     </form>
    // </div>
    <div class="split-screen">
      <div class="left-login">
        <img src={Banner} alt="" class="left__img" />
      </div>
      <div class="right-login">
        <form onSubmit={registerSubmit}>
          <section class="copy">
            <h2>Đăng Ký</h2>
          </section>
          <div class="input-container name">
            <label>Tên đăng nhập</label>
            <input
              type="text"
              name="name"
              required
              autoComplete="off"
              value={user.name}
              onChange={onChangeInput}
            />
          </div>
          <div class="input-container name">
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
          <div class="input-container password">
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

          <button class="signup-btn" id="submitLogin">
            Đăng Ký
          </button>
          <div class="connect">
            <p>
              Bạn đã có tài khoản? <Link to="/login">Đăng nhập</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
