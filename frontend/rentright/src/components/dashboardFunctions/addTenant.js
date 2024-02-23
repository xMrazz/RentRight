import React, { useState } from 'react';
import axios from 'axios';

function AddTenant() {
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        gender: '',
        phone_number: '',
        unit: '',
        payment: '',
        role: 'Tenant'
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/users', formData);
            console.log(response.data);
            alert('Tenant added successfully');
        } catch (error) {
            console.error('Error adding tenant:', error.response || error);
            alert('Failed to add tenant');
        }
    };

    return (
        <div className="modal-form">
            <h2>Add New Tenant</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="first_name" placeholder="First Name" value={formData.first_name} onChange={handleChange} required />
                <input type="text" name="last_name" placeholder="Last Name" value={formData.last_name} onChange={handleChange} required />
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                <select name="gender" value={formData.gender} onChange={handleChange} required>
                    <option value="" disabled>Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>
                <input type="text" name="phone_number" placeholder="Phone Number" value={formData.phone_number} onChange={handleChange} />
                <input type="number" name="unit" placeholder="Unit Number" value={formData.unit} onChange={handleChange} />
                <input type="number" name="payment" placeholder="Payment" value={formData.payment} onChange={handleChange} />
                <input type="text" name="role" value="Tenant" disabled />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default AddTenant; 