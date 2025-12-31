import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './scripts/app';
import Footer from './scripts/includes/footer';
import './css/styles.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
        <Footer />
    </React.StrictMode>
);
