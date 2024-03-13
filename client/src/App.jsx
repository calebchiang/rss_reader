import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './pages/WelcomePage';
import AuthPage from './pages/AuthPage';
import FeedPage from './pages/FeedPage';
import AddSubscriptionsPage from './pages/AddSubscriptionsPage';
import ManageSubscriptionsPage from "./pages/ManageSubscriptionsPage";



function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<WelcomePage />} exact />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/feed" element={<FeedPage />} />
                <Route path="/addSubscriptions" element={<AddSubscriptionsPage />} />
                <Route path="/manageSubscriptions" element={<ManageSubscriptionsPage/> } />
            </Routes>
        </Router>
    );
}

export default App;
