import React, { Fragment, useEffect } from "react";
//import { CgMouse } from "react-icons/all";
import MetaData from "../layout/MetaData.js";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import { clearErrors, getProduct } from "../../action/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/loader.js";
import Categories from "./Category.js";
import { useAlert } from "react-alert";
import ImageSlider from "./OfferSlider.js";
const slides = [
  {
    image: "Sales_bn.jpg",
    alt: "Summer Sale",
    offerText: "Diwali Sale: 20% Off All Items!",
  },
  {
    image: "chir_bn.jpg",
    alt: "New Collection",
    offerText: "Christmas OFFER UPTO 50% OFF",
  },
  {
    image: "fashion_bn.jpg",
    alt: "Free Shipping Offer",
  },
];
const Home = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, error, products } = useSelector((state) => state.products);
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="SureShop | Home" />
          <ImageSlider slides={slides} />
          {/*<div className="banner">
            <p>Product SLIDE</p>
            <h1>Exicetment Offers</h1>
            <a href="#container">
              //<button>Scroll</button>
            </a>
          </div>*/}
          <h2 className="homeHeading">PRODUCT CATEGORY</h2>
          <Categories />
          <h2 className="homeHeading">FEATURED PRODUCTS</h2>
          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
        </Fragment>
      )}
    </>
  );
};

export default Home;
