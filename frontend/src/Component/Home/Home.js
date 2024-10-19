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
    image: "sales1.webp",
    alt: "Summer Sale",
    offerText: "Summer Sale: 20% Off All Items!",
  },
  {
    image: "sales2.webp",
    alt: "New Collection",
    offerText: "New Fall Collection Now Available",
  },
  {
    image: "sales3.webp",
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
