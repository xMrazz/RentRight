import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTenant from './dashboardFunctions/addTenant';
import TenantList from './dashboardFunctions/tenantList';
import MakeAnnouncement from './dashboardFunctions/makeAnnouncement';
import AnnouncementList from './dashboardFunctions/announcementList';
import './css/managerDashboard.css';

function ManagerDashboard() {
  const navigate = useNavigate();
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [showTenantList, setShowTenantList] = useState(false);
  const [showMakeAnnouncement, setShowMakeAnnouncement] = useState(false);
  const [showAnnouncementList, setShowAnnouncementList] = useState(false);
  const username = localStorage.getItem('name');

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleAddTenantModal = () => {
    setShowAddTenantModal(!showAddTenantModal);
  };

  const toggleTenantList = () => {
    setShowTenantList(!showTenantList);
  };

  const toggleMakeAnnouncement = () => {
    setShowMakeAnnouncement(!showMakeAnnouncement);
  }

  const toggleAnnouncementList = () => {
    setShowAnnouncementList(!showAnnouncementList);
  }

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
        <div className="dashboard-sections">
          <div className="buttons-column">
            <h3>Tenants</h3>
            <button onClick={toggleAddTenantModal}>Add Tenant</button>
            <button onClick={toggleTenantList}>Tenant List</button>
          </div>
          <div className="buttons-column">
            <h3>Listings</h3>
            <button onClick={() => navigate('/add-listing')}>Add Listing</button>
            <button onClick={() => navigate('/edit-listing')}>Listings</button>
          </div>
          <div className="buttons-column">
            <h3>Rental</h3>
            <button onClick={() => navigate('/rent-applications')}>Rent Applications</button>
            <button onClick={() => navigate('/maintenance-requests')}>Maintenance Requests</button>
          </div>
          <div className="buttons-column">
            <h3>Announcements</h3>
            <button onClick={toggleMakeAnnouncement}>Make Announcement</button>
            <button onClick={toggleAnnouncementList}>Announcement List</button>
          </div>
        </div>
        {showAddTenantModal && (
          <div className="modal-background">
            <div className="modal-content">
              <AddTenant closeFunction={toggleAddTenantModal} />
              <button onClick={toggleAddTenantModal} className="close-modal">Close</button>
            </div>
          </div>
        )}
        {showTenantList && (
          <div className="modal-background">
            <div className="modal-content">
              <TenantList />
              <button onClick={toggleTenantList} className="close-modal">Close</button>
            </div>
          </div>
        )}
        {showMakeAnnouncement && (
          <div className="modal-background">
            <div className="modal-content">
              <MakeAnnouncement closeFunction={toggleMakeAnnouncement} />
              <button onClick={toggleMakeAnnouncement} className="close-modal">Close</button>
            </div>
          </div>
        )}  
        {showAnnouncementList && (
          <div className="modal-background">
            <div className="modal-content">
              <AnnouncementList />
              <button onClick={toggleAnnouncementList} className="close-modal">Close</button>
            </div>
          </div>
        )}
      </main>

      <footer className="footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>
    </div>
  );
}

export default ManagerDashboard;    