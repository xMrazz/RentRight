import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/login';
import LandingPage from './components/landingPage';
import ManagerDashboard from './components/managerDashboard';
import TenantDashboard from './components/tenantDashboard';
import AnnouncementPage from './components/announcementPage';
import Listings from './components/listingsPage';
import PaymentForm from './components/tenantDashboardFunctions/payment';
import AboutUs from './components/aboutUs';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manager-dashboard" element={<ManagerDashboard />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="/tenant-dashboard" element={<TenantDashboard />} />
        <Route path="/announcements" element={<AnnouncementPage />} />
        <Route path="/payment" element={<PaymentForm />} />
        <Route path="/about-us" element={<AboutUs />} />
      </Routes>
    </Router>
  );
}

export default App;