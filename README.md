# 🏠 Opex Home Solutions

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)

<p align="center">
  <img src="frontend/src/assets/logo.png" alt="Opex Home Solutions Logo" width="200" />
</p>

Opex Home Solutions is a comprehensive web application that showcases house designs with advanced features including AI-powered price prediction, intelligent NLP search, and detailed property specifications. Our platform helps users explore and find their dream home designs with a sophisticated, user-friendly interface.

## ✨ Live Demo

Visit the live application: [Opex Home Solutions](https://opex-home-solutions.vercel.app)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [AI/ML Components](#-aiml-components)
- [Key Functionalities](#-key-functionalities)
- [Responsive Design](#-responsive-design)
- [Screenshots](#-screenshots)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

## 🚀 Features

- **Extensive Design Catalog**: Browse 1000+ house designs including apartments, bungalows, villas, and more
- **AI-Powered Price Prediction**: Get estimated prices based on area, design type, and land options
- **Natural Language Search**: Find properties using natural language queries
- **Advanced Filtering**: Filter designs by price range, area, type, and more
- **Responsive Interface**: Seamless experience across all devices
- **Dark/Light Mode**: Choose your preferred theme
- **Recommendation System**: View similar house designs based on your preferences
- **Detailed Property Pages**: Comprehensive information with floor plans, interiors, and specifications

## 🛠️ Tech Stack

### Frontend
- **React.js**: UI library for building the interface
- **React Router**: For navigation and routing
- **Framer Motion**: Animations and transitions
- **Axios**: API requests
- **FontAwesome**: Icons
- **CSS3**: Custom styling with responsive design

### Backend
- **Node.js**: Server environment
- **Express.js**: Web framework for API
- **MongoDB**: NoSQL database for storing house designs
- **Mongoose**: MongoDB object modeling
- **JWT**: Authentication and authorization
- **Helmet**: Enhanced API security

### AI/ML
- **Python**: Core language for ML models
- **scikit-learn**: Machine learning algorithms
- **Natural Language Toolkit (NLTK)**: NLP processing
- **joblib**: Model serialization

## 📂 Project Structure

```
opex-home-solutions/
├── frontend/                # React front-end
│   ├── public/              # Static assets
│   └── src/
│       ├── assets/          # Images and resources
│       ├── components/      # Reusable UI components
│       ├── pages/           # Page components
│       └── styles/          # CSS styles
├── backend/                 # Node.js API
│   ├── AI_ML/               # ML models and algorithms
│   ├── config/              # Database configuration
│   ├── controllers/         # API controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Mongoose models
│   └── routes/              # API routes
└── docs/                    # Documentation (optional)
```

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Python (v3.8 or higher) for ML models

### Clone the Repository
```bash
git clone https://github.com/INFINITYASH3699/Opex-Home-Solution.git
cd Opex-Home-Solution
```

### Frontend Setup
```bash
cd frontend
npm install
```

### Backend Setup
```bash
cd ../backend
npm install
```

### Python Dependencies
```bash
cd backend
pip install -r requirements.txt
```

## 🔐 Environment Variables

### Frontend (.env)
```
REACT_APP_API_BASE_URL=http://localhost:5000
REACT_APP_PUBLIC_API_BASE_URL=http://localhost:5000
REACT_APP_VERSION=1.0.0
REACT_APP_NAME=Opex Home Solutions
```

### Backend (.env)
```
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/opex_home_solutions
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Running the Application

### Start the Backend Server
```bash
cd backend
npm start
```

### Start the Frontend Development Server
```bash
cd frontend
npm start
```

Visit `http://localhost:3000` in your browser to see the application.

## 🧠 AI/ML Components

### Price Prediction
- **Algorithm**: Enhanced Polynomial Regression
- **Features**: Area, design type, land location, etc.
- **Accuracy**: 89% on test data
- **File**: `backend/AI_ML/price_prediction.py`

### NLP Search
- **Algorithm**: TF-IDF with cosine similarity
- **Features**: Natural language query processing
- **File**: `backend/AI_ML/nlp_search.py`

### Recommendation System
- **Algorithm**: Hybrid (Content-based + Collaborative filtering)
- **File**: `backend/AI_ML/python_models/hybrid_recommendation.py`

## 🔮 Key Functionalities

### Price Prediction
Users can input their requirements (design type, area, land location) and the AI model predicts an estimated price based on current market trends and historical data.

### Natural Language Search
The search functionality allows users to query properties using natural language phrases like "modern villa in suburban area with large garden" and get relevant results.

### Filtering System
Our comprehensive filtering system allows users to narrow down designs based on:
- Price range
- Area
- Design type
- Location type
- Features

## 📱 Responsive Design
- **Mobile-first** approach
- **Adaptive layouts** that work on all screen sizes
- **Touch-friendly** UI elements
- **Optimized performance** for all devices

## 📸 Screenshots

<details>
<summary>View Screenshots</summary>

### Home Page
![Home Page](https://example.com/screenshots/home.png)

### Property Listings
![Property Listings](https://example.com/screenshots/listings.png)

### Property Details
![Property Details](https://example.com/screenshots/details.png)

### Price Prediction
![Price Prediction](https://example.com/screenshots/prediction.png)

</details>

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or suggestions, feel free to reach out:

- **Developer**: Yash Hulle
- **Email**: yash.hulle3699@gmail.com
- **GitHub**: [@INFINITYASH3699](https://github.com/INFINITYASH3699/Opex-Home-Solution)

---

<p align="center">
  <sub>Built with ❤️ by INFINITYASH3699</sub>
</p>
