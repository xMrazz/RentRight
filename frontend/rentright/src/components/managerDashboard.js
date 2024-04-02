import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTenant from './dashboardFunctions/addTenant';
import TenantList from './dashboardFunctions/tenantList';
import MakeAnnouncement from './dashboardFunctions/makeAnnouncement';
import AnnouncementList from './dashboardFunctions/announcementList';
import MaintenanceRequests from './dashboardFunctions/maintenanceRequests';
import Applications from './dashboardFunctions/applicationList';
import ViewListings from './dashboardFunctions/viewListings';
import AddListing from './dashboardFunctions/addListing';
import './css/managerDashboard.css';

function ManagerDashboard() {
  const navigate = useNavigate();
  const [showAddTenantModal, setShowAddTenantModal] = useState(false);
  const [showTenantList, setShowTenantList] = useState(false);
  const [showMakeAnnouncement, setShowMakeAnnouncement] = useState(false);
  const [showAnnouncementList, setShowAnnouncementList] = useState(false);
  const [showMaintenanceRequests, setShowMaintenanceRequests] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [showListingsModal, setShowListingsModal] = useState(false);
  const [showAddListingModal, setShowAddListingModal] = useState(false);
  const username = localStorage.getItem('name');

  const handleSignOut = () => {
    localStorage.clear();
    navigate('/login');
  };

  const toggleListingsModal = () => {
    setShowListingsModal(!showListingsModal);
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

  const toggleMaintenanceRequests = () => {
    setShowMaintenanceRequests(!showMaintenanceRequests);
  }

  const toggleApplications = () => {
    setShowApplications(!showApplications);
  }

  const toggleAddListingModal = () => {
    setShowAddListingModal(!showAddListingModal);
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
            <button onClick={toggleAddListingModal}>Add Listing</button>
            <button onClick={toggleListingsModal}>Listings</button>
          </div>
          <div className="buttons-column">
            <h3>Rental</h3>
            <button onClick={toggleApplications}>Rent Applications</button>
            <button onClick={toggleMaintenanceRequests}>Maintenance Requests</button>
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
        {showMaintenanceRequests && (
          <div className="modal-background">
            <div className="modal-content">
              <MaintenanceRequests />
              <button onClick={toggleMaintenanceRequests} className="close-modal">Close</button>
            </div>
          </div>
        )}
        {showApplications && (
          <div className="modal-background">
            <div className="modal-content">
              <Applications />
              <button onClick={toggleApplications} className="close-modal">Close</button>
            </div>
          </div>
        )}
        {showListingsModal && (
          <div className="modal-background">
            <div className="modal-content">
              <ViewListings isVisible={showListingsModal} onClose={() => setShowListingsModal(false)} />
              <button onClick={() => setShowListingsModal(false)} className="close-modal">Close</button>
            </div>
          </div>
        )}
        {showAddListingModal && (
          <div className="modal-background">  
            <div className="modal-content">
              <AddListing onClose={toggleAddListingModal} />
              <button onClick={toggleAddListingModal} className="close-modal">Close</button>
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