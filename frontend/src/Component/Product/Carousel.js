import React, { useState } from "react";

const CarouselCmp = ({ product }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % product.images.length);
  };

  const handlePrevClick = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + product.images.length) % product.images.length
    );
  };

  return (
    <div className="carousel">
      <div
        className="carousel-inner"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {product.images &&
          product.images.map((item, i) => (
            <div className="carousel-item" key={i}>
              <img
                className="carousel-image"
                src={item.url}
                alt={`${i} Slide`}
              />
            </div>
          ))}
      </div>
      <button className="carousel-control prev" onClick={handlePrevClick}>
        &#10094;
      </button>
      <button className="carousel-control next" onClick={handleNextClick}>
        &#10095;
      </button>
    </div>
  );
};

export default CarouselCmp;
