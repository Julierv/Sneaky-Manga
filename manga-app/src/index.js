// src/index.js

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <Router basename="/Sneaky-Manga">
      <App />
    </Router>
  </React.StrictMode>,
  root
);

reportWebVitals();
