import React, { useContext, useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Footer from "../../footers/Footer";
import ReactHtmlParser from "react-html-parser";

function DetailProduct() {
  //* Truyền và bắt API gọi product
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const addCart = state.userAPI.addCart;
  const [detailProduct, setDetailProduct] = useState([]);

  //* Kiểm tra id product
  useEffect(() => {
    let html = document.querySelector("html");
    html.scrollTop = 0;
    // code to run after render goes here
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setDetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  var description = detailProduct.description;
  var newArray = [];
  function descriptionDetail() {
    for (let index = 0; index < description.length; index++) {
      newArray.push(description[index]);
    }
    return newArray;
  }
  descriptionDetail();

  let newDescription = newArray
    .map((item) => (item === "!" ? (item += "<br>") : item))
    .join("")
    .replaceAll("!", " ")
    .toString();

  return (
    <>
      <div className="container note">
        <div className="note-left">
          <p>Chi tiêt sản phẩm</p>
        </div>
        <div className="note-right">
          <Link to="/" id="link">
            Trang chủ
          </Link>{" "}
          / Chi tiêt sản phẩm
        </div>
      </div>
      {/* {isAdmin ? (
        ""
      ) : (
        <div className="note">
          <div className="note-left">
            <p>Details Product</p>
          </div>
          <div className="note-right">
            <Link to="/" id="link">
              Home
            </Link>{" "}
            / Details Product
          </div>
        </div>
      )} */}

      {/* <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
          </div>
          <span>${detailProduct.price}</span>
          <p>{detailProduct.description}</p>
          <p>{detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link
            to="/cart"
            className="cart"
            onClick={() => addCart(detailProduct)}
          >
            Buy Now
          </Link>
        </div>
      </div> */}

      <div className="main container">
        <div className="row product">
          {/* NIKE SHOE */}
          <div className="shoe">
            <div>
              <img className="shoe-img" src={detailProduct.images.url} alt />
              {/* <img class="shoe-img" src="./images/pic2.png" alt="" /> */}
            </div>
          </div>
          <div className="info">
            {/* INFORMATION */}
            <div className="shoe-info">
              <h2 className="info-title">{detailProduct.title}</h2>
              {/* <p className="info-description">{newDescription}</p> */}
              <div className="info-description">
                {ReactHtmlParser(newDescription)}
              </div>
              <div className="info-description">
                Nhà cung cấp: {detailProduct.provider}
              </div>
            </div>
            {/* PRICE */}
            <div className="price">
              <span className="price-title">${detailProduct.price}</span>
              <span className="sold-title">Đã bán: {detailProduct.sold}</span>
              <Link
                to="/cart"
                className="price-button"
                style={{ textDecoration: "none" }}
                onClick={() => addCart(detailProduct)}
              >
                <i class="fas fa-shopping-cart"></i>
                <span className="pl-2"> MUA NGAY</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="replace">
          <h2 id="replace-product">Các sản phẩm liên quan</h2>
          <div className="products">
            {products.map((product) => {
              return product.category === detailProduct.category ? (
                <ProductItem key={product._id} product={product} />
              ) : null;
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default DetailProduct;
