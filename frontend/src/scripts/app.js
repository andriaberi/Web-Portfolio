import React from 'react';
import Home from './pages/home'
import About from './pages/about'
import Experience from './pages/experience'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/about" element={ <About /> } />
            <Route path="/experience" element={ <Experience /> } />
        </Routes>
    );
}

export default App;