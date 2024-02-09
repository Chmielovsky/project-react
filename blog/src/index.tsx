import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';
import Home from './components/Home';
import Blog from './components/Blog';
import Navigation from './components/Navigation';
import Gallery from './components/Gallery';
import LoginPage from './LoginPage';
import { AuthProvider } from './AuthContext';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <React.StrictMode>
        <AuthProvider>
            <BrowserRouter>
                <Navigation/>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/blog" element={<Blog />} />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    </React.StrictMode>
);

reportWebVitals();