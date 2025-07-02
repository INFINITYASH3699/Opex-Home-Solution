import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faHome,
  faBuilding,
  faWarehouse,
  faStore,
  faHotel,
  faDollarSign,
  faRulerCombined,
  faSpinner,
  faTimes,
  faFilter,
  faChevronDown,
  faExclamationTriangle,
  faTag,
  faHeart,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/home.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

const Home = () => {
  // State variables
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [design, setDesign] = useState("");
  const [price, setPrice] = useState("");
  const [area, setArea] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMoreCount, setViewMoreCount] = useState({});
  const [showCategory, setShowCategory] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mobileFiltersVisible, setMobileFiltersVisible] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // References
  const resultsRef = useRef(null);

  // Design categories with icons
  const categories = [
    { id: "Bungalow", icon: faHome, label: "Bungalow" },
    { id: "Villa", icon: faHome, label: "Villa" },
    { id: "Building", icon: faBuilding, label: "Building" },
    { id: "Office", icon: faBuilding, label: "Office" },
    { id: "Complex", icon: faBuilding, label: "Complex" },
    { id: "Cape Cod", icon: faHome, label: "Cape Cod" },
    { id: "Penthouse", icon: faHome, label: "Penthouse" },
    { id: "Farmhouses", icon: faWarehouse, label: "Farmhouses" },
    { id: "Colonial", icon: faHome, label: "Colonial" },
    { id: "Cottage", icon: faHome, label: "Cottage" },
    { id: "Studio", icon: faHome, label: "Studio" },
    { id: "Bookstore", icon: faStore, label: "Bookstore" },
    { id: "Store", icon: faStore, label: "Store" },
    { id: "Shop", icon: faStore, label: "Shop" },
    { id: "Cafe", icon: faStore, label: "Cafe" },
    { id: "Bakery", icon: faStore, label: "Bakery" },
    { id: "Hotel", icon: faHotel, label: "Hotel" },
    { id: "Apartment", icon: faBuilding, label: "Apartment" },
    { id: "Bank", icon: faBuilding, label: "Bank" },
    { id: "Office_building", icon: faBuilding, label: "Office Building" },
    {
      id: "Commercial_building",
      icon: faBuilding,
      label: "Commercial Building",
    },
    { id: "Headquarters", icon: faBuilding, label: "Headquarters" },
    { id: "Factory", icon: faWarehouse, label: "Factory" },
    { id: "Industry", icon: faWarehouse, label: "Industry" },
  ];

  // Fetch all houses on component mount
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem("homeFavorites");
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }

    const fetchHouses = async () => {
      try {
        setInitialLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/api/houses`);

        if (!response.ok) {
          throw new Error(`Failed to fetch houses (${response.status})`);
        }

        const data = await response.json();

        if (Array.isArray(data)) {
          setHouses(data);
          setFilteredHouses(data);
        } else {
          throw new Error("API returned unexpected data format");
        }
      } catch (error) {
        console.error("Error fetching houses:", error);
        setError(error.message);
      } finally {
        setInitialLoading(false);
      }
    };

    fetchHouses();
  }, []);

  // Save favorites to localStorage when they change
  useEffect(() => {
    localStorage.setItem("homeFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = (e, houseId) => {
    e.preventDefault();
    e.stopPropagation();

    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(houseId)) {
        return prevFavorites.filter((id) => id !== houseId);
      } else {
        return [...prevFavorites, houseId];
      }
    });
  };

  // Filter houses based on selected criteria
  const filterHouses = () => {
    setIsLoading(true);

    setTimeout(() => {
      try {
        const filtered = houses.filter((house) => {
          const housePrice = house.price || 0;
          const houseArea = house.area || 0;

          // Parse price range
          const [minPrice, maxPrice] = price
            ? price.split("-").map((p) => {
                return parseInt(p.replace(/[^0-9]/g, ""));
              })
            : [0, Infinity];

          // Parse area range
          const [minArea, maxArea] = area
            ? area.split("-").map((a) => {
                return parseInt(a.replace(/[^0-9]/g, ""));
              })
            : [0, Infinity];

          return (
            (!design || house.name === design) &&
            (!price || (housePrice >= minPrice && housePrice <= maxPrice)) &&
            (!area || (houseArea >= minArea && houseArea <= maxArea))
          );
        });

        setFilteredHouses(filtered);
        setShowCategory(design || null);

        // Scroll to results
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      } catch (error) {
        console.error("Error filtering houses:", error);
        setError("Failed to filter houses. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }, 600); // Small delay for better UX
  };

  // Handle NLP search
  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setFilteredHouses([]);
    setShowCategory(null);
    setError(null);

    fetch(`${API_BASE_URL}/search`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: searchQuery }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Search request failed (${response.status})`);
        }
        return response.json();
      })
      .then((data) => {
        setFilteredHouses(data);
        setShowCategory(data.length > 0 ? data[0].name : null);

        // Scroll to results
        if (resultsRef.current) {
          resultsRef.current.scrollIntoView({ behavior: "smooth" });
        }
      })
      .catch((error) => {
        console.error("Search error:", error);
        setError("Failed to perform search. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Handle 'View More' button functionality
  const handleViewMore = (category) => {
    setViewMoreCount((prev) => ({
      ...prev,
      [category]: (prev[category] || 6) + 6,
    }));
  };

  // Reset all filters
  const resetFilters = () => {
    setDesign("");
    setPrice("");
    setArea("");
    setSearchQuery("");
    setFilteredHouses(houses);
    setShowCategory(null);
  };

  // House card component
  const HouseCard = ({ house }) => {
    const isFavorite = favorites.includes(house._id);

    return (
      <motion.div
        className="property-card"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -10 }}
      >
        <Link
          to={`/houseDetails/${house._id}`}
          className="property-link"
          target="_blank"
        >
          <div className="property-image-container">
            <img
              src={
                house.images?.exterior?.[0] || "/images/placeholder-house.jpg"
              }
              alt={house.name}
              className="property-image"
              loading="lazy"
            />

            <button
              className={`favorite-btn ${isFavorite ? "active" : ""}`}
              onClick={(e) => toggleFavorite(e, house._id)}
              aria-label={
                isFavorite ? "Remove from favorites" : "Add to favorites"
              }
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>

            {house.price && (
              <div className="property-price">
                <FontAwesomeIcon icon={faDollarSign} />
                <span>{house.price} Lakhs</span>
              </div>
            )}

            {house.area && (
              <div className="property-area">
                <FontAwesomeIcon icon={faRulerCombined} />
                <span>{house.area} sq.ft</span>
              </div>
            )}
          </div>

          <div className="property-content">
            <h3 className="property-title">{house.name}</h3>

            <p className="property-description">
              {house.desp?.length > 100
                ? house.desp.substring(0, 100) + "..."
                : house.desp}
            </p>

            <div className="property-action">
              <span className="view-details">
                <FontAwesomeIcon icon={faEye} />
                View Details
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  };

  // Skeleton loader for house cards
  const HouseCardSkeleton = () => (
    <div className="property-card skeleton">
      <div className="property-image-container skeleton-image"></div>
      <div className="property-content">
        <div className="skeleton-title"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-text"></div>
        <div className="skeleton-action"></div>
      </div>
    </div>
  );

  // Render house cards by category
  const renderHousesByCategory = (category) => {
    // Only display the category if it matches the current search
    if (showCategory && category !== showCategory) return null;

    const filteredByCategory = filteredHouses.filter(
      (house) => house.name === category
    );

    if (filteredByCategory.length === 0) return null;

    const visibleHouses = filteredByCategory.slice(
      0,
      viewMoreCount[category] || 6
    );

    // Find category info
    const categoryInfo = categories.find((cat) => cat.id === category) || {
      icon: faHome,
      label: category,
    };

    return (
      <motion.div
        key={category}
        className="category-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="category-header">
          <div className="category-title">
            <FontAwesomeIcon
              icon={categoryInfo.icon}
              className="category-icon"
            />
            <h2>{categoryInfo.label}</h2>
          </div>
          <div className="category-stats">
            <span>{filteredByCategory.length} properties</span>
          </div>
        </div>

        <div className="properties-grid">
          {visibleHouses.map((house) => (
            <HouseCard key={house._id} house={house} />
          ))}
        </div>

        {filteredByCategory.length > visibleHouses.length && (
          <div className="view-more-container">
            <motion.button
              className="view-more-btn"
              onClick={() => handleViewMore(category)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View More</span>
              <FontAwesomeIcon icon={faChevronDown} />
            </motion.button>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <motion.div
            className="hero-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1>Find Your Dream Home</h1>
            <p>
              Explore our collection of beautiful house designs tailored to your
              needs
            </p>
          </motion.div>

          <motion.div
            className="search-container"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`search-bar ${isSearchFocused ? "focused" : ""}`}>
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
              <input
                type="text"
                placeholder="Find me a Villa in 50 lakhs for around 1800 sqft..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
              {searchQuery && (
                <button
                  className="clear-search"
                  onClick={() => setSearchQuery("")}
                >
                  <FontAwesomeIcon icon={faTimes} />
                </button>
              )}
              <motion.button
                className="search-btn"
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isLoading}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isLoading ? (
                  <FontAwesomeIcon icon={faSpinner} spin />
                ) : (
                  <FontAwesomeIcon icon={faSearch} />
                )}
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="filters-section">
        <div className="filters-container">
          <div className="filters-header">
            <h2>Refine Your Search</h2>
            <button
              className="mobile-filter-toggle"
              onClick={() => setMobileFiltersVisible(!mobileFiltersVisible)}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>Filters</span>
            </button>
          </div>

          <div
            className={`filters-content ${
              mobileFiltersVisible ? "mobile-visible" : ""
            }`}
          >
            <div className="filter-group">
              <label htmlFor="design-filter">Design Type</label>
              <div className="custom-select">
                <select
                  id="design-filter"
                  value={design}
                  onChange={(e) => setDesign(e.target.value)}
                >
                  <option value="">All Designs</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="select-arrow"
                />
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="price-filter">Price Range</label>
              <div className="custom-select">
                <select
                  id="price-filter"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                >
                  <option value="">Any Price</option>
                  <option value="10-20">10-20 lakhs</option>
                  <option value="20-30">20-30 lakhs</option>
                  <option value="30-40">30-40 lakhs</option>
                  <option value="40-50">40-50 lakhs</option>
                  <option value="50-70">50-70 lakhs</option>
                  <option value="70-100">70-100 lakhs</option>
                  <option value="100-500">Above 1 Cr</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="select-arrow"
                />
              </div>
            </div>

            <div className="filter-group">
              <label htmlFor="area-filter">Area Range</label>
              <div className="custom-select">
                <select
                  id="area-filter"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                >
                  <option value="">Any Size</option>
                  <option value="500-1000">500-1000 sq/ft</option>
                  <option value="1000-1500">1000-1500 sq/ft</option>
                  <option value="1500-2000">1500-2000 sq/ft</option>
                  <option value="2000-2500">2000-2500 sq/ft</option>
                  <option value="2500-3000">2500-3000 sq/ft</option>
                  <option value="3000-4000">3000-4000 sq/ft</option>
                  <option value="4000-5000">4000-5000 sq/ft</option>
                </select>
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="select-arrow"
                />
              </div>
            </div>

            <div className="filter-actions">
              <motion.button
                className="filter-btn primary"
                onClick={() => {
                  filterHouses();
                  setMobileFiltersVisible(false);
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Apply Filters
              </motion.button>

              <button
                className="filter-btn secondary"
                onClick={() => {
                  resetFilters();
                  setMobileFiltersVisible(false);
                }}
              >
                Reset
              </button>
            </div>

            {/* Close button for mobile filters */}
            <button
              className="close-mobile-filters"
              onClick={() => setMobileFiltersVisible(false)}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="results-section" ref={resultsRef}>
        {initialLoading ? (
          // Initial loading state
          <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
            <p>Loading properties...</p>
            <div className="skeleton-grid">
              {[...Array(6)].map((_, index) => (
                <HouseCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : error ? (
          // Error state
          <div className="error-container">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="error-icon"
            />
            <h2>Oops! Something went wrong</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="reload-btn"
            >
              Try Again
            </button>
          </div>
        ) : isLoading ? (
          // Loading state during search/filter
          <div className="loading-container">
            <FontAwesomeIcon icon={faSpinner} spin className="loading-icon" />
            <p>Finding your perfect match...</p>
            <div className="skeleton-grid">
              {[...Array(3)].map((_, index) => (
                <HouseCardSkeleton key={index} />
              ))}
            </div>
          </div>
        ) : filteredHouses.length === 0 ? (
          // No results state
          <div className="no-results">
            <FontAwesomeIcon
              icon={faExclamationTriangle}
              className="no-results-icon"
            />
            <h2>No properties found</h2>
            <p>Try adjusting your search criteria or filters</p>
            <motion.button
              className="reset-btn"
              onClick={resetFilters}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Reset All Filters
            </motion.button>
          </div>
        ) : (
          // Results display
          <div className="results-container">
            <div className="results-header">
              <h2>
                {showCategory ? `${showCategory} Properties` : "All Properties"}
              </h2>
              <span className="results-count">
                {filteredHouses.length} results found
              </span>
            </div>

            <AnimatePresence>
              {categories.map((category) => (
                <React.Fragment key={category.id}>
                  {renderHousesByCategory(category.id)}
                </React.Fragment>
              ))}
            </AnimatePresence>
          </div>
        )}
      </section>
    </div>
  );
};

export default Home;
