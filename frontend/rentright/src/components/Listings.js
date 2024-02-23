import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Listings() {
  const [listings, setListings] = useState([]);

  useEffect(() => {
    fetchListings();
  }, []);

  async function fetchListings() {
    try {
      const response = await axios.get('/listings');
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  }

  return (
    <div>
      <h1>Listings</h1>
      <div className="listings-container">
        {listings.map(listing => (
          <div key={listing._id} className="listing-item">
            <h3>{listing.title}</h3>
            <p>Unit Number: {listing.unitNum}</p>
            <p>Bedrooms: {listing.bedroomNum}</p>
            <p>Bathrooms: {listing.bathroomNum}</p>
            <p>Price: {listing.price}</p>
            <img src={listing.imageUrls[0]} alt="Listing" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listings;
