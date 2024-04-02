import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './css/announcementPage.css';

function AnnouncementPage() {
  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/announcements');
        setAnnouncements(response.data);
      } catch (error) {
        console.error('Error fetching announcements:', error);
      }
    };
    fetchAnnouncements();
  }, []);

  const handleBackToDashboard = () => {
    // The role is stored in localStorage upon login
    const userRole = localStorage.getItem('role');

    // Navigate based on the role
    if (userRole === 'Manager') {
      navigate('/manager-dashboard');
    } else if (userRole === 'Tenant') {
      navigate('/tenant-dashboard');
    } else {
      navigate('/login'); // Default navigation if no role is found
    }
  };

  return (
    <div className="announcement-page-container">
      <header className="navbar">
        <h1>RentRight</h1>
        <button className="back-button" onClick={handleBackToDashboard}>Back to Dashboard</button>
      </header>

      <main className="content">
        <h1 className="page-title">Announcements</h1>
        <div className="announcement-list">
          {announcements.map((announcement) => (
            <div key={announcement._id} className="announcement">
              <h2>{announcement.title}</h2>
              <p>{announcement.body}</p>
              <p className="date">{new Date(announcement.date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </main>

      <footer className="footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>
    </div>
  );
}

export default AnnouncementPage;