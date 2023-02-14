/* eslint-disable import/no-extraneous-dependencies */
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import './assets/css/index.css';
import 'react-toastify/dist/ReactToastify.css';

import App from './views/App';

const root = createRoot(document.getElementById('root'));
root.render(
  <>
    <Router>
      <App />
    </Router>
    <ToastContainer className="w-[50px]" />
  </>,
);
