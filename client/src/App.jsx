import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import AddSubscriptionsPage from './pages/AddSubscriptionsPage';



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} exact />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/addSubscriptions" element={<AddSubscriptionsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
