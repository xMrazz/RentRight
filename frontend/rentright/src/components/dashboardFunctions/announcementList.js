import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/managerDashboard.css';

function AnnouncementList() {
  const [announcements, setAnnouncements] = useState([]);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [announcementToDelete, setAnnouncementToDelete] = useState(null);

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

  const handleDeleteConfirmation = (announcementId) => {
    setShowConfirmation(true);
    setAnnouncementToDelete(announcementId);
  };

  const handleDeleteAnnouncement = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/announcements/${announcementToDelete}`);
      const updatedAnnouncements = announcements.filter(announcement => announcement._id !== announcementToDelete);
      setAnnouncements(updatedAnnouncements);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting announcement:', error);
    }
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  };

  function ConfirmationModal({ onConfirm, onCancel }) {
    return (
      <div className="modal-background">
        <div className="modal-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this announcement?</p>
          <button onClick={onConfirm} className="delete-button">Yes</button>
          <button onClick={onCancel} className="close-modal">No</button>
        </div>
      </div>
    );
  }

  return (
    <div className="announcement-list-container">
      {announcements.map((announcement) => (
        <div key={announcement._id} className="announcement-item">
          <h2>{announcement.title}</h2>
          <p className="date">{new Date(announcement.date).toLocaleDateString()}</p>
          <hr />
          <button onClick={() => handleDeleteConfirmation(announcement._id)} className="delete-button">Delete</button>
        </div>
      ))}
      {showConfirmation && (
        <ConfirmationModal
          onConfirm={handleDeleteAnnouncement}
          onCancel={closeConfirmationModal}
        />
      )}
    </div>
  );
}

export default AnnouncementList;