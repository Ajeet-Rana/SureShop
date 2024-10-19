import { createStore, combineReducers, applyMiddleware } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productsReducer,
} from "./reducer/productReducer";
import {
  allUsersReducer,
  userDetailsReducer,
  forgotPasswordReducer,
  profileReducer,
  userReducer,
} from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  allOrdersReducer,
  myOrderReducer,
  neworderReducer,
  orderDetailReducer,
  orderReducer,
} from "./reducer/orderReducer";

const reducer = combineReducers({
  products: productsReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgetPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: neworderReducer,
  myOrders: myOrderReducer,
  orderDetails: orderDetailReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  product: productReducer,
  allOrders: allOrdersReducer,
  order: orderReducer,
});
let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;
