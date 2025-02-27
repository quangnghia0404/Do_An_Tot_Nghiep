import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function UserAPI(token) {
  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  const [users, setUser] = useState([]);

  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {
          const res = await axios.get("/user/infor", {
            headers: { Authorization: token },
          });

          setIsLogged(true);
          res.data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);

          setCart(res.data.cart);
          setUser(res.data.name);
        } catch (err) {
          Swal.fire({
            icon: "error",
            title: err.response.data.msg,
          });
        }
      };
      getUser();
    }
  }, [token]);

  const addCart = async (product) => {
    if (!isLogged)
      return Swal.fire({
        icon: "info",
        title: "Vui lòng đăng nhập để mua hàng",
      });

    const check = cart.every((item) => {
      return item._id !== product._id;
    });

    if (check) {
      setCart([...cart, { ...product, quantity: 1 }]);

      await axios.patch(
        "user/addcart",
        { cart: [...cart, { ...product, quantity: 1 }] },
        { headers: { Authorization: token } }
      );
    } else {
      Swal.fire({
        icon: "info",
        title: "Sản phẩm đã có trong giỏ hàng",
      });
    }
  };

  return {
    users: [users, setUser],
    isLogged: [isLogged, setIsLogged],
    isAdmin: [isAdmin, setIsAdmin],
    addCart: addCart,
    cart: [cart, setCart],
    history: [history, setHistory],
  };
}

export default UserAPI;
