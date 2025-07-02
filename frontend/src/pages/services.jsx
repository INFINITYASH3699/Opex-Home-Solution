import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence, useInView } from "framer-motion";
import "../styles/services.css"; // New custom CSS file

// Import needed icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBuilding,
  faPaintRoller,
  faRuler,
  faArrowRight,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  // State for current active service card
  const [activeService, setActiveService] = useState(null);
  // Tracks if the "Why Choose Us" section is in view
  const whyChooseUsRef = useRef(null);
  const isInView = useInView(whyChooseUsRef, { once: true, amount: 0.3 });

  // Define services data
  const servicesData = [
    {
      id: 1,
      title: "Home Designs",
      description:
        "Discover diverse home designs tailored to various styles and budgets. Customize layouts and get detailed plans with cost estimates.",
      image:
        "https://media-assets0.s3.ap-south-1.amazonaws.com/ext_int_plan.png",
      icon: faHome,
      color: "#6366f1",
      path: "/",
      features: [
        "Custom floor plans",
        "3D visualizations",
        "Budget estimation",
        "Architectural drawings",
        "Material recommendations",
      ],
    },
    {
      id: 2,
      title: "Exterior Designs",
      description:
        "Comprehensive exterior home designs with detailed price, area specifications, and estimated construction costs for various styles.",
      image:
        "https://thearchitectsdiary.com/wp-content/uploads/2020/05/MEtal-Facade.jpg",
      icon: faBuilding,
      color: "#8b5cf6",
      path: "/architectPlan",
      features: [
        "Facade styling",
        "Landscape design",
        "Material selection",
        "Color schemes",
        "Outdoor lighting plans",
      ],
    },
    {
      id: 3,
      title: "Interior Designs",
      description:
        "Personalize your spaces with customizable furniture layouts and decor styles. Choose from modern, traditional, or minimalist themes.",
      image:
        "https://asset-ng.skoiy.com/9b80a6f781ff336f/yrwwqpnyb7ys.jpg?w=970&q=90&fm=webp",
      icon: faPaintRoller,
      color: "#ec4899",
      path: "/interior",
      features: [
        "Room layouts",
        "Furniture selection",
        "Color consultations",
        "Lighting design",
        "Decor accessories",
      ],
    },
    {
      id: 4,
      title: "Home Architecture",
      description:
        "Explore a range of architectural styles including modern, traditional, and eco-friendly designs with detailed insights.",
      image:
        "https://house-designs-data.s3.ap-south-1.amazonaws.com/Building_10003/plan/Building_10003_pln_1.jpg",
      icon: faRuler,
      color: "#f59e0b",
      path: "/architectplan",
      features: [
        "Structural planning",
        "Blueprint creation",
        "Technical specifications",
        "Regulatory compliance",
        "Construction supervision",
      ],
    },
  ];

  // Benefits/why choose us data
  const benefits = [
    {
      title: "Expert Designers",
      description:
        "Our team consists of award-winning architects and interior designers with decades of combined experience.",
    },
    {
      title: "Customized Solutions",
      description:
        "Every project is tailored to your specific needs, preferences, and budget constraints.",
    },
    {
      title: "Transparent Pricing",
      description:
        "No hidden costs. We provide detailed breakdowns of all expenses before any work begins.",
    },
    {
      title: "Timely Delivery",
      description:
        "We understand the importance of deadlines and ensure projects are completed on schedule.",
    },
    {
      title: "Quality Materials",
      description:
        "We only recommend and use high-quality, durable materials that stand the test of time.",
    },
    {
      title: "Ongoing Support",
      description:
        "Our relationship doesn't end after project completion. We provide continued support and consultation.",
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
    hover: {
      y: -10,
      boxShadow:
        "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  };

  const featureVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="services-hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Our Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Transform your vision into reality with our comprehensive design
            solutions
          </motion.p>
        </div>
      </section>

      {/* Services Cards Section */}
      <section className="services-grid-container">
        <motion.div
          className="services-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {servicesData.map((service) => (
            <motion.div
              key={service.id}
              className={`service-card ${
                activeService === service.id ? "active" : ""
              }`}
              variants={cardVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() =>
                setActiveService(
                  activeService === service.id ? null : service.id
                )
              }
            >
              <div className="service-card-content">
                <div
                  className="service-icon"
                  style={{ backgroundColor: service.color }}
                >
                  <FontAwesomeIcon icon={service.icon} />
                </div>

                <div className="service-info">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>

                  <AnimatePresence>
                    {activeService === service.id && (
                      <motion.div
                        className="service-features"
                        variants={featureVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                      >
                        <h4>What we offer:</h4>
                        <ul>
                          {service.features.map((feature, index) => (
                            <motion.li
                              key={index}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <FontAwesomeIcon
                                icon={faCheck}
                                className="feature-icon"
                              />
                              {feature}
                            </motion.li>
                          ))}
                        </ul>

                        <Link to={service.path} className="service-link">
                          <span>Explore {service.title}</span>
                          <FontAwesomeIcon icon={faArrowRight} />
                        </Link>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {activeService !== service.id && (
                    <button className="expand-button">Learn More</button>
                  )}
                </div>
              </div>

              <div className="service-image-container">
                <img
                  src={service.image}
                  alt={service.title}
                  className="service-image"
                />
                <div className="service-image-overlay"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Process Section */}
      <section className="process-section">
        <div className="section-header">
          <h2>Our Design Process</h2>
          <p>We follow a structured approach to bring your ideas to life</p>
        </div>

        <div className="process-timeline">
          {[
            {
              step: 1,
              title: "Consultation",
              description:
                "We begin with understanding your vision, requirements, and budget constraints.",
            },
            {
              step: 2,
              title: "Concept Development",
              description:
                "Our designers create initial concepts based on your inputs and preferences.",
            },
            {
              step: 3,
              title: "Design Refinement",
              description:
                "We refine designs based on your feedback until you're completely satisfied.",
            },
            {
              step: 4,
              title: "Detailed Planning",
              description:
                "We create detailed plans, specifications, and material selections.",
            },
            {
              step: 5,
              title: "Implementation",
              description:
                "We assist with implementation through recommended contractors or your own team.",
            },
          ].map((step, index) => (
            <motion.div
              key={step.step}
              className="process-step"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
            >
              <div className="step-number">{step.step}</div>
              <div className="step-content">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="why-choose-us" ref={whyChooseUsRef}>
        <div className="section-header">
          <h2>Why Choose Us</h2>
          <p>What sets us apart from the competition</p>
        </div>

        <div className="benefits-grid">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              className="benefit-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }
              }
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <motion.div
          className="cta-content"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Start Your Project?</h2>
          <p>Contact us today for a free consultation and quote</p>
          <Link to="/contact" className="cta-button">
            Get Started
          </Link>
        </motion.div>
      </section>
    </div>
  );
};

export default Services;
