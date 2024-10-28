import React, { Fragment, useEffect, useState } from "react";
import { clearErrors, getProduct } from "../../action/productAction";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Component/layout/Loader/loader.js";
import ProductCard from "../Home/ProductCard.js";
import "./Products.css";
import { useLocation } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Slider } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
const Categories = [
  "Laptops",
  "Watches",
  "Footwares",
  "Headsets",
  "Gadegts",
  "Smartphones",
  "Garments",
  "Skincare",
  "Child Section",
];

const Products = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState(
    new URLSearchParams(useLocation().search).get("category") || ""
  );
  const [ratings, setRating] = useState(0);

  const { products, loading, error, productsCount, resultPerPage } =
    useSelector((state) => state.products);

  const keyword = match.params.keyword;
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="Ecommerce | Products" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard product={product} key={product._id} />
              ))}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={100000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {Categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend">Rating</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRating(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
          </div>
          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
