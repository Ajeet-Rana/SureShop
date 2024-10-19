import { Fragment, React, useEffect, useState } from "react";
import "./productDetails.css";
import { useSelector, useDispatch } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  newReview,
} from "../../action/productAction";
import CarouselCmp from "./Carousel.js";
import ReviewCard from "./productReview";
import Loader from "../../Component/layout/Loader/loader.js";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData.js";
import { addItemsToCart } from "../../action/cartAction.js";
import styles from "./counter.module.css";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../constants/productConstants.js";
const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );

  const { success, error: reviewerror } = useSelector(
    (state) => state.newReview
  );

  const [count, setCount] = useState(1);

  const increment = () => {
    if (count < product.Stock) {
      setCount(count + 1);
    }
    return;
  };

  const decrement = () => {
    if (count > 1) {
      setCount(count - 1);
    }
    return;
  };

  const options = {
    size: "large",
    value: product.ratings,
    readOnly: true,
    precision: 0.5,
  };
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const addTocartHandler = () => {
    dispatch(addItemsToCart(match.params.id, count));
    alert.success("Item Added To Cart");
  };
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const reviewSubmitHandler = () => {
    const myForm = new FormData();
    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);
    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (reviewerror) {
      alert.error(reviewerror);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, error, alert, success, reviewerror]);
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name}--Ecommerce`} />
          <div className="ProductDetails">
            <CarouselCmp product={product} />
            <div>
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className={styles.counterContainer}>
                    <div className={styles.counterValue}>{count}</div>
                    <button
                      onClick={increment}
                      className={`${styles.button} ${styles.buttonIncrement}`}
                    >
                      +
                    </button>
                    <button
                      onClick={decrement}
                      className={`${styles.button} ${styles.buttonDecrement}`}
                    >
                      -
                    </button>
                  </div>
                  <button onClick={addTocartHandler}>Add to Cart</button>
                </div>

                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">Reviews</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />
              <textarea
                className="submitDialogTextArear"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button color="primary" onClick={reviewSubmitHandler}>
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard review={review} key={review._id} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
