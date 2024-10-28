import React from "react";
import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import "./Categories.css";

const Categories = () => {
  const history = useHistory();
  const categories = [
    { title: "OFFERS", image: "Center_bn.jpg" },
    { title: "Laptops", image: "laptop_bn.jpg" },
    { title: "Headsets", image: "headphone_bn.jpg" },
    { title: "Watches", image: "watch_bn.jpg" },
    { title: "Footwares", image: "shoes_bn.jpg" },
    { title: "", image: "More_bn.jpg" },
  ];

  const handleCategoryClick = (category) => {
    // Navigate to the products page with the category as a query parameter
    history.push(`/products?category=${encodeURIComponent(category)}`);
  };

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className={`category category-${index + 1}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
          onClick={() => handleCategoryClick(category.title)}
        >
          <img
            src={category.image}
            alt={category.title}
            className="category-image"
          />
          <motion.div
            className="category-title"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 * index }}
          >
            {category.title}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default Categories;
