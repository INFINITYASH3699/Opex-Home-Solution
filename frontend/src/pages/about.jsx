import React, { useEffect, useRef } from "react";
import { motion, useInView, useAnimation } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLightbulb,
  faHome,
  faUsers,
  faHandshake,
  faAward,
  faCogs,
  faChevronDown
} from "@fortawesome/free-solid-svg-icons";
import "../styles/about.css"; // New dedicated CSS file

const About = () => {
  // References for scroll animations
  const missionRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  
  // Check if sections are in view
  const missionInView = useInView(missionRef, { once: true, amount: 0.3 });
  const storyInView = useInView(storyRef, { once: true, amount: 0.3 });
  const teamInView = useInView(teamRef, { once: true, amount: 0.3 });
  const valuesInView = useInView(valuesRef, { once: true, amount: 0.3 });
  
  // Animation controls
  const missionControls = useAnimation();
  const storyControls = useAnimation();
  const teamControls = useAnimation();
  const valuesControls = useAnimation();
  
  // Team member data
  const teamMembers = [
    {
      name: "Sahil Patil",
      role: "Founder & Lead Developer",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      description: "Computer Engineering student with expertise in AI and web development."
    },
    {
      name: "Priya Shah",
      role: "Design Lead",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      description: "Passionate about creating intuitive user experiences and beautiful interfaces."
    },
    {
      name: "Raj Patel",
      role: "Backend Developer",
      image: "https://randomuser.me/api/portraits/men/68.jpg",
      description: "Specializes in building robust backend systems and API integrations."
    },
    {
      name: "Prof. Girish Awadhwal",
      role: "Academic Mentor",
      image: "https://randomuser.me/api/portraits/men/46.jpg",
      description: "Guides the team with industry expertise and academic knowledge."
    }
  ];
  
  // Core values data
  const coreValues = [
    {
      icon: faLightbulb,
      title: "Innovation",
      description: "We constantly push boundaries to create cutting-edge solutions for home design."
    },
    {
      icon: faUsers,
      title: "Customer Focus",
      description: "Our clients' needs and satisfaction are at the center of everything we do."
    },
    {
      icon: faHandshake,
      title: "Integrity",
      description: "We operate with honesty, transparency, and ethical business practices."
    },
    {
      icon: faAward,
      title: "Excellence",
      description: "We strive for the highest quality in all aspects of our platform and service."
    }
  ];
  
  // Trigger animations when sections come into view
  useEffect(() => {
    if (missionInView) {
      missionControls.start("visible");
    }
    if (storyInView) {
      storyControls.start("visible");
    }
    if (teamInView) {
      teamControls.start("visible");
    }
    if (valuesInView) {
      valuesControls.start("visible");
    }
  }, [missionInView, storyInView, teamInView, valuesInView, missionControls, storyControls, teamControls, valuesControls]);
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.6, 0.05, 0.01, 0.9]
      }
    }
  };
  
  // Smooth scroll to section
  const scrollToSection = (elementRef) => {
    window.scrollTo({
      top: elementRef.current.offsetTop - 100,
      behavior: "smooth"
    });
  };

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="hero-content">
          <motion.h1
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            About Smart Home Solutions
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="hero-description"
          >
            Revolutionizing the home design and construction process
            with AI-powered solutions
          </motion.p>
          
          <motion.div
            className="scroll-indicator"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            onClick={() => scrollToSection(missionRef)}
          >
            <span>Discover Our Story</span>
            <FontAwesomeIcon icon={faChevronDown} className="bounce" />
          </motion.div>
        </div>
      </section>
      
      {/* About Section */}
      <section className="about-section">
        <div className="container">
          <div className="section-header">
            <h2>Who We Are</h2>
            <p>Reimagining home design with technology</p>
          </div>
          
          <div className="content-row">
            <motion.div 
              className="image-container"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="https://5.imimg.com/data5/VM/IS/IT/SELLER-90488659/bungalow-architecture-design-500x500-500x500.jpg"
                alt="Modern bungalow design"
                className="about-image"
              />
              <div className="image-overlay"></div>
            </motion.div>
            
            <motion.div 
              className="content-text"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.8 }}
            >
              <h3>Transforming Home Design</h3>
              <p>
                The "Smart Home Solutions" project aims to revolutionize the
                home design and construction process by providing a
                comprehensive, user-friendly platform that integrates design,
                customization, and execution. In today's rapidly evolving world,
                homeowners and prospective buyers are seeking more efficient and
                transparent ways to build and customize their dream homes.
              </p>
              <p>
                This project addresses these needs by offering a robust solution
                that showcases a wide range of home designs, complete with
                detailed information on interiors, pricing, materials, and
                professional contacts.
              </p>
              
              <ul className="feature-list">
                <li>
                  <FontAwesomeIcon icon={faHome} className="feature-icon" />
                  <span>Comprehensive home design catalog</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faCogs} className="feature-icon" />
                  <span>AI-powered customization options</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faHandshake} className="feature-icon" />
                  <span>Seamless contractor connections</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section className="mission-section" ref={missionRef}>
        <div className="container">
          <motion.div 
            className="content-row reverse"
            variants={containerVariants}
            initial="hidden"
            animate={missionControls}
          >
            <motion.div 
              className="content-text"
              variants={itemVariants}
            >
              <div className="section-heading">
                <span className="sub-heading">Our Purpose</span>
                <h2>Our Mission</h2>
              </div>
              
              <p>
                Our mission is to revolutionize the home design and construction
                industry through innovative AI-driven solutions. We strive to
                empower homeowners by providing them with a comprehensive
                platform that seamlessly integrates personalized home design,
                accurate price predictions, and reliable contractor connections.
              </p>
              <p>
                Our goal is to simplify the process of creating dream homes,
                making it accessible, efficient, and enjoyable for everyone.
                Through cutting-edge technology and a customer-centric approach,
                we aim to set new standards in the industry, delivering
                exceptional value and satisfaction to our clients.
              </p>
              
              <div className="mission-highlights">
                <div className="highlight-item">
                  <div className="highlight-number">100+</div>
                  <div className="highlight-text">Home Designs</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-number">95%</div>
                  <div className="highlight-text">Accuracy Rate</div>
                </div>
                <div className="highlight-item">
                  <div className="highlight-number">50+</div>
                  <div className="highlight-text">Contractor Partners</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="image-container"
              variants={itemVariants}
            >
              <img
                src="https://img.freepik.com/free-photo/3d-house-model-with-modern-architecture_23-2151004032.jpg?size=626&ext=jpg&ga=GA1.1.2008272138.1721088000&semt=ais_user"
                alt="3D house model with modern architecture"
                className="about-image"
              />
              <div className="image-overlay gradient-overlay"></div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Our Story Section */}
      <section className="story-section" ref={storyRef}>
        <div className="container">
          <motion.div 
            className="content-row"
            variants={containerVariants}
            initial="hidden"
            animate={storyControls}
          >
            <motion.div 
              className="image-container"
              variants={itemVariants}
            >
              <img
                src="https://img.freepik.com/premium-photo/business-people-having-meeting-office_236854-36082.jpg"
                alt="Team having a meeting"
                className="about-image"
              />
              <div className="image-overlay"></div>
            </motion.div>
            
            <motion.div 
              className="content-text"
              variants={itemVariants}
            >
              <div className="section-heading">
                <span className="sub-heading">Our Journey</span>
                <h2>Our Story</h2>
              </div>
              
              <p>
                We are final-year students at GH Raisoni University, pursuing
                Computer Engineering. Our journey began with a vision to
                transform the home design and construction industry using AI.
                Noticing a gap for comprehensive solutions, we developed "Smart
                Home Solution" with guidance from Prof. Girish Awadhwal.
              </p>
              <p>
                As our project progressed, its potential to simplify home
                building and renovation became clear. This motivated us to
                transform our project into a startup, providing a real solution.
                We are excited to help homeowners create their dream spaces and
                are dedicated to expanding our platform to make a significant
                industry impact.
              </p>
              
              <div className="timeline">
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>2022</h4>
                    <p>Concept development and initial research</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>2023</h4>
                    <p>Prototype development and testing</p>
                  </div>
                </div>
                <div className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content">
                    <h4>2024</h4>
                    <p>Official launch and expansion</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Core Values Section */}
      <section className="values-section" ref={valuesRef}>
        <div className="container">
          <div className="section-header light">
            <span className="sub-heading">What We Stand For</span>
            <h2>Our Core Values</h2>
            <p>The principles that guide our mission and decisions</p>
          </div>
          
          <motion.div 
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            animate={valuesControls}
          >
            {coreValues.map((value, index) => (
              <motion.div 
                key={index} 
                className="value-card"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="value-icon">
                  <FontAwesomeIcon icon={value.icon} />
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Team Section */}
      <section className="team-section" ref={teamRef}>
        <div className="container">
          <div className="section-header">
            <span className="sub-heading">The People Behind Our Success</span>
            <h2>Meet Our Team</h2>
            <p>Passionate individuals working together to transform the home design industry</p>
          </div>
          
          <motion.div 
            className="team-grid"
            variants={containerVariants}
            initial="hidden"
            animate={teamControls}
          >
            {teamMembers.map((member, index) => (
              <motion.div 
                key={index}
                className="team-card"
                variants={itemVariants}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
              >
                <div className="member-image-container">
                  <img src={member.image} alt={member.name} className="member-image" />
                  <div className="member-overlay"></div>
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <span className="member-role">{member.role}</span>
                  <p>{member.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2>Join Us in Revolutionizing Home Design</h2>
            <p>Ready to transform your vision into reality? Explore our platform and discover the possibilities.</p>
            <div className="cta-buttons">
              <a href="/contact" className="cta-button primary">Contact Us</a>
              <a href="/services" className="cta-button secondary">Our Services</a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;