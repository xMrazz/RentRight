import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MaintenanceRequest from './tenantDashboardFunctions/maintenanceRequest';
import './css/tenantDashboard.css';

function TenantDashboard() {
  const navigate = useNavigate();
  const username = localStorage.getItem('name');
  const [showMaintenanceRequestModal, setShowMaintenanceRequestModal] = useState(false);

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleMaintenanceRequestModal = () => {
    setShowMaintenanceRequestModal(!showMaintenanceRequestModal);
  };

  const handleMakePayment = () => {
    navigate('/payment');
  };

  return (
    <div className="dashboard">
      <header className="navbar">
        <h1>RentRight</h1>
        <div className="dropdown">
          <button className="dropbtn">Menu</button>
          <div className="dropdown-content">
            <a href="#" onClick={handleSignOut}>Sign Out</a>
            <a href="/announcements">Announcements</a>
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <div className="welcome-text">
          <h2>Welcome Back, {username}</h2>
        </div>
        <div className="dashboard-sections tenant">
          <div className="buttons-column full-width">
            <h3>Unit Management</h3>
            <button onClick={handleMakePayment}>Make Payment</button>
            <button onClick={toggleMaintenanceRequestModal}>Request Maintenance</button>
          </div>
          <div className="buttons-column full-width">
            <h3>Listings</h3>
            <button onClick={() => navigate('/listings')}>Listings</button>
          </div>
        </div>
        {showMaintenanceRequestModal && (
          <MaintenanceRequest closeFunction={toggleMaintenanceRequestModal} />
        )}
      </main>

      <footer className="footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>
    </div>
  );
}

export default TenantDashboard;