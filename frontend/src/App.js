import Header from "./Component/layout/Header/Header";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import WebFont from "webfontloader";
import React from "react";
import Footer from "./Component/layout/Footer/Footer";
import Home from "./Component/Home/Home";
import ProductDetails from "./Component/Product/productDetails";
import Products from "./Component/Product/Products";
import Search from "./Component/Product/Search";
import LoginSignUP from "./Component/User/LoginSignUP";
import store from "./Store.js";
import { loadUser } from "./action/userAction";
import Profile from "./Component/User/Profile";
import ProtectedRoute from "./Component/Route/ProtectedRoute";
import UpdateProfile from "./Component/User/UpdateProfile";
import UpdatePassword from "./Component/User/UpdatePassword";
import ForgetPassword from "./Component/User/ForgetPassword";
import ResetPassword from "./Component/User/ResetPassword";
import Shipping from "./Component/Cart/Shipping.js";
import ConfirmOrder from "./Component/Cart/ConfirmOrder";
import Cart from "./Component/Cart/Cart.js";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import Payment from "./Component/Cart/Payment";
import orderSuccess from "./Component/Cart/orderSuccess";
import MyOrders from "./Component/Order/Myorder.js";
import OrderDetails from "./Component/Order/OrderDetails.js";
import Dashboard from "./Component/admin/dashboard.js";
import ProductList from "./Component/admin/ProductList.js";
import NewProduct from "./Component/admin/NewProduct.js";
import updateProduct from "./Component/admin/updateProduct.js";
import OrderLIst from "./Component/admin/OrderLIst.js";
import processOrder from "./Component/admin/processOrder.js";
import UsersList from "./Component/admin/userList.js";
import UpdateUser from "./Component/admin/updateUser.js";
import Navbar from "./Component/layout/Header/Navbar1.js";
import UserOptions from "./Component/layout/Header/userOptions.js";
import { useSelector } from "react-redux";
export default function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getstripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");
    setStripeApiKey(data.stripeApiKey);
  }
  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });
    store.dispatch(loadUser());
    getstripeApiKey();
  }, []);
  return (
    <Router>
      {isAuthenticated && <UserOptions user={user} />}
      <Navbar />
      <ProtectedRoute exact path="/account" component={Profile} />
      <ProtectedRoute exact path="/me/update" component={UpdateProfile} />
      <ProtectedRoute exact path="/shipping" component={Shipping} />
      <ProtectedRoute exact path="/orderConfirm" component={ConfirmOrder} />
      <ProtectedRoute exact path="/success" component={orderSuccess} />
      <ProtectedRoute exact path="/orders" component={MyOrders} />
      <ProtectedRoute exact path="/order/:id" component={OrderDetails} />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/dashboard"
        component={Dashboard}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/products"
        component={ProductList}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/product"
        component={NewProduct}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/product/:id"
        component={updateProduct}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/orders"
        component={OrderLIst}
      />
      <ProtectedRoute
        isAdmin={true}
        exact
        path="/admin/order/:id"
        component={processOrder}
      />
      <ProtectedRoute
        exact
        path="/admin/users"
        isAdmin={true}
        component={UsersList}
      />
      <ProtectedRoute
        exact
        path="/admin/user/:id"
        isAdmin={true}
        component={UpdateUser}
      />

      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <ProtectedRoute exact path="/process/payment" component={Payment} />
        </Elements>
      )}

      <ProtectedRoute
        exact
        path="/password/update"
        component={UpdatePassword}
      />

      <Route exact path="/" component={Home} />
      <Route exact path="/product/:id" component={ProductDetails} />
      <Route exact path="/products" component={Products} />
      <Route path="/products/:keyword" component={Products} />
      <Route exact path="/search" component={Search} />
      <Route exact path="/login" component={LoginSignUP} />
      <Route exact path="/password/forget" component={ForgetPassword} />
      <Route exact path="/password/reset/:token" component={ResetPassword} />
      <Route exact path="/cart" component={Cart} />
      <Footer />
    </Router>
  );
}
// header  and footer removed
/*  <Header /> <Footer />  */
