import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/managerDashboard.css';

function ApplicationList() {
    const [applications, setApplications] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [applicationToDelete, setApplicationToDelete] = useState(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    useEffect(() => {
        fetchApplications();
    }, []);

    const fetchApplications = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/applications');
            setApplications(response.data);
        } catch (error) {
            console.error('Error fetching applications:', error);
        }
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const formatPhoneNumber = (phoneNumberString) => {
        const cleaned = ('' + phoneNumberString).replace(/\D/g, '');
        const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
        if (match) {
            return `+1 (${match[1]}) - ${match[2]} - ${match[3]}`;
        }
        return null;
    };

    const formatIncome = (income) => {
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(income);
    };

    const handleContact = (email) => {
        window.open(`mailto:${email}`);
    };

    const handleDeny = (applicationId) => {
        setApplicationToDelete(applicationId);
        setShowConfirmationModal(true);
    };

    const confirmDenial = async () => {
        try {
            await axios.delete(`http://localhost:3000/api/v1/applications/${applicationToDelete}`);
            fetchApplications(); // Refresh list after deletion
            setShowConfirmationModal(false);
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    const cancelDenial = () => {
        setShowConfirmationModal(false);
    };

    const filteredApplications = applications.filter(application =>
        application.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        application.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="application-list-container">
            <input
                type="text"
                placeholder="Search by Name or Email"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <div className="application-items">
                {filteredApplications.map((application) => (
                    <div key={application._id} className="application-item">
                        <h2>{application.first_name} {application.last_name}</h2>
                        <p>Email: {application.email}</p>
                        <p>Occupation: {application.occupation}</p>
                        <p>Income: {formatIncome(application.income)}</p>
                        <p>Phone Number: {formatPhoneNumber(application.phone_number)}</p>
                        <button onClick={() => handleContact(application.email)} className="contact-button">Contact</button>
                        <button onClick={() => handleDeny(application._id)} className="deny-button">Deny</button>
                        <hr />
                    </div>
                ))}
            </div>
            {showConfirmationModal && (
                <div className="modal-background">
                    <div className="modal-content">
                        <h2>Confirm Denial</h2>
                        <p>Are you sure you want to deny this application?</p>
                        <div className="modal-footer">
                            <button onClick={confirmDenial} className="deny-button">Yes, Deny</button>
                            <button onClick={cancelDenial} className="close-modal">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ApplicationList;