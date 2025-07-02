import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./footer.css";

// Assuming FontAwesome is already set up in your project
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faTwitter,
  faYoutube,
  faLinkedinIn,
  faPinterestP,
} from "@fortawesome/free-brands-svg-icons";
import {
  faGem,
  faHome,
  faEnvelope,
  faPhone,
  faAngleRight,
  faPaperPlane,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [hoverIcon, setHoverIcon] = useState(null);

  // Handle newsletter subscription
  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() !== "" && email.includes("@")) {
      setSubscribed(true);
      setEmail("");
      // Here you would normally send the email to your backend
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  // Social media links data
  const socialLinks = [
    { icon: faFacebookF, color: "#3b5998", url: "https://facebook.com" },
    { icon: faInstagram, color: "#e1306c", url: "https://instagram.com" },
    { icon: faTwitter, color: "#1da1f2", url: "https://twitter.com" },
    { icon: faYoutube, color: "#ff0000", url: "https://youtube.com" },
    { icon: faLinkedinIn, color: "#0077b5", url: "https://linkedin.com" },
    { icon: faPinterestP, color: "#e60023", url: "https://pinterest.com" },
  ];

  // Services links data
  const serviceLinks = [
    { name: "Home Designs", path: "/" },
    { name: "Interior Designs", path: "/" },
    { name: "Home Plans", path: "/" },
    { name: "Home Architecture", path: "/" },
    { name: "3D Visualization", path: "/" },
    { name: "Renovation Services", path: "/" },
  ];

  // Quick links data
  const quickLinks = [
    { name: "About Us", path: "/about" },
    { name: "Contact Us", path: "/contact" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms of Service", path: "/terms" },
    { name: "FAQ", path: "/faq" },
  ];

  // Contact info data
  const contactInfo = [
    { icon: faHome, text: "Opex Towers, Pune, Maharashtra, India" },
    { icon: faEnvelope, text: "contact@opexhomesolutions.com" },
    { icon: faPhone, text: "+91 987 654 3210" },
  ];

  return (
    <footer className="footer-container">
      {/* Top wave decoration */}
      <div className="footer-wave">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 140">
          <path
            fill="var(--footer-wave-color)"
            fillOpacity="1"
            d="M0,128L60,117.3C120,107,240,85,360,90.7C480,96,600,128,720,128C840,128,960,96,1080,80C1200,64,1320,64,1380,64L1440,64L1440,140L1380,140C1320,140,1200,140,1080,140C960,140,840,140,720,140C600,140,480,140,360,140C240,140,120,140,60,140L0,140Z"
          ></path>
        </svg>
      </div>

      {/* Newsletter Section */}
      <div className="newsletter-section">
        <div className="container">
          <div className="newsletter-container">
            <div className="newsletter-content">
              <h3>Subscribe to Our Newsletter</h3>
              <p>
                Get the latest design trends, home inspiration and exclusive
                offers
              </p>
            </div>
            <div className="newsletter-form">
              <AnimatePresence>
                {subscribed ? (
                  <motion.div
                    className="subscription-success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <FontAwesomeIcon icon={faHeart} className="success-icon" />
                    <p>Thank you for subscribing!</p>
                  </motion.div>
                ) : (
                  <motion.form
                    onSubmit={handleSubscribe}
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <div className="input-group">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email address"
                        required
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <FontAwesomeIcon icon={faPaperPlane} />
                      </motion.button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Bar */}
      <div className="social-bar">
        <div className="container">
          <div className="social-bar-content">
            <div className="social-text">
              <span>Connect with us</span>
            </div>
            <div className="social-icons">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon"
                  onMouseEnter={() => setHoverIcon(index)}
                  onMouseLeave={() => setHoverIcon(null)}
                  whileHover={{ y: -5 }}
                  style={{
                    backgroundColor:
                      hoverIcon === index
                        ? social.color
                        : "var(--social-icon-bg)",
                  }}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="footer-content">
        <div className="container">
          <div className="footer-widgets">
            {/* Company Info Widget */}
            <div className="footer-widget company-info">
              <motion.div
                className="footer-logo"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <FontAwesomeIcon icon={faGem} className="logo-icon" />
                <h2>OPEX HOME SOLUTIONS</h2>
              </motion.div>
              <p className="company-description">
                Crafting dream living spaces since 2010. At Opex Home Solutions,
                we blend innovative design with practical architecture to create
                homes that reflect your personality and elevate your lifestyle.
              </p>
              <div className="company-values">
                <span>Quality</span>
                <span>Innovation</span>
                <span>Reliability</span>
              </div>
            </div>

            {/* Services Widget */}
            <div className="footer-widget services-widget">
              <h3 className="widget-title">Our Services</h3>
              <ul className="widget-links">
                {serviceLinks.map((service, index) => (
                  <li key={index}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        to={service.path}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="link-icon"
                        />
                        {service.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick Links Widget */}
            <div className="footer-widget quick-links-widget">
              <h3 className="widget-title">Quick Links</h3>
              <ul className="widget-links">
                {quickLinks.map((link, index) => (
                  <li key={index}>
                    <motion.div
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <Link
                        to={link.path}
                        onClick={() => window.scrollTo(0, 0)}
                      >
                        <FontAwesomeIcon
                          icon={faAngleRight}
                          className="link-icon"
                        />
                        {link.name}
                      </Link>
                    </motion.div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Widget */}
            <div className="footer-widget contact-widget">
              <h3 className="widget-title">Contact Us</h3>
              <ul className="contact-info">
                {contactInfo.map((info, index) => (
                  <li key={index}>
                    <motion.div
                      className="contact-item"
                      whileHover={{ x: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="contact-icon">
                        <FontAwesomeIcon icon={info.icon} />
                      </div>
                      <div className="contact-text">{info.text}</div>
                    </motion.div>
                  </li>
                ))}
              </ul>
              <div className="working-hours">
                <h4>Working Hours</h4>
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom-content">
            <div className="copyright">
              © {new Date().getFullYear()}{" "}
              <Link to="/">Opex Home Solutions</Link>. All Rights Reserved.
            </div>
            <div className="footer-bottom-links">
              <Link to="/privacy">Privacy</Link>
              <Link to="/terms">Terms</Link>
              <Link to="/sitemap">Sitemap</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
