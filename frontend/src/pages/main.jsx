import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faPaintRoller,
  faRuler,
  faCalculator,
  faChevronDown,
  faArrowRight,
  faCheckCircle,
  faTimes,
  faSpinner,
  faInr,
  faMapMarkerAlt,
  faRulerCombined,
  faLaptopHouse,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/main.css";

const Main = () => {
  // State for form data and UI
  const [formData, setFormData] = useState({
    name: "",
    area: "",
    landOptions: "",
  });
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formValid, setFormValid] = useState(false);
  const [notification, setNotification] = useState(null);
  const [activeSection, setActiveSection] = useState(0);
  const [scrollY, setScrollY] = useState(0);

  // References for scroll animations
  const navigate = useNavigate();
  const offeringSectionRef = useRef(null);
  const sectionRefs = useRef([]);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // House design options
  const designOptions = [
    { value: "Bungalow", label: "Bungalow", icon: faHome },
    { value: "Villa", label: "Villa", icon: faHome },
    { value: "Apartment", label: "Apartment", icon: faBuilding },
  ];

  // Area options
  const areaOptions = [
    { value: "500-1000", label: "500-1000 sq.ft" },
    { value: "1000-1500", label: "1000-1500 sq.ft" },
    { value: "1500-2000", label: "1500-2000 sq.ft" },
    { value: "2000-2500", label: "2000-2500 sq.ft" },
    { value: "2500-3000", label: "2500-3000 sq.ft" },
    { value: "3000-3500", label: "3000-3500 sq.ft" },
    { value: "3500-4000", label: "3500-4000 sq.ft" },
    { value: "4000-6000", label: "4000-6000 sq.ft" },
    { value: "6000-10000", label: "6000-10000 sq.ft" },
  ];

  // Land options
  const landOptions = [
    { value: "Urban", label: "Urban", icon: faBuilding },
    { value: "Suburban", label: "Suburban", icon: faHome },
    { value: "Rural", label: "Rural", icon: faMapMarkerAlt },
  ];

  // Offering data for services section
  const offeringData = [
    {
      title: "Home Designs",
      description:
        "Discover diverse home designs tailored to various styles and budgets. Customize layouts and get detailed plans with cost estimates.",
      image:
        "https://media-assets0.s3.ap-south-1.amazonaws.com/ext_int_plan.png",
      icon: faHome,
      color: "#6366f1",
      link: "/home",
    },
    {
      title: "Exterior Designs",
      description:
        "Comprehensive exterior home designs with detailed price, area specifications, and estimated construction costs for various styles.",
      image:
        "https://thearchitectsdiary.com/wp-content/uploads/2020/05/MEtal-Facade.jpg",
      icon: faBuilding,
      color: "#8b5cf6",
      link: "/home",
    },
    {
      title: "Interior Designs",
      description:
        "Personalize your spaces with customizable furniture layouts and decor styles. Choose from modern, traditional, or minimalist themes.",
      image:
        "https://asset-ng.skoiy.com/9b80a6f781ff336f/yrwwqpnyb7ys.jpg?w=970&q=90&fm=webp",
      icon: faPaintRoller,
      color: "#ec4899",
      link: "/home",
    },
    {
      title: "Architectural Plans",
      description:
        "Get access to architectural plans that align with modern design principles and integrate seamlessly with existing infrastructure.",
      image:
        "https://house-designs-data.s3.ap-south-1.amazonaws.com/Building_10003/plan/Building_10003_pln_1.jpg",
      icon: faRuler,
      color: "#f59e0b",
      link: "/home",
    },
  ];

  // Validate form inputs
  useEffect(() => {
    const { name, area, landOptions } = formData;
    setFormValid(name !== "" && area !== "" && landOptions !== "");
  }, [formData]);

  // Handle scroll animations
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);

      // Update active section based on scroll position
      sectionRefs.current.forEach((section, index) => {
        if (!section) return;

        const rect = section.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight * 0.5 &&
          rect.bottom >= window.innerHeight * 0.5
        ) {
          setActiveSection(index);
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to offerings section
  const scrollToOfferings = () => {
    if (offeringSectionRef.current) {
      offeringSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formValid) {
      setNotification({
        type: "error",
        message: "Please fill all required fields",
      });
      setTimeout(() => setNotification(null), 3000);
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post(
        `${API_BASE_URL}/api/predict-price`,
        formData
      );
      setPredictedPrice(response.data.price);

      setNotification({
        type: "success",
        message: "Price estimation completed successfully!",
      });
      setTimeout(() => setNotification(null), 3000);
    } catch (error) {
      console.error("Error predicting price:", error);
      setNotification({
        type: "error",
        message: "Failed to estimate price. Please try again later.",
      });
      setTimeout(() => setNotification(null), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  // Navigate to related designs
  const viewRelatedDesigns = (price) => {
    const searchParams = {
      name: formData.name,
      area: formData.area,
      landOptions: formData.landOptions,
      price,
    };
    navigate("/home", { state: searchParams });
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const fadeInRight = {
    hidden: { opacity: 0, x: 30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5 } },
  };

  const staggerChildren = {
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="main-wrapper">
      {/* Notification */}
      <AnimatePresence>
        {notification && (
          <motion.div
            className={`main-notification ${notification.type}`}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="notification-content">
              <FontAwesomeIcon
                icon={notification.type === "success" ? faCheckCircle : faTimes}
                className="notification-icon"
              />
              <p>{notification.message}</p>
            </div>
            <button
              className="notification-close"
              onClick={() => setNotification(null)}
              aria-label="Close notification"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="main-hero">
        <div className="main-hero-overlay"></div>
        <div className="container main-hero-container">
          <div className="row align-items-center main-hero-row">
            <div className="col-lg-7 main-hero-text-col">
              <motion.div
                className="main-hero-text"
                initial="hidden"
                animate="visible"
                variants={staggerChildren}
              >
                <motion.h1 variants={fadeInUp}>
                  Welcome to Opex Home Solutions
                </motion.h1>
                <motion.p variants={fadeInUp} className="main-hero-description">
                  A complete solution for planning and designing your dream home
                  with comprehensive tools and expert guidance.
                </motion.p>
                <motion.button
                  className="main-scroll-button"
                  onClick={scrollToOfferings}
                  variants={fadeInUp}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Explore Our Services <FontAwesomeIcon icon={faChevronDown} />
                </motion.button>
              </motion.div>
            </div>

            <div className="col-lg-5 main-estimator-col">
              <motion.div
                className="main-estimator-card"
                initial="hidden"
                animate="visible"
                variants={fadeInRight}
              >
                <div className="main-card-header">
                  <FontAwesomeIcon
                    icon={faCalculator}
                    className="main-card-icon"
                  />
                  <h2>Get a Quick Price Estimation</h2>
                </div>

                <form onSubmit={handleSubmit} className="main-estimation-form">
                  <div className="main-form-group">
                    <label htmlFor="house-design">
                      <FontAwesomeIcon icon={faLaptopHouse} /> House Design Type
                    </label>
                    <select
                      id="house-design"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={formData.name ? "filled" : ""}
                    >
                      <option value="">Select House Type</option>
                      {designOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="main-form-group">
                    <label htmlFor="area-size">
                      <FontAwesomeIcon icon={faRulerCombined} /> Area (in sqft)
                    </label>
                    <select
                      id="area-size"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className={formData.area ? "filled" : ""}
                    >
                      <option value="">Select Area Range</option>
                      {areaOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="main-form-group">
                    <label htmlFor="land-option">
                      <FontAwesomeIcon icon={faMapMarkerAlt} /> Land Location
                    </label>
                    <select
                      id="land-option"
                      name="landOptions"
                      value={formData.landOptions}
                      onChange={handleChange}
                      className={formData.landOptions ? "filled" : ""}
                    >
                      <option value="">Select Location Type</option>
                      {landOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <motion.button
                    type="submit"
                    className={`main-estimate-button ${
                      !formValid ? "disabled" : ""
                    }`}
                    disabled={isLoading || !formValid}
                    whileHover={formValid ? { scale: 1.02 } : {}}
                    whileTap={formValid ? { scale: 0.98 } : {}}
                  >
                    {isLoading ? (
                      <div className="button-loading">
                        <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                        <span>Calculating...</span>
                      </div>
                    ) : (
                      "Get Price Estimation"
                    )}
                  </motion.button>
                </form>

                <AnimatePresence>
                  {predictedPrice && !isLoading && (
                    <motion.div
                      className="main-estimation-result"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                    >
                      <div className="main-price-display">
                        <div className="main-price-amount">
                          <FontAwesomeIcon
                            icon={faInr}
                            className="price-icon"
                          />
                          <span className="amount">
                            {predictedPrice.toFixed(2)}
                          </span>
                          <span className="unit">lakhs</span>
                        </div>
                        <p className="main-price-label">Estimated Price</p>
                      </div>

                      <motion.button
                        className="main-explore-button"
                        onClick={() => viewRelatedDesigns(predictedPrice)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Explore Designs <FontAwesomeIcon icon={faArrowRight} />
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="main-offerings-section" ref={offeringSectionRef}>
        <div className="main-section-header">
          <h2>What We Offer</h2>
          <p>Comprehensive solutions for your home design journey</p>
        </div>

        <div className="main-offerings-container">
          {offeringData.map((offering, index) => (
            <motion.div
              key={offering.title}
              className={`main-offering-card ${
                activeSection === index + 1 ? "active" : ""
              }`}
              ref={(el) => (sectionRefs.current[index + 1] = el)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeIn}
            >
              <div className="main-offering-image-container">
                <img
                  src={offering.image}
                  alt={offering.title}
                  className="main-offering-image"
                />
                <div className="main-offering-image-overlay"></div>
              </div>

              <div className="main-offering-content">
                <motion.div
                  className="main-offering-icon"
                  style={{ backgroundColor: offering.color }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <FontAwesomeIcon icon={offering.icon} />
                </motion.div>

                <motion.h3
                  className="main-offering-title"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {offering.title}
                </motion.h3>

                <motion.p
                  className="main-offering-description"
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  {offering.description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <Link to={offering.link} className="main-offering-link">
                    Explore {offering.title}{" "}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="main-cta-section">
        <div className="container">
          <motion.div
            className="main-cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
          >
            <h2>Ready to Build Your Dream Home?</h2>
            <p>Get started with our comprehensive design solutions today</p>
            <Link to="/contact" className="main-cta-button">
              Contact Us Now
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Main;
