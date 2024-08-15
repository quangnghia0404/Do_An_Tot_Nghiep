import React, { useContext } from "react";
import { Switch, Route } from "react-router-dom";
import Products from "./products/Products";
import DetailProduct from "./DetailProduct/DetailProduct";
import Login from "./auth/Login";
import Register from "./auth/Register";
import OrderHistory from "./history/OrderHistory";
import OrderDetails from "./history/OrderDetails";
import Cart from "./cart/Cart";
import NotFound from "./utils/notfound/NotFound";
import CreateMember from "../mainspage/admin/CreateMember/CreateMembers";
import CreateProvider from "../mainspage/admin/CreateProvider/CreateProvider";
import CreateCoupon from "../mainspage/admin/CreateProvider/CreateCoupon";
import Home from "./Home";
import Introduce from "../../components/mainspage/introduce/Introduce";
import Contact from "../../components/mainspage/contact/Contact";
import Duties from "../mainspage/admin/CreateMember/CreateDuty";
import Members from "../mainspage/admin/ListProduct/ListMember";
import Coupon from "../mainspage/admin/ListProduct/ListCoupon";
import Dashboard from "../mainspage/admin/Dashboard";
import ListProduct from "../mainspage/admin/ListProduct/ListProduct";
import ListContact from "../mainspage/admin/ListProduct/ListContact";
import ListProvider from "../mainspage/admin/ListProduct/ListProvider";
import History from "../mainspage/admin/ListProduct/History";
import DetailHistory from "../mainspage/admin/ListProduct/DetailHistory";
import CreateProducts from "../mainspage/admin/CreateProduct/CreateProducts";
import CreateCategory from "../mainspage/admin/CreateProduct/CreateCategory";
import Loading from "./utils/loading/Loading";

import { GlobalState } from "../../GlobalState";

function Pages() {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;

  return (
    <Switch>
      <Route path="/" exact component={isAdmin ? Dashboard : Home} />
      <Route path="/products" exact component={Products} />

      <Route path="/admin" exact component={Dashboard} />
      <Route path="/detail/:id" exact component={DetailProduct} />

      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />

      <Route
        path="/category"
        exact
        component={isAdmin ? CreateCategory : NotFound}
      />
      <Route
        path="/list_member"
        exact
        component={isAdmin ? Members : NotFound}
      />
      <Route
        path="/list_coupon"
        exact
        component={isAdmin ? Coupon : NotFound}
      />

      <Route path="/duty" exact component={isAdmin ? Duties : NotFound} />
      <Route
        path="/list_product"
        exact
        component={isAdmin ? ListProduct : NotFound}
      />
      <Route
        path="/list_contact"
        exact
        component={isAdmin ? ListContact : NotFound}
      />
      <Route
        path="/list_provider"
        exact
        component={isAdmin ? ListProvider : NotFound}
      />
      <Route
        path="/list_history"
        exact
        component={isAdmin ? History : NotFound}
      />
      <Route
        path="/detail_history/:id"
        exact
        component={isLogged ? DetailHistory : NotFound}
      />
      <Route
        path="/create_member"
        exact
        component={isAdmin ? CreateMember : NotFound}
      />
      <Route
        path="/edit_member/:id"
        exact
        component={isAdmin ? CreateMember : NotFound}
      />
      <Route
        path="/create_coupon"
        exact
        component={isAdmin ? CreateCoupon : NotFound}
      />
      <Route
        path="/edit_coupon/:id"
        exact
        component={isAdmin ? CreateCoupon : NotFound}
      />

      <Route
        path="/create_provider"
        exact
        component={isAdmin ? CreateProvider : NotFound}
      />
      <Route
        path="/edit_provider/:id"
        exact
        component={isAdmin ? CreateProvider : NotFound}
      />
      <Route
        path="/create_product"
        exact
        component={isAdmin ? CreateProducts : NotFound}
      />
      <Route
        path="/edit_product/:id"
        exact
        component={isAdmin ? CreateProducts : NotFound}
      />

      <Route
        path="/history"
        exact
        component={isLogged ? OrderHistory : NotFound}
      />
      <Route
        path="/introduce"
        exact
        component={isAdmin ? NotFound : Introduce}
      />
      <Route path="/contact" exact component={isAdmin ? NotFound : Contact} />
      <Route
        path="/history/:id"
        exact
        component={isLogged ? OrderDetails : Loading}
      />

      <Route path="/cart" exact component={isAdmin ? NotFound : Cart} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
}

export default Pages;
