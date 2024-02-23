import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import LandingPage from './components/landingPage';
import ManagerDashboard from './components/managerDashboard';
import AnnouncementPage from './components/announcementPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />     
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/announcements" element={<AnnouncementPage />} />
      </Routes>
    </Router>
  );
}

export default App;