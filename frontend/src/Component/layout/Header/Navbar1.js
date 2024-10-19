import React, { useState } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import {
  FiUser,
  FiSearch,
  FiHeart,
  FiShoppingCart,
  FiMenu,
  FiX,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  height: 80px;
  background-color: #fff;
  border-bottom: 1px solid #ccc;
  font-family: "Poppins", sans-serif;

  @media (max-width: 768px) {
    padding: 0 10px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  font-weight: bold;
  color: orange;
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

const Icons = styled.div`
  display: flex;
  gap: 15px;

  svg {
    width: 24px;
    height: 24px;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
      transform: scale(1.2);
    }
  }

  @media (max-width: 768px) {
    display: none; /* Hide icons on small screens */
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
  width: 250px; /* Partial width of the screen */
  height: 100%;
  background-color: #fff;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;

  @media (min-width: 768px) {
    display: none; /* Hide mobile menu on larger screens */
  }
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
            <motion.div whileHover={{ scale: 1.1 }}>SURE SHOP</motion.div>
          </Link>
        </Logo>

        {/* Menu Section for large screens */}
        <Menu>
          {["Home", "Shop", "About", "Contact"].map((item, index) => (
            <MenuItem key={index}>
              <Link to={`/${item.toLowerCase()}`}>
                <motion.div whileHover={{ scale: 1.1 }}>{item}</motion.div>
              </Link>
            </MenuItem>
          ))}
        </Menu>

        {/* Icons Section for large screens */}
        <Icons>
          <Link to="/profile">
            <motion.div whileHover={{ scale: 1.2 }}>
              <FiUser />
            </motion.div>
          </Link>

          <Link to="/search">
            <motion.div whileHover={{ scale: 1.2 }}>
              <FiSearch />
            </motion.div>
          </Link>

          <Link to="/wishlist">
            <motion.div whileHover={{ scale: 1.2 }}>
              <FiHeart />
            </motion.div>
          </Link>

          <Link to="/cart">
            <motion.div whileHover={{ scale: 1.2 }}>
              <FiShoppingCart />
            </motion.div>
          </Link>
        </Icons>

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
        {["Home", "Shop", "About", "Contact"].map((item, index) => (
          <motion.div
            key={index}
            variants={linkVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1 }}
          >
            <Link to={`/${item.toLowerCase()}`} onClick={toggleMenu}>
              <MenuItem>{item}</MenuItem>
            </Link>
          </motion.div>
        ))}

        <motion.div
          variants={linkVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <Icons>
            <Link to="/profile">
              <motion.div whileHover={{ scale: 1.2 }}>
                <FiUser />
              </motion.div>
            </Link>

            <Link to="/search">
              <motion.div whileHover={{ scale: 1.2 }}>
                <FiSearch />
              </motion.div>
            </Link>

            <Link to="/wishlist">
              <motion.div whileHover={{ scale: 1.2 }}>
                <FiHeart />
              </motion.div>
            </Link>

            <Link to="/cart">
              <motion.div whileHover={{ scale: 1.2 }}>
                <FiShoppingCart />
              </motion.div>
            </Link>
          </Icons>
        </motion.div>
      </MobileMenu>
    </>
  );
};

export default Navbar;
