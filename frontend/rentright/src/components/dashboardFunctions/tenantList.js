import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/managerDashboard.css';

function TenantList() {
  const [tenants, setTenants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTenant, setSelectedTenant] = useState(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [tenantToDelete, setTenantToDelete] = useState(null);

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users?role=Tenant');
        setTenants(response.data);
      } catch (error) {
        console.error('Error fetching tenants:', error);
      }
    };
    fetchTenants();
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredTenants = tenants.filter(tenant =>
    tenant.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tenant.unit.toString().includes(searchTerm)
  );

  const handleViewDetails = (tenant) => {
    setSelectedTenant(tenant);
  };

  const handleDeleteConfirmation = (tenantId) => {
    setShowConfirmation(true);
    setTenantToDelete(tenantId);
  };

  const handleDeleteTenant = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/users/${tenantToDelete}`);
      const updatedTenants = tenants.filter(tenant => tenant._id !== tenantToDelete);
      setTenants(updatedTenants);
      setShowConfirmation(false);
    } catch (error) {
      console.error('Error deleting tenant:', error);
    }
  };

  const closeTenantDetailsModal = () => {
    setSelectedTenant(null);
  };

  const closeConfirmationModal = () => {
    setShowConfirmation(false);
  };

  function TenantDetailsModal({ tenant, onClose }) {
    return (
      <div className="modal-background">
        <div className="modal-content">
          <h1 className="modal-header">Tenant Details</h1>
          <hr></hr>
          <div className="modal-body">
            <p><strong>First Name:</strong> {tenant.first_name}</p>
            <p><strong>Last Name:</strong> {tenant.last_name}</p>
            <p><strong>Email:</strong> {tenant.email}</p>
            <p><strong>Gender:</strong> {tenant.gender}</p>
            <p><strong>Phone Number:</strong> {tenant.phone_number}</p>
            <p><strong>Unit:</strong> {tenant.unit}</p>
            <p><strong>Payment:</strong> {"$" + tenant.payment}</p>
            <hr></hr>
          </div>
          <div className="modal-footer">
            <button onClick={onClose} className="close-modal">Close</button>
          </div>
        </div>
      </div>
    );
  }

  function ConfirmationModal({ onConfirm, onCancel }) {
    return (
      <div className="modal-background">
        <div className="modal-content">
          <h2 className="modal-header">Confirm Deletion</h2>
          <div className="modal-body">
            <p>Are you sure you want to delete this tenant?</p>
          </div>
          <div className="modal-footer">
            <button onClick={onConfirm} className="delete-button">Yes</button>
            <button onClick={onCancel} className="view-button">No</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="tenant-list-container">
      <input
        type="text"
        placeholder="Search by Name or Unit Number"
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="tenant-items">
        {filteredTenants.map((tenant) => (
          <div key={tenant._id} className="tenant-item">
            <span>{tenant.first_name} {tenant.last_name} - Unit: {tenant.unit}</span>
            <button onClick={() => handleViewDetails(tenant)} className="view-button">View</button>
            <button onClick={() => handleDeleteConfirmation(tenant._id)} className="delete-button">Delete</button>
          </div>
        ))}
      </div>
  
      {selectedTenant && <TenantDetailsModal tenant={selectedTenant} onClose={closeTenantDetailsModal} />}
      {showConfirmation && <ConfirmationModal onConfirm={handleDeleteTenant} onCancel={closeConfirmationModal} />}
    </div>
  );
}

export default TenantList;