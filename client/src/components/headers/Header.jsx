import React, { useContext, useState } from "react";
import { GlobalState } from "../../GlobalState";
import Topbar from "../headers/Topbars";
import Menu from "./icon/bars.svg";
import Close from "./icon/times.svg";
import Cart from "./icon/shopping-bag.svg";
import Logo from "./icon/ADH.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

function Header() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.replace("/login");
  };

  // const loggedRouter = () => {
  //   return (
  //     <>
  //       <li>
  //         <Link to="/history" onClick={() => setMenu(!menu)}>
  //           History
  //         </Link>
  //       </li>
  //       <li>
  //         <Link to="/" onClick={logoutUser}>
  //           logout
  //         </Link>
  //       </li>
  //     </>
  //   );
  // };

  const styleMenu = {
    left: menu ? 0 : "-100%",
  };

  return (
    <div>
      {isAdmin ? "" : <Topbar />}
      {isAdmin ? (
        <></>
      ) : (
        <div className="logo-menu">
          <div className="container d-flex justify-content-between">
            <div className="logo d-flex ">
              <Link to="/">
                <img className="logoimg" src={Logo} alt="" width="100" />
              </Link>
            </div>
            <div className="navbar-right">
              <ul className="d-flex justify-content-between">
                <li className="link">
                  <Link to="/">TRANG CHỦ</Link>
                </li>
                <li className="link">
                  <Link to="/introduce">GIỚI THIỆU</Link>
                </li>
                <li className="link">
                  <Link to="/contact">LIÊN HỆ</Link>
                </li>

                {isLogged ? (
                  <>
                    <li className="link">
                      <Link to="/history" onClick={() => setMenu(!menu)}>
                        ĐƠN MUA
                      </Link>
                    </li>
                    {/* <li>
                    <img
                      src={Cart}
                      alt=""
                      width="30"
                      style={{ color: "black" }}
                    />
                  </li> */}
                    <li className="link">
                      <Link to="/cart">
                        <img className="carttt" src={Cart} alt="" width="25" />
                        <span>
                          {" "}
                          <span>{cart.length}</span> Items
                        </span>
                      </Link>
                    </li>
                  </>
                ) : (
                  ""
                )}
                {isLogged ? (
                  ""
                ) : (
                  <li className="link">
                    <Link to="/cart">
                      <img className="carttt" src={Cart} alt="" />
                      <span> 0 Items</span>
                    </Link>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
