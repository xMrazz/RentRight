import React, { useState } from 'react';
import axios from 'axios';

function MakeAnnouncement({ closeFunction }) {
  const [announcementData, setAnnouncementData] = useState({
    title: '',
    body: ''
  });

  const handleChange = (e) => {
    setAnnouncementData({
      ...announcementData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/announcements', announcementData);
      alert('Announcement created successfully!');
      closeFunction();
    } catch (error) {
      console.error('Error creating announcement:', error.response || error);
      alert('Failed to create announcement');
    }
  };

  return (
    <div className="modal-form">
      <h2>Create New Announcement</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input placeholder='Title'
            type="text"
            name="title"
            id="title"
            value={announcementData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <textarea
            name="body"
            id="body"
            value={announcementData.body}
            onChange={handleChange}
            required
            className="announcement-body-textarea"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      <button onClick={closeFunction} className="close-modal">Close</button>
    </div>
  );
}

export default MakeAnnouncement;