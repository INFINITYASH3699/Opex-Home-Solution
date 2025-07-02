import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSun,
  faMoon,
  faBars,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";

// Import images
import logo from "../assets/logo.png";
import homeIcon from "../assets/home.png";
import servicesIcon from "../assets/services.png";
import aboutIcon from "../assets/about.png";
import contactIcon from "../assets/contact.png";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Navigation links with image icons
  const navLinks = [
    { title: "Properties", path: "/home", icon: homeIcon },
    { title: "Services", path: "/services", icon: servicesIcon },
    { title: "About", path: "/about", icon: aboutIcon },
    { title: "Contact", path: "/contact", icon: contactIcon },
  ];

  // Enhanced scroll effect in your Navbar.jsx
  useEffect(() => {
    const handleScroll = () => {
      // Binary state for class toggling
      setScrolled(window.scrollY > 50);

      // Continuous scaling factor (0 to 1 based on scroll position)
      const scrollFactor = Math.min(1, window.scrollY / 200);
      document.documentElement.style.setProperty(
        "--scroll-factor",
        scrollFactor
      );
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply theme to body and save to localStorage
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Detect window resize for mobile/desktop switch
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Detect scroll for navbar appearance change
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  // Toggle mobile menu function
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Check if a route is active
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className={`navbar-main ${scrolled ? "scrolled" : ""} ${theme}`}>
      <div className="navbar-container">
        {/* Logo Section */}
        <div className="navbar-logo">
          <Link to="/" aria-label="Home">
            <motion.img
              src={logo}
              alt="Company Logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="navbar-desktop">
          <div className="nav-links-container">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-item ${isActive(link.path) ? "active" : ""}`}
                aria-label={link.title}
                title={link.title}
              >
                <motion.div
                  className="nav-icon-wrapper"
                  whileHover={{
                    scale: 1.15,
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 },
                  }}
                >
                  <img src={link.icon} alt={link.title} className="nav-icon" />
                  {isActive(link.path) && (
                    <motion.div
                      className="active-indicator"
                      layoutId="activeIndicator"
                      initial={false}
                    />
                  )}
                </motion.div>
                <span className="nav-label">{link.title}</span>
              </Link>
            ))}
          </div>
        </nav>

        {/* Theme Toggle and Mobile Menu Button */}
        <div className="navbar-controls">
          <motion.button
            className="theme-toggle"
            onClick={toggleTheme}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1, rotate: theme === "dark" ? 180 : 0 }}
            title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? faSun : faMoon}
              className={theme === "dark" ? "sun-icon" : "moon-icon"}
            />
          </motion.button>

          <motion.button
            className="mobile-toggle"
            onClick={toggleMenu}
            whileTap={{ scale: 0.9 }}
            aria-expanded={isMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-items">
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className={`mobile-nav-item ${
                      isActive(link.path) ? "active" : ""
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <img
                      src={link.icon}
                      alt={link.title}
                      className="mobile-nav-icon"
                    />
                    <span>{link.title}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
