import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0% 40% 0% 0%;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  font-family: "Poppins", sans-serif;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const Logo = styled.div`
  img {
    width: clamp(100px, 10vw, 200px); /* Adjust min and max size as needed */
    height: auto;
  }
`;

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  gap: 20px;

  @media (max-width: 768px) {
    display: none; /* Hide menu on small screens */
  }
`;

const MenuItem = styled.li`
  cursor: pointer;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: orange;
  }
`;

const HamburgerMenu = styled.div`
  display: none;
  cursor: pointer;

  svg {
    width: 30px;
    height: 30px;
  }

  @media (max-width: 768px) {
    display: block; /* Show hamburger on small screens */
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  width: 250px;
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

const MOBMenuItem = styled.div`
  margin: 10px 0;
  font-size: 18px;
  color: #333;
  text-align: center;
`;

// Framer Motion animation variants
const menuVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: "100%" },
};

const linkVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <NavbarContainer>
        {/* Logo Section */}
        <Logo>
          <Link to="/">
            <motion.div whileHover={{ scale: 1.1 }}>
              <img src="SureSHop.png" alt="Logo" />
            </motion.div>
          </Link>
        </Logo>

        {/* Menu Section for large screens */}
        <Menu>
          {["Home", "Products", "About", "Contact"].map((item, index) => (
            <MenuItem key={index}>
              <Link
                to={`/${item.toLowerCase()}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <motion.div whileHover={{ scale: 1.1 }}>{item}</motion.div>
              </Link>
            </MenuItem>
          ))}
        </Menu>

        {/* Hamburger Icon for small screens */}
        <HamburgerMenu onClick={toggleMenu}>
          {isMenuOpen ? <FiX /> : <FiMenu />}
        </HamburgerMenu>
      </NavbarContainer>

      {/* Mobile Menu */}
      <MobileMenu
        initial={false}
        animate={isMenuOpen ? "open" : "closed"}
        variants={menuVariants}
        transition={{ duration: 0.3 }}
      >
        {["Home", "Products", "About", "Contact"].map((item, index) => (
          <motion.div
            key={index}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Link
              to={`/${item.toLowerCase()}`}
              onClick={toggleMenu}
              style={{ textDecoration: "none", color: "inherit" }}
            >
              <MOBMenuItem>{item}</MOBMenuItem>
            </Link>
          </motion.div>
        ))}

        <motion.div
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        ></motion.div>
      </MobileMenu>
    </>
  );
};

export default Navbar;
