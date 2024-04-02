import React, { useState } from 'react';
import axios from 'axios';

function ApplicationForm({ listingId, closeFunction }) {
  const [applicationData, setApplicationData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    occupation: '',
    gender: '',
    income: '',
    phone_number: '',
  });

  const handleChange = (e) => {
    setApplicationData({
      ...applicationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/api/v1/applications', { ...applicationData, listingId });
      alert('Application submitted successfully');
      closeFunction(); // Close the form upon successful submission
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application');
    }
  };

  return (
    <div className="modal-background">
      <div className="application-form-modal">
        <span className="close-modal" onClick={closeFunction}>&times;</span>
        <h2>Submit Application</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="first_name" placeholder="First Name" value={applicationData.first_name} onChange={handleChange} required />
          <input type="text" name="last_name" placeholder="Last Name" value={applicationData.last_name} onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" value={applicationData.email} onChange={handleChange} required />
          <input type="text" name="occupation" placeholder="Occupation" value={applicationData.occupation} onChange={handleChange} required />
          <select name="gender" value={applicationData.gender} onChange={handleChange} required>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <input type="number" name="income" placeholder="Yearly Income" value={applicationData.income} onChange={handleChange} required />
          <input type="text" name="phone_number" placeholder="Phone Number" value={applicationData.phone_number} onChange={handleChange} required />
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default ApplicationForm;