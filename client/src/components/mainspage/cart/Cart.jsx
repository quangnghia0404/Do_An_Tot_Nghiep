import React, { useContext, useState, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import axios from "axios";
import PaypalButton from "./PaypalButton";
import { Link } from "react-router-dom";
import Aroww from "../../headers/icon/arrow.svg";
import Footer from "../../footers/Footer";
import Cart_Emty from "../../../images/cart.png";
import Swal from "sweetalert2";

function Cart() {
  const state = useContext(GlobalState);
  const [cart, setCart] = state.userAPI.cart;
  const [token] = state.token;
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const getTotal = () => {
      const total = cart.reduce((prev, item) => {
        return prev + item.price * item.quantity;
      }, 0);

      setTotal(total);
    };

    getTotal();
  }, [cart]);

  //* Thêm sản phẩm vào giỏ hàng
  const addToCart = async (cart) => {
    await axios.patch(
      "/user/addcart",
      { cart },
      {
        headers: { Authorization: token },
      }
    );
  };

  //* Tăng số lượng sản phẩm trong giỏ hàng
  const increment = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        if (item.quantity < 10) {
          item.quantity += 1;
        } else {
          Swal.fire({
            icon: "error",
            title: "Bạn chỉ được mua 10 sản phẩm.!",
            text: "Vui lòng kiểm tra lại!",
          });
        }
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  //* Giảm số lượng sản phẩm trong giỏ hà
  const decrement = (id) => {
    cart.forEach((item) => {
      if (item._id === id) {
        item.quantity === 1 ? (item.quantity = 1) : (item.quantity -= 1);
      }
    });

    setCart([...cart]);
    addToCart(cart);
  };

  //* Xóa sản phẩm khỏi giỏ hàng
  const removeProduct = (id) => {
    // if (window.confirm("Do you want to delete this product?")) {

    // }
    Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      text: "Bạn sẽ không hoàn tác được!",
      icon: "warning",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Có, xóa nó!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          "Đã xóa!",
          "Sản phẩm của bạn đã xóa khỏi giỏ hàng",
          "success"
        );
        cart.forEach((item, index) => {
          if (item._id === id) {
            cart.splice(index, 1);
          }
        });

        setCart([...cart]);
        addToCart(cart);
      }
    });
  };

  //* Thanh toán giỏ hàng bằng payment và xóa giỏ hàng
  const tranSuccess = async (payment) => {
    const { paymentID, address } = payment;

    await axios.post(
      "/api/payment",
      { cart, paymentID, address },
      {
        headers: { Authorization: token },
      }
    );

    setCart([]);
    addToCart([]);
    Swal.fire("Cảm ơn!!", "Bạn đã đặt hàng thành công.!", "success");
  };

  //* Kiển tra giỏ hàng
  if (cart.length === 0) {
    return (
      <div>
        <div className="container d-flex justify-content-center">
          <img src={Cart_Emty} width="600" />
        </div>

        <div className="load_more" style={{ padding: 10 }}>
          <a href="http://localhost:3000/" style={{ textDecoration: "none" }}>
            <button className="btn btn-gradient container d-flex">
              Mua ngay
            </button>
          </a>
        </div>
        <Footer />
      </div>
    );
  }
  return (
    <div>
      <div className="note">
        <div className="note-left">
          <p>Giỏ hàng</p>
        </div>
        <div className="note-right">
          <Link to="/" id="link">
            Trang chủ
          </Link>{" "}
          / Giỏ hàng
        </div>
      </div>
      <div className="cart-page">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-8">
              <div className="cart-page-inner">
                <div className="table-responsive">
                  <table className="table table-bordered">
                    <thead className="thead-dark">
                      <tr>
                        <th>Sản phẩm</th>
                        <th>Đơn giá</th>
                        <th>Số lượng</th>
                        <th>Tổng giá</th>
                        <th>Xóa</th>
                      </tr>
                    </thead>
                    <tbody className="align-middle">
                      {cart.map((product) => (
                        <tr key={product._id}>
                          <td>
                            <div className="img">
                              <a href="#">
                                <img src={product.images.url} alt="Image" />
                              </a>
                              <p>{product.title}</p>
                            </div>
                          </td>
                          <td>${product.price}</td>
                          <td>
                            <div className="qty">
                              <button
                                className="btn-minus"
                                onClick={() => decrement(product._id)}
                              >
                                <i className="fa fa-minus" />
                              </button>
                              <input
                                type="text"
                                maxLength="1"
                                value={product.quantity}
                              />
                              <button
                                className="btn-plus"
                                onClick={() => increment(product._id)}
                              >
                                <i className="fa fa-plus" />
                              </button>
                            </div>
                          </td>
                          <td>${product.price * product.quantity}</td>
                          <td>
                            <button onClick={() => removeProduct(product._id)}>
                              <i className="fa fa-trash" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <div className="load_more" style={{ padding: 10 }}>
                    <a
                      href="http://localhost:3000/"
                      style={{ textDecoration: "none" }}
                    >
                      <button className="btn btn-gradient d-flex">
                        Quay lại cửa hàng
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="cart-page-inner">
                <div className="row">
                  <div className="col-md-12">
                    <div className="cart-summary">
                      <div className="cart-content">
                        <h1>Tóm tắt giỏ hàng</h1>
                        {cart.map((product) => (
                          <div key={product._id}>
                            <p>
                              {product.title}
                              <span>${product.price * product.quantity}</span>
                            </p>
                          </div>
                        ))}
                        <h2>
                          Tổng cộng<span>$ {total}</span>
                        </h2>
                      </div>
                      <div className="cart-btn">
                        <PaypalButton
                          total={total}
                          tranSuccess={tranSuccess}
                          style={{ paddingTop: "20px" }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
