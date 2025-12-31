import React from 'react';
import Home from './pages/home'
import NotFound from './pages/not-found'
import ProjectPage from './pages/project-page'
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/projects/:slug" element={ <ProjectPage /> } />
            <Route path="*" element={ <NotFound /> } />
        </Routes>
    );
}

export default App;