import React, { useContext, useState, useEffect } from "react";
import phone from "./icon/phone.svg";
import evelope from "./icon/envelope.svg";
import map from "./icon/map.svg";
import facebook from "./icon/facebook.svg";
import google from "./icon/google.svg";
import twitter from "./icon/twitter.svg";
import instagram from "./icon/instagram.svg";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../GlobalState";

function Topbar() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [users, setUsers] = state.userAPI.users;

  //  const name = () =>{
  //    {users.map(())}

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.replace("/login");
  };
  return (
    <div className="topbar">
      <div className="container d-flex justify-content-between ">
        <div className="d-flex mt-1">
          <i className="fa fa-phone" aria-hidden="true">
            <span className="phone"> 0772465715</span>
          </i>
          <i className="fa fa-envelope pl-2" aria-hidden="true">
            <span className="phone"> dangquangnghia26091999@gmail.com</span>
          </i>
          <i className="fa fa-facebook pl-2" aria-hidden="true"></i>
          <i className="fa fa-google pl-2" aria-hidden="true"></i>
          <i className="fa fa-twitter pl-2" aria-hidden="true"></i>
          <i className="fa fa-instagram pl-2" aria-hidden="true"></i>
        </div>
        <div className="d-flex justify-content-between">
          <div className="top-bar-right">
            {isLogged ? (
              <>
                <i className="fas fa-user ">
                  <span> Xin chào, {users}</span>
                </i>
                <i
                  className="ti-power-off ml-2 primary"
                  aria-hidden="true"
                  onClick={logoutUser}
                ></i>
              </>
            ) : (
              <i className="fas fa-user ">
                <Link to="/login"> Đăng nhập</Link>
              </i>
            )}
          </div>
          <div className="top-bar-right  bd-none">
            {isLogged ? (
              ""
            ) : (
              <i className="fas fa-user-edit">
                <Link to="/register"> Đăng ký</Link>
              </i>
            )}
          </div>
          {/* <div className="top-bar-right bd-none">
            <i className="fas fa-cart-plus">
              <Link to="/cart">
                <span> {cart.length} Items</span>
              </Link>
            </i>
          </div> */}
        </div>
      </div>
    </div>
  );
}

export default Topbar;
