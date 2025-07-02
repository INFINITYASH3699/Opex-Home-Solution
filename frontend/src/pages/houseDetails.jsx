import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faRulerCombined,
  faDollarSign,
  faTools,
  faMapMarkedAlt,
  faPhone,
  faUser,
  faChevronLeft,
  faChevronRight,
  faExclamationTriangle,
  faSpinner,
  faImage,
  faHardHat,
  faCouch,
  faStar,
  faInfoCircle,
  faShareAlt,
  faDownload,
  faExpand,
  faRuler,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/houseDetails.css";

const HouseDetails = () => {
  const { index } = useParams();
  const [house, setHouse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [currentImageType, setCurrentImageType] = useState("exterior");
  const [imageModal, setImageModal] = useState(false);
  const [modalImage, setModalImage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const imageContainerRef = useRef(null);
  const thumbnailsRef = useRef(null);

  const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  // Fetch house details
  useEffect(() => {
    const fetchHouseDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/houses/${index}`);

        const houseData = response.data;

        // Add architecture property if it doesn't exist
        if (!houseData.images.architecture) {
          // For demo purposes, let's include some architecture images
          // In production, you should fetch these from your API
          houseData.images.architecture = [
            "https://house-designs-data.s3.ap-south-1.amazonaws.com/Building_10003/plan/Building_10003_pln_1.jpg",
            "https://house-designs-data.s3.ap-south-1.amazonaws.com/Building_10003/plan/Building_10003_pln_2.jpg",
          ];
        }

        setHouse(houseData);

        // Set initial main image
        if (houseData.images && houseData.images.exterior?.length > 0) {
          setMainImage(houseData.images.exterior[0]);
        }

        // Check if house is in favorites
        const savedFavorites = localStorage.getItem("homeFavorites");
        if (savedFavorites) {
          const favorites = JSON.parse(savedFavorites);
          setIsFavorite(favorites.includes(houseData._id));
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching house details:", err);
        setError("Failed to fetch house details. Please try again later.");
        setLoading(false);
      }
    };

    fetchHouseDetails();
  }, [index]);

  // Scroll thumbnails horizontally with buttons
  const scrollThumbnails = (direction) => {
    if (thumbnailsRef.current) {
      const scrollAmount = direction === "left" ? -200 : 200;
      thumbnailsRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Toggle image type (exterior, interior, architecture)
  const toggleImageType = (type) => {
    setCurrentImageType(type);

    if (house?.images && house.images[type]?.length > 0) {
      setMainImage(house.images[type][0]);
    }
  };

  // Open image modal
  const openImageModal = (image) => {
    setModalImage(image);
    setImageModal(true);
    document.body.style.overflow = "hidden";
  };

  // Close image modal
  const closeImageModal = () => {
    setImageModal(false);
    document.body.style.overflow = "auto";
  };

  // Toggle favorite status
  const toggleFavorite = () => {
    if (!house) return;

    const savedFavorites = localStorage.getItem("homeFavorites");
    let favorites = savedFavorites ? JSON.parse(savedFavorites) : [];

    if (isFavorite) {
      favorites = favorites.filter((id) => id !== house._id);
    } else {
      favorites.push(house._id);
    }

    localStorage.setItem("homeFavorites", JSON.stringify(favorites));
    setIsFavorite(!isFavorite);
  };

  // Share functionality
  const shareHouse = () => {
    if (navigator.share) {
      navigator
        .share({
          title: house?.name,
          text: `Check out this ${house?.name} design on Opex Home Solutions!`,
          url: window.location.href,
        })
        .catch(console.error);
    } else {
      // Fallback for browsers that don't support navigator.share
      const url = window.location.href;
      navigator.clipboard
        .writeText(url)
        .then(() => {
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(console.error);
    }
  };

  // Format price with commas for thousands
  const formatPrice = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  // Loading state
  if (loading) {
    return (
      <div className="house-details-loading">
        <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
        <p>Loading house details...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="house-details-error">
        <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
        <h2>Oops! Something went wrong</h2>
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="retry-button"
        >
          Try Again
        </button>
      </div>
    );
  }

  // House not found state
  if (!house) {
    return (
      <div className="house-details-error">
        <FontAwesomeIcon icon={faExclamationTriangle} className="error-icon" />
        <h2>House Not Found</h2>
        <p>The house you're looking for doesn't exist or has been removed.</p>
        <Link to="/home" className="back-home-button">
          Back to Home Designs
        </Link>
      </div>
    );
  }

  return (
    <div className="house-details-page">
      {/* Navigation breadcrumb */}
      <div className="breadcrumb-nav">
        <div className="container">
          <Link to="/home" className="breadcrumb-link">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{house.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="house-details-container">
          {/* Image Gallery Column */}
          <div className="gallery-column">
            <div className="gallery-container" ref={imageContainerRef}>
              {/* Image Type Selector */}
              <div className="image-type-selector">
                <button
                  className={`type-button ${
                    currentImageType === "exterior" ? "active" : ""
                  }`}
                  onClick={() => toggleImageType("exterior")}
                  disabled={!house.images?.exterior?.length}
                >
                  <FontAwesomeIcon icon={faHome} />
                  <span>Exterior</span>
                </button>
                <button
                  className={`type-button ${
                    currentImageType === "interior" ? "active" : ""
                  }`}
                  onClick={() => toggleImageType("interior")}
                  disabled={!house.images?.interior?.length}
                >
                  <FontAwesomeIcon icon={faCouch} />
                  <span>Interior</span>
                </button>
                <button
                  className={`type-button ${
                    currentImageType === "architecture" ? "active" : ""
                  }`}
                  onClick={() => toggleImageType("architecture")}
                  disabled={!house.images?.architecture?.length}
                >
                  <FontAwesomeIcon icon={faRuler} />
                  <span>Architecture</span>
                </button>
              </div>

              {/* Main Image */}
              <div className="main-image-container">
                <img
                  src={mainImage}
                  alt={`${house.name} - ${currentImageType}`}
                  className="main-image"
                  onClick={() => openImageModal(mainImage)}
                />
                <div className="image-actions">
                  <button
                    className="action-button"
                    title="View full size"
                    onClick={() => openImageModal(mainImage)}
                  >
                    <FontAwesomeIcon icon={faExpand} />
                  </button>
                  <button
                    className={`action-button ${isFavorite ? "favorited" : ""}`}
                    title={
                      isFavorite ? "Remove from favorites" : "Add to favorites"
                    }
                    onClick={toggleFavorite}
                  >
                    <FontAwesomeIcon icon={faStar} />
                  </button>
                  <button
                    className="action-button"
                    title="Share this design"
                    onClick={shareHouse}
                  >
                    <FontAwesomeIcon icon={faShareAlt} />
                  </button>
                </div>
                {copied && (
                  <div className="copied-alert">Link copied to clipboard!</div>
                )}
              </div>

              {/* Thumbnails */}
              <div className="thumbnails-nav">
                <button
                  className="nav-button nav-prev"
                  onClick={() => scrollThumbnails("left")}
                >
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
                <div className="thumbnails-container" ref={thumbnailsRef}>
                  {house.images &&
                    house.images[currentImageType]?.map((image, idx) => (
                      <div
                        key={idx}
                        className={`thumbnail ${
                          mainImage === image ? "active" : ""
                        }`}
                        onClick={() => setMainImage(image)}
                      >
                        <img src={image} alt={`Thumbnail ${idx + 1}`} />
                      </div>
                    ))}
                  {(!house.images ||
                    !house.images[currentImageType]?.length) && (
                    <div className="no-images">
                      <FontAwesomeIcon icon={faImage} />
                      <p>No {currentImageType} images available</p>
                    </div>
                  )}
                </div>
                <button
                  className="nav-button nav-next"
                  onClick={() => scrollThumbnails("right")}
                >
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="details-column">
            <div className="details-container">
              <div className="house-header">
                <h1 className="house-title">{house.name}</h1>
                <div className="house-highlights">
                  <div className="highlight">
                    <FontAwesomeIcon
                      icon={faDollarSign}
                      className="highlight-icon price"
                    />
                    <span className="highlight-text">
                      ₹{formatPrice(house.price)} lakhs
                    </span>
                  </div>
                  <div className="highlight">
                    <FontAwesomeIcon
                      icon={faRulerCombined}
                      className="highlight-icon area"
                    />
                    <span className="highlight-text">
                      {formatPrice(house.area)} sq ft
                    </span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="details-section">
                <div className="section-header">
                  <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="section-icon"
                  />
                  <h2>Description</h2>
                </div>
                <p className="description-text">{house.desp}</p>
              </div>

              {/* Specifications */}
              <div className="details-section">
                <div className="section-header">
                  <FontAwesomeIcon icon={faTools} className="section-icon" />
                  <h2>Specifications</h2>
                </div>

                <div className="specification-list">
                  <div className="specification">
                    <div className="spec-label">
                      <FontAwesomeIcon icon={faTools} />
                      <span>Materials Required</span>
                    </div>
                    <div className="spec-value">{house.material}</div>
                  </div>

                  <div className="specification">
                    <div className="spec-label">
                      <FontAwesomeIcon icon={faMapMarkedAlt} />
                      <span>Land Options</span>
                    </div>
                    <div className="spec-value">{house.landOptions}</div>
                  </div>
                </div>
              </div>

              {/* Contractor Information */}
              <div className="details-section">
                <div className="section-header">
                  <FontAwesomeIcon icon={faUser} className="section-icon" />
                  <h2>Contractor / Architect</h2>
                </div>

                <div className="contractor-card">
                  <div className="contractor-info">
                    <div className="contractor-name">
                      <FontAwesomeIcon
                        icon={faUser}
                        className="contractor-icon"
                      />
                      <h3>{house.contractor.name}</h3>
                    </div>
                    <div className="contractor-contact">
                      <FontAwesomeIcon
                        icon={faPhone}
                        className="contractor-icon"
                      />
                      <a href={`tel:${house.contractor.contact}`}>
                        {house.contractor.contact}
                      </a>
                    </div>
                  </div>
                  <button className="contractor-cta">Contact</button>
                </div>
              </div>

              {/* Download brochure */}
              <div className="download-section">
                <button className="download-button">
                  <FontAwesomeIcon icon={faDownload} />
                  <span>Download Brochure</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Image Modal */}
      <AnimatePresence>
        {imageModal && (
          <motion.div
            className="image-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageModal}
          >
            <motion.div
              className="modal-content"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button className="modal-close" onClick={closeImageModal}>
                &times;
              </button>
              <img src={modalImage} alt="Full size view" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HouseDetails;
