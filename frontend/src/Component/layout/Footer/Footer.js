import React from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <motion.div
          className="footer__left"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <img src="SureSHop.png" alt="Logo" className="footer__logo" />

          <div className="footer__socials">
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#!"
              aria-label="Instagram"
            >
              <FontAwesomeIcon icon={faInstagram} className="footer__icon" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#!"
              aria-label="Facebook"
            >
              <FontAwesomeIcon icon={faFacebook} className="footer__icon" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#!"
              aria-label="Twitter"
            >
              <FontAwesomeIcon icon={faTwitter} className="footer__icon" />
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.2 }}
              href="#!"
              aria-label="YouTube"
            >
              <FontAwesomeIcon icon={faYoutube} className="footer__icon" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          className="footer__center"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <ul>
            <li>
              <a href="#!">Contact</a>
            </li>
            <li>
              <a href="#!">Log in</a>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#!">Order Status</a>
            </li>
            <li>
              <a href="#!">Wholesale</a>
            </li>
            <li>
              <a href="#!">Careers</a>
            </li>
          </ul>
        </motion.div>

        <motion.div
          className="footer__right"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <h4>Sign Up for Emails</h4>
          <p>Your one-stop destination for everything extraordinary.</p>
          <form className="footer__form">
            <input type="email" placeholder="Email" required />
            <button type="submit">Sign Me Up</button>
          </form>
        </motion.div>
      </div>
      <div className="footer__bottom">
        <p>
          © 2024 Ajeet <a href="#!">Privacy Policy</a>{" "}
          <a href="#!">Cookie Policy</a>
        </p>
        <p>Rishikesh , UTTRAKHAND IN</p>
      </div>
    </footer>
  );
};

export default Footer;
