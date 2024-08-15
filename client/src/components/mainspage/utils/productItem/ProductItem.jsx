import React, { useContext } from "react";
import { Link } from "react-router-dom";
import BtnRender from "./BtnRender";
import { GlobalState } from "../../../../GlobalState";

function ProductItem({ product, isAdmin, deleteProduct, handleCheck }) {
  const state = useContext(GlobalState);
  const addCart = state.userAPI.addCart;
  return (
    <div>
      {isAdmin ? (
        <div className="box">
          <div className="product_card">
            {isAdmin && (
              <input
                type="checkbox"
                checked={product.checked}
                onChange={() => handleCheck(product._id)}
              />
            )}
            <img src={product.images.url} alt="" />

            <div className="product_box">
              <h2 title={product.title}>{product.title}</h2>
              <span>${product.price}</span>
              <p>{product.description}</p>
            </div>

            <BtnRender product={product} deleteProduct={deleteProduct} />
          </div>
        </div>
      ) : (
        <Link to={`/detail/${product._id}`} style={{ textDecoration: "none" }}>
          {/* <div className="box">
            <div className="product_card">
              {isAdmin && <input type="checkbox" checked={product.checked} />}
              <img src={product.images.url} alt="" />

              <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
              </div>

              <BtnRender product={product} />
            </div>
          </div> */}
          <div className="grid-item featured-rooms">
            <div className="image-wrap">
              <img src={product.images.url} alt="" className="room-image" />
            </div>
            <div className="room-info-wrap">
              <span className="room-price">
                <i className="fa fa-dollar"></i> {product.price}
              </span>
              <p className="paragraph">{product.title}</p>
              <Link
                onClick={() => addCart(product)}
                className="btn rooms-btn"
                style={{ textDecoration: "none", color: "black" }}
              >
                Thêm vào giỏ hàng <i class="fas fa-shopping-cart pl-2"></i>
              </Link>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

export default ProductItem;
