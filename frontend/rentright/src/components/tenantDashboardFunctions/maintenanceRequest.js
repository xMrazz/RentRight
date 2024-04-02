import React, { useState } from 'react';
import axios from 'axios';
import '../css/tenantDashboard.css';

function MaintenanceRequest({ closeFunction }) {
  const [requestData, setRequestData] = useState({
    name: '',
    unit: '',
    description: '',
    status: 'Open', // Default status for new requests
  });

  const handleChange = (e) => {
    setRequestData({
      ...requestData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/requests', requestData);
      alert('Maintenance request submitted successfully');
      closeFunction();
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      alert('Failed to submit maintenance request');
    }
  };

  return (
    <div className="modal-background">
      <div className="modal-content">
        <span className="close-modal" onClick={closeFunction}>&times;</span>
        <h2 className="modal-header">Submit Maintenance Request</h2>
        <form onSubmit={handleSubmit} className="modal-form">
          <input type="text" name="name" placeholder="Full Name" value={requestData.name} onChange={handleChange} required className="modal-form input" />
          <input type="number" name="unit" placeholder="Unit Number" value={requestData.unit} onChange={handleChange} required className="modal-form input" />
          <textarea name="description" placeholder="Description of Issue" value={requestData.description} onChange={handleChange} required rows="4" className="modal-form input description-textarea"></textarea>
          <div className="form-submit">
            <button type="submit" className="save-button">Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MaintenanceRequest;