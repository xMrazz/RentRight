import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/managerDashboard.css';

function MaintenanceRequests() {
  const [requests, setRequests] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [showStatusUpdateModal, setShowStatusUpdateModal] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/requests');
        setRequests(response.data);
      } catch (error) {
        console.error('Error fetching requests:', error);
      }
    };
    fetchRequests();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredRequests = requests.filter(request =>
    request.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    request.unit.toString().includes(searchTerm) ||
    request.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
  };

  const handleStatusUpdate = async (requestId) => {
    try {
      await axios.put(`http://localhost:3000/api/v1/requests/${requestId}`, { status: newStatus });
      const updatedRequests = await axios.get('http://localhost:3000/api/v1/requests');
      setRequests(updatedRequests.data);
      setShowStatusUpdateModal(false);
    } catch (error) {
      console.error('Error updating request:', error);
    }
  };

  const closeRequestDetailsModal = () => {
    setSelectedRequest(null);
  };

  const openStatusUpdateModal = (request) => {
    setSelectedRequest(request);
    setShowStatusUpdateModal(true);
    setNewStatus(request.status);
  };

  const closeStatusUpdateModal = () => {
    setShowStatusUpdateModal(false);
  };

  function RequestDetailsModal({ request, onClose }) {
    return (
      <div className="modal-background">
        <div className="modal-content">
          <h2>Request Details</h2>
          <p><strong>Name:</strong> {request.name}</p>
          <p><strong>Unit:</strong> {request.unit}</p>
          <p><strong>Description:</strong> {request.description}</p>
          <p><strong>Status:</strong> {request.status}</p>
          <button onClick={onClose} className="close-modal">Close</button>
        </div>
      </div>
    );
  }

  function StatusUpdateModal({ request, onClose }) {
    return (
      <div className="modal-background">
        <div className="modal-form">
          <h2>Update Request Status</h2>
          <select value={newStatus} onChange={(e) => setNewStatus(e.target.value)}>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Closed">Closed</option>
          </select>
          <div className="modal-footer">
            <button onClick={() => handleStatusUpdate(request._id)} className="view-button">Update Status</button>
            <button onClick={onClose} className="close-modal">Cancel</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="requests-list-container">
      <input
        type="text"
        placeholder="Search by Name, Unit or Status"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="requests-items">
        {filteredRequests.map((request) => (
          <div key={request._id} className="request-item">
            <span>{request.name} - Unit: {request.unit}, Status: {request.status}</span>
            <button onClick={() => handleViewDetails(request)} className="view-button">View Details</button>
            <button onClick={() => openStatusUpdateModal(request)} className="delete-button">Modify Status</button>
          </div>
        ))}
      </div>

      {selectedRequest && <RequestDetailsModal request={selectedRequest} onClose={closeRequestDetailsModal} />}
      {showStatusUpdateModal && <StatusUpdateModal request={selectedRequest} onClose={closeStatusUpdateModal} />}
    </div>
  );
}

export default MaintenanceRequests;