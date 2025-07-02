import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';

// 🔥 Ping the backend server to wake it up
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

axios.get(`${API_BASE_URL}/ping`);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
