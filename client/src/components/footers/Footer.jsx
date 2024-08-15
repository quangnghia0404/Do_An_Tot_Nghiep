import React from "react";

import Tele from "../../components/telephone/Tele";

import CourseAdvice from "../courseAdvice/CourseAdvice";
import ToastMessage from "../toastmessage/ToastMessage";
import { Link } from "react-router-dom";
import Logo from "../headers/icon/ADH.jpg";

function Footer() {
  return (
    <div>
      <Tele />
      <CourseAdvice />
      <ToastMessage />
      {/* <ScollTop /> */}
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-map-marker-alt" />
                  <div className="cta-text">
                    <h4>Tìm chúng tôi</h4>
                    <span>28 Điện Biên Phủ, Tp. Nha Trang</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fas fa-phone" />
                  <div className="cta-text">
                    <h4>gọi chúng tôi</h4>
                    <span>0916 816 910</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="far fa-envelope-open" />
                  <div className="cta-text">
                    <h4>mail chúng tôi</h4>
                    <span>adhteachnology@info.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <Link to="/">
                      <img className="logoimg" src={Logo} alt="" width="100" />
                    </Link>
                  </div>
                  <div className="footer-text">
                    <p>KHÓA KHÁCH SẠN AMADEO – ĐỈNH CAO CÔNG NGHỆ AUSTRIA</p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Theo dõi chúng tôi</span>
                    <Link>
                      <i className="fab fa-facebook-f facebook-bg" />
                    </Link>
                    <Link>
                      <i className="fab fa-twitter twitter-bg" />
                    </Link>
                    <Link>
                      <i className="fab fa-google-plus-g google-bg" />
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Liên kết hữu ích</h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="/">Trang chủ</Link>
                    </li>
                    <li>
                      <Link to="login">Đăng nhập</Link>
                    </li>
                    <li>
                      <Link to="/introduce">Giới thiệu</Link>
                    </li>
                    <li>
                      <Link to="/register">Đăng ký</Link>
                    </li>
                    <li>
                      <Link to="/contact">Liên hệ</Link>
                    </li>
                    <li>
                      <Link to="/cart">Giỏ hàng</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Đăng ký</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Đừng bỏ lỡ đăng ký nguồn cấp dữ liệu mới của chúng tôi,
                      vui lòng điền vào mẫu bên dưới.
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email của bạn" />
                      <button>
                        <i className="fab fa-telegram-plane" />
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    Copyright © 2018, All Right Reserved{" "}
                    <a href="https://codepen.io/anupkumar92/">Anup</a>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="#">Home</a>
                    </li>
                    <li>
                      <a href="#">Terms</a>
                    </li>
                    <li>
                      <a href="#">Privacy</a>
                    </li>
                    <li>
                      <a href="#">Policy</a>
                    </li>
                    <li>
                      <a href="#">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
