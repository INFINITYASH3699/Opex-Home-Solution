import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faPaperPlane,
  faCheck,
  faSpinner,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import {
  faFacebookF,
  faTwitter,
  faLinkedinIn,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/contact.css";

const Contact = () => {
  // Form state
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  // Submission states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success', 'error', null
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Focus handling
  const nameRef = useRef(null);
  const formRef = useRef(null);

  // Focus first field on mount
  useEffect(() => {
    if (nameRef.current) {
      nameRef.current.focus();
    }
  }, []);

  // Reset form after successful submission
  useEffect(() => {
    if (submitStatus === "success") {
      const timer = setTimeout(() => {
        setFormState({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setTouched({});
        setSubmitStatus(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [submitStatus]);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate on change if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Mark field as touched on blur
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    validateField(name, value);
  };

  // Field validation
  const validateField = (name, value) => {
    let fieldErrors = { ...errors };

    switch (name) {
      case "name":
        if (!value.trim()) {
          fieldErrors.name = "Name is required";
        } else if (value.trim().length < 2) {
          fieldErrors.name = "Name must be at least 2 characters";
        } else {
          delete fieldErrors.name;
        }
        break;

      case "email":
        if (!value.trim()) {
          fieldErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value)) {
          fieldErrors.email = "Email is invalid";
        } else {
          delete fieldErrors.email;
        }
        break;

      case "subject":
        if (!value.trim()) {
          fieldErrors.subject = "Subject is required";
        } else if (value.trim().length < 5) {
          fieldErrors.subject = "Subject must be at least 5 characters";
        } else {
          delete fieldErrors.subject;
        }
        break;

      case "message":
        if (!value.trim()) {
          fieldErrors.message = "Message is required";
        } else if (value.trim().length < 10) {
          fieldErrors.message = "Message must be at least 10 characters";
        } else {
          delete fieldErrors.message;
        }
        break;

      default:
        break;
    }

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  };

  // Form validation
  const validateForm = () => {
    const fieldNames = ["name", "email", "subject", "message"];
    let formIsValid = true;

    // Mark all fields as touched
    const newTouched = fieldNames.reduce((acc, field) => {
      acc[field] = true;
      return acc;
    }, {});
    setTouched(newTouched);

    // Validate all fields
    fieldNames.forEach((field) => {
      const isValid = validateField(field, formState[field]);
      if (!isValid) formIsValid = false;
    });

    return formIsValid;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate form
    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(
        `[name="${firstErrorField}"]`
      );
      if (errorElement) {
        errorElement.focus();
      }
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("access_key", "a433efb8-2030-459e-a196-13d70a2ea920");

      // Append form data
      Object.entries(formState).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus("success");
        // Smoothly scroll to the top of the form to see the success message
        if (formRef.current) {
          formRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      } else {
        setSubmitStatus("error");
        console.error("Form submission error:", result);
      }
    } catch (error) {
      setSubmitStatus("error");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact information
  const contactInfo = [
    {
      icon: faMapMarkerAlt,
      title: "Address",
      content: "123 Tech Park, Hinjewadi Phase 1, Pune, Maharashtra, India",
      color: "#4f46e5",
    },
    {
      icon: faPhone,
      title: "Phone",
      content: "+91 98765 43210",
      color: "#10b981",
    },
    {
      icon: faEnvelope,
      title: "Email",
      content: "contact@opexhomesolutions.com",
      color: "#ec4899",
    },
  ];

  // Social links
  const socialLinks = [
    { icon: faFacebookF, url: "#", color: "#1877f2" },
    { icon: faTwitter, url: "#", color: "#1da1f2" },
    { icon: faLinkedinIn, url: "#", color: "#0a66c2" },
    { icon: faInstagram, url: "#", color: "#e4405f" },
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="contact-hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1>Get In Touch</h1>
          <p>We'd love to hear from you. Let us know how we can help.</p>
        </motion.div>
      </section>

      {/* Main Contact Section */}
      <section className="contact-section">
        <div className="container">
          <div className="contact-wrapper">
            {/* Contact Information */}
            <motion.div
              className="contact-infos"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div className="info-header" variants={fadeIn}>
                <h2>Contact Information</h2>
                <p>Reach out to us through any of these channels</p>
              </motion.div>

              <div className="info-details">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={index}
                    className="info-item"
                    variants={fadeIn}
                  >
                    <div
                      className="info-icon"
                      style={{ backgroundColor: info.color }}
                    >
                      <FontAwesomeIcon icon={info.icon} />
                    </div>
                    <div className="info-content">
                      <h3>{info.title}</h3>
                      <p>{info.content}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.div className="social-links" variants={fadeIn}>
                <h3>Follow Us</h3>
                <div className="social-icons">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="social-icon"
                      style={{ backgroundColor: social.color }}
                      whileHover={{ y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FontAwesomeIcon icon={social.icon} />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              <motion.div className="business-hours" variants={fadeIn}>
                <h3>Business Hours</h3>
                <ul>
                  <li>
                    <span>Monday - Friday:</span> 9:00 AM - 6:00 PM
                  </li>
                  <li>
                    <span>Saturday:</span> 10:00 AM - 4:00 PM
                  </li>
                  <li>
                    <span>Sunday:</span> Closed
                  </li>
                </ul>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              className="contact-form-container"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="form-header">
                <h2>Send Us a Message</h2>
                <p>
                  Fill out the form below and we'll get back to you as soon as
                  possible
                </p>
              </div>

              {/* Success/Error Messages */}
              <AnimatePresence>
                {submitStatus === "success" && (
                  <motion.div
                    className="form-message success"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FontAwesomeIcon icon={faCheck} />
                    <p>Thank you! Your message has been sent successfully.</p>
                  </motion.div>
                )}

                {submitStatus === "error" && (
                  <motion.div
                    className="form-message error"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <FontAwesomeIcon icon={faExclamationTriangle} />
                    <p>Oops! Something went wrong. Please try again later.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="contact-form"
              >
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      ref={nameRef}
                      value={formState.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.name && touched.name ? "error" : ""}
                      placeholder="Your name"
                      disabled={isSubmitting}
                    />
                    {errors.name && touched.name && (
                      <div className="error-message">{errors.name}</div>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email Address <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={errors.email && touched.email ? "error" : ""}
                      placeholder="Your email address"
                      disabled={isSubmitting}
                    />
                    {errors.email && touched.email && (
                      <div className="error-message">{errors.email}</div>
                    )}
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">
                    Subject <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formState.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.subject && touched.subject ? "error" : ""}
                    placeholder="What is this regarding?"
                    disabled={isSubmitting}
                  />
                  {errors.subject && touched.subject && (
                    <div className="error-message">{errors.subject}</div>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formState.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={errors.message && touched.message ? "error" : ""}
                    placeholder="Your message here..."
                    rows="5"
                    disabled={isSubmitting}
                  ></textarea>
                  {errors.message && touched.message && (
                    <div className="error-message">{errors.message}</div>
                  )}
                </div>

                <motion.button
                  type="submit"
                  className="submit-button"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <FontAwesomeIcon icon={faSpinner} className="fa-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FontAwesomeIcon icon={faPaperPlane} />
                      <span>Send Message</span>
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="map-section">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60525.13617851544!2d73.69004897910158!3d18.59357900000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2b9e7aaaaaaab%3A0x6158588e3d6be452!2sHinjawadi%2C%20Pune%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1639732278708!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Our Location"
        ></iframe>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2>Frequently Asked Questions</h2>
            <p>Find quick answers to common questions</p>
          </div>

          <div className="faq-grid">
            {[
              {
                question: "How do I get started with Opex Home Solutions?",
                answer:
                  "Simply fill out the contact form above or give us a call. Our team will schedule a consultation to understand your requirements and guide you through the process.",
              },
              {
                question: "Do you provide customized home designs?",
                answer:
                  "Yes, we offer fully customizable home designs tailored to your specific preferences, requirements, and budget constraints.",
              },
              {
                question: "How accurate are your price estimations?",
                answer:
                  "Our AI-powered price estimations are highly accurate with a 95% success rate, considering factors like location, materials, design complexity, and market trends.",
              },
              {
                question: "Can I see samples of your previous work?",
                answer:
                  "Absolutely! You can explore our portfolio section on the website or request specific examples during your consultation.",
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                className="faq-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
