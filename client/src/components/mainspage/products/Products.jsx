import React, { useContext, useState } from "react";
import { GlobalState } from "../../../GlobalState";
import ProductItem from "../utils/productItem/ProductItem";
import Loading from "../../mainspage/utils/loading/Loading";
import { Link } from "react-router-dom";
import axios from "axios";
import Filters from "./Filters";
import LoadMore from "./LoadMore";
import Footer from "../../footers/Footer";
import Topbar from "../../headers/Topbars";
import NoProduct from "./NoProduct";

function Products() {
  const state = useContext(GlobalState);
  const [products, setProducts] = state.productsAPI.products;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback;
  const [loading, setLoading] = useState(false);
  const [isCheck, setIsCheck] = useState(false);

  const handleCheck = (id) => {
    products.forEach((product) => {
      if (product._id === id) product.checked = !product.checked;
    });
    setProducts([...products]);
  };

  const deleteProduct = async (id, public_id) => {
    try {
      setLoading(true);
      const destroyImg = await axios.post(
        "api/destroy",
        { public_id },
        {
          headers: { Authorization: token },
        }
      );
      const deleteProduct = await axios.delete(`api/products/${id}`, {
        headers: { Authorization: token },
      });

      await destroyImg;
      await deleteProduct;
      setCallback(!callback);
      setLoading(false);
    } catch (err) {
      alert(err.response.data.msg);
    }
  };

  const checkAll = () => {
    products.forEach((product) => {
      product.checked = !isCheck;
    });
    setProducts([...products]);
    setIsCheck(!isCheck);
  };

  const deleteAll = () => {
    products.forEach((product) => {
      if (product.checked) deleteProduct(product._id, product.images.public_id);
    });
  };

  if (loading)
    return (
      <div>
        <Loading />
      </div>
    );
  return (
    <div>
      {isAdmin && (
        <div className="delete-all">
          <span>Select all</span>
          <input type="checkbox" checked={isCheck} onChange={checkAll} />
          <button onClick={deleteAll}>Delete All</button>
        </div>
      )}
      {/* <div className="products">
        {products.map((product) => {
          return (
            <ProductItem
              key={product._id}
              product={product}
              isAdmin={isAdmin}
              deleteProduct={deleteProduct}
              handleCheck={handleCheck}
            />
          );
        })}
      </div> */}
      <section className="rooms">
        <div className="title text-center">
          <h3 className="title-heading">SẢN PHẨM HÀNG ĐẦU</h3>
          <div className="line" />
          {/* <p className="title-sub">SẢN PHẨM BÁN CHẠY NHẤT</p> */}
        </div>
        <div className="container">
          <Filters />
          <div className="grid rooms-grid">
            {products.map((product) => {
              return (
                <ProductItem
                  key={product._id}
                  product={product}
                  isAdmin={isAdmin}
                  deleteProduct={deleteProduct}
                  handleCheck={handleCheck}
                />
              );
            })}
          </div>
        </div>
      </section>

      {products.length === 0 && <NoProduct />}
      <LoadMore />
      {/* <Footer /> */}
    </div>
  );
}

export default Products;
