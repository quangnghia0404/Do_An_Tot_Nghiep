import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { GlobalState } from "../../../GlobalState";
import Header from "../../headers/Header";

function Dashboard() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [users, setUsers] = state.userAPI.users;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  const [menu, setMenu] = useState(false);

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.replace("/login");
  };
  return (
    <div>
      {isAdmin ? "" : <Header />}
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
            <span className="ti-search" style={{ color: "black" }}></span>
            <input type="search" placeholder="Tìm kiếm" />
          </div>
          <div className="social-icons" style={{ color: "black" }}>
            {isLogged ? (
              <>
                <span className="ti-user user"> Xin chào, {users}</span>
                <span className="ti-power-off" onClick={logoutUser}></span>
              </>
            ) : (
              <></>
            )}
            <div></div>
          </div>
        </header>
        <main>
          <h2 className="dashboard-title">Overview</h2>
          <div className="dashboard-carts">
            <div className="cart-single">
              <div className="cart-body">
                <span className="ti-briefcase"></span>
                <div>
                  <h5>Account Balance</h5>
                  <h3>$30,659.45</h3>
                </div>
              </div>
              <div className="cart-footer">
                <a href="">View all</a>
              </div>
            </div>

            <div className="cart-single">
              <div className="cart-body">
                <span className="ti-reload"></span>
                <div>
                  <h5>Pending</h5>
                  <h3>$30,659.45</h3>
                </div>
              </div>
              <div className="cart-footer">
                <a href="">View all</a>
              </div>
            </div>

            <div className="cart-single">
              <div className="cart-body">
                <span className="ti-check-box"></span>
                <div>
                  <h5>Processed</h5>
                  <h3>$30,659.45</h3>
                </div>
              </div>
              <div className="cart-footer">
                <a href="">View all</a>
              </div>
            </div>
          </div>

          <section className="recent">
            <div className="activity-gird">
              <div className="activity-cart">
                <h3>Recent Activity</h3>
                <table border="1">
                  <thead>
                    <tr>
                      <th>Project</th>
                      <th>Start Date</th>
                      <th>End Date</th>
                      <th>Team</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>App development</td>
                      <td>15 Aug, 2021</td>
                      <td>21 Aug, 2021</td>
                      <td className="td-team">
                        <div className="img-1"></div>
                        <div className="img-2"></div>
                        <div className="img-3"></div>
                      </td>
                      <td>
                        <span className="badge badge-success">Success</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Front-End</td>
                      <td>15 Aug, 2021</td>
                      <td>21 Aug, 2021</td>
                      <td className="td-team">
                        <div className="img-1"></div>
                        <div className="img-2"></div>
                        <div className="img-3"></div>
                      </td>
                      <td>
                        <span className=" badge badge-success">Success</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Front-End and Desgin</td>
                      <td>15 Aug, 2021</td>
                      <td>21 Aug, 2021</td>
                      <td className="td-team">
                        <div className="img-1"></div>
                        <div className="img-2"></div>
                        <div className="img-3"></div>
                      </td>
                      <td>
                        <span className="badge badge-warning">Success</span>
                      </td>
                    </tr>
                    <tr>
                      <td>Web development</td>
                      <td>15 Aug, 2021</td>
                      <td>21 Aug, 2021</td>
                      <td className="td-team">
                        <div className="img-1"></div>
                        <div className="img-2"></div>
                        <div className="img-3"></div>
                      </td>
                      <td>
                        <span className="badge badge-success">Success</span>
                      </td>
                    </tr>
                    <tr>
                      <td>App development</td>
                      <td>15 Aug, 2021</td>
                      <td>21 Aug, 2021</td>
                      <td className="td-team">
                        <div className="img-1"></div>
                        <div className="img-2"></div>
                        <div className="img-3"></div>
                      </td>
                      <td>
                        <span className="badge badge-warning">Success</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="sumary">
                <div className="sumary-card">
                  <div className="sumary-single">
                    <span className="ti-id-badge"></span>
                    <div>
                      <h5>196</h5>
                      <small>Number of staff</small>
                    </div>
                  </div>
                  <div className="sumary-single">
                    <span className="ti-calendar"></span>
                    <div>
                      <h5>16</h5>
                      <small>Number of leave</small>
                    </div>
                  </div>
                  <div className="sumary-single">
                    <span className="ti-face-smile"> </span>
                    <div>
                      <h5>12</h5>
                      <small>Profile update request</small>
                    </div>
                  </div>
                </div>
                <div className="bday-card">
                  <div className="bday-flex">
                    <div className="bday-img"></div>
                    <div className="bday-info">
                      <h5>Dwayne F. Sanders</h5>
                      <small>Birthday Today</small>
                    </div>
                  </div>

                  <div className="text-center">
                    <button>
                      <span className="ti-gift"> WhisHim</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
