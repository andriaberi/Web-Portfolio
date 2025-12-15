import React from 'react';
import Home from './pages/home'
import NotFound from './pages/not-found'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    );
}

export default App;