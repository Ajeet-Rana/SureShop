import React, { useState, useEffect } from "react";
import styles from "./OfferSlider.module.css";

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + slides.length) % slides.length
    );
  };

  return (
    <div className={styles.sliderContainer}>
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`${styles.slide} ${
            index === currentIndex ? styles.active : ""
          }`}
          style={{ transform: `translateX(${100 * (index - currentIndex)}%)` }}
        >
          <img
            src={slide.image}
            alt={slide.alt || `Slide ${index + 1}`}
            className={styles.image}
          />
          {slide.offerText && (
            <div className={styles.offerText}>{slide.offerText}</div>
          )}
        </div>
      ))}
      <button className={`${styles.arrow} ${styles.left}`} onClick={prevSlide}>
        &#10094;
      </button>
      <button className={`${styles.arrow} ${styles.right}`} onClick={nextSlide}>
        &#10095;
      </button>
      <div className={styles.dots}>
        {slides.map((_, index) => (
          <span
            key={index}
            className={`${styles.dot} ${
              index === currentIndex ? styles.activeDot : ""
            }`}
            onClick={() => setCurrentIndex(index)}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default ImageSlider;
