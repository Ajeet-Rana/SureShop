import React from "react";
import { motion } from "framer-motion";
import "./Categories.css"; // Assuming you're using an external CSS file for styling

const Categories = () => {
  const categories = [
    { title: "Microphones", image: "sales1.webp" },
    { title: "Earphones", image: "sales2.webp" },
    { title: "Headphones", image: "sales3.webp" },
    { title: "Accessories", image: "sales1.webp" },
    { title: "Bundles", image: "sales2.webp" },
    { title: "More", image: "sales3.webp" },
  ];

  return (
    <div className="categories-container">
      {categories.map((category, index) => (
        <motion.div
          key={index}
          className={`category category-${index + 1}`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ duration: 0.3 }}
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
