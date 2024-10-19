import React, { useState } from "react";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import {
  FaHome,
  FaShoppingCart,
  FaInfoCircle,
  FaPhone,
  FaSearch,
  FaBoxes,
} from "react-icons/fa";
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import styles from "./Navbar.module.css";
import UserOptions from "./userOptions";

const LogoSure = styled.img`
  height: 4rem; /* Reduced height for a more compact navbar */
`;

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={`${styles.navbar}`}>
      {/* Logo */}
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <LogoSure src="SureSHop.gif" alt="logo" />
      </motion.div>

      {/* Links */}
      <motion.div
        className={`${styles.navLinks} ${isOpen ? styles.open : ""}`}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { opacity: 1, height: "auto" },
          closed: { opacity: 1, height: "0px", overflow: "hidden" },
        }}
        transition={{ duration: 0.5 }}
      >
        <ul>
          <motion.li whileHover={{ scale: 1.05 }}>
            <a href="/">
              <FaHome /> Home
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <a href="/products">
              <FaBoxes /> Products
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <a href="/about">
              <FaInfoCircle /> About
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <a href="/contact">
              <FaPhone /> Contact
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <a href="/orders">
              <FaBoxes /> Orders
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <a href="/cart">
              <FaShoppingCart /> Cart
            </a>
          </motion.li>
          <motion.li whileHover={{ scale: 1.05 }}>
            <a href="/search">
              <FaSearch /> Search
            </a>
          </motion.li>
        </ul>
      </motion.div>

      {/* User Options */}
      <div className={styles.userOptions}>
        {isAuthenticated && <UserOptions user={user} />}
      </div>

      {/* Menu Toggle Button (visible only on small screens) */}
      <motion.button
        className={styles.menuToggle}
        onClick={toggleMenu}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isOpen ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </motion.button>
    </nav>
  );
};

export default Navbar;
