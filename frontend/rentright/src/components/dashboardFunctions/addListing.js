import React, { useState } from 'react';
import axios from 'axios';
import '../css/managerDashboard.css';

function AddListing({ onClose }) {
    const [formData, setFormData] = useState({
        title: '',
        address: '',
        unitNum: '',
        bedroomNum: '',
        bathroomNum: '',
        price: '',
        imageUrls: [''],
    });

    const handleChange = (e, index) => {
        if (e.target.name === "imageUrls") {
            const newImageUrls = formData.imageUrls.map((url, i) => i === index ? e.target.value : url);
            setFormData({ ...formData, imageUrls: newImageUrls });
        } else {
            setFormData({ ...formData, [e.target.name]: e.target.value });
        }
    };

    const addImageUrl = () => {
        setFormData({ ...formData, imageUrls: [...formData.imageUrls, ''] });
    };

    const removeImageUrl = index => {
        setFormData({ ...formData, imageUrls: formData.imageUrls.filter((_, i) => i !== index) });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:3000/api/v1/listings', formData);
            console.log(response.data);
            alert('Listing added successfully');
            if (onClose) onClose();
        } catch (error) {
            console.error('Error adding listing:', error.response || error);
            alert('Failed to add listing');
        }
    };

    return (
        <div className="modal-background">
            <div className="modal-content">
                <span className="close-modal" onClick={onClose}>Close</span>
                <h2 className="modal-header">Add New Listing</h2>
                <form onSubmit={handleSubmit} className="modal-form">
                    <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} required />
                    <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} required />
                    <input type="number" name="unitNum" placeholder="Unit Number" value={formData.unitNum} onChange={handleChange} required />
                    <input type="number" name="bedroomNum" placeholder="Number of Bedrooms" value={formData.bedroomNum} onChange={handleChange} required />
                    <input type="number" name="bathroomNum" placeholder="Number of Bathrooms" value={formData.bathroomNum} onChange={handleChange} required />
                    <input type="text" name="price" placeholder="Price" value={formData.price} onChange={handleChange} required />
                    {formData.imageUrls.map((url, index) => (
                        <div key={index} className="image-url-input-group">
                            <input 
                                type="text" 
                                name="imageUrls" 
                                placeholder="Image URL" 
                                value={url} 
                                onChange={(e) => handleChange(e, index)} 
                                className="modal-form input"
                            />
                            {index > 0 && (
                                <button type="button" onClick={() => removeImageUrl(index)} className="deny-button">Remove</button>
                            )}
                        </div>
                    ))}
                    <div className="image-url-addition">
                        <button type="button" onClick={addImageUrl} className="contact-button">Add Image URL</button>
                    </div>
                    <div className="form-submit">
                        <button type="submit" className="save-button">Submit</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddListing;