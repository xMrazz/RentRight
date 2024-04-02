import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ApplicationForm from './applicationForm.js';
import './css/listingsPage.css';

function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [showListingModal, setShowListingModal] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/listings');
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchListings();
  }, []);

  const openListingModal = (listing) => {
    setCurrentListing({ ...listing, imageIndex: 0 });
    setShowListingModal(true);
  };

  const closeListingModal = () => {
    setShowListingModal(false);
  };

  const openApplicationForm = () => {
    setShowApplicationForm(true);
  };

  const closeApplicationForm = () => {
    setShowApplicationForm(false);
    setShowListingModal(false);
  };

  const nextImage = () => {
    setCurrentListing((prevState) => ({
      ...prevState,
      imageIndex: (prevState.imageIndex + 1) % prevState.imageUrls.length,
    }));
  };

  const prevImage = () => {
    setCurrentListing((prevState) => ({
      ...prevState,
      imageIndex:
        (prevState.imageIndex - 1 + prevState.imageUrls.length) %
        prevState.imageUrls.length,
    }));
  };

  return (
    <div className="listings-page-container">
      <header className="listings-navbar">
        <h1 className="header-title">RentRight</h1>
        <div className="dropdown">
          <button className="dropbtn">Options</button>
          <div className="dropdown-content">
            <a href="#" onClick={() => navigate(-1)}>Go Back</a>
            <a href="/login">Log In</a>
          </div>
        </div>
      </header>

      <main className="listings-content">
        <h1 className="listings-title">Available Properties</h1>
        <div className="listings-grid">
          {listings.map((listing) => (
            <div key={listing._id} className="listing-card">
              <img src={listing.imageUrls[0]} alt="Listing" className="listing-image" />
              <div className="listing-info">
                <h3>{listing.title}</h3>
                <p>{listing.bedroomNum} BD, {listing.bathroomNum} BA</p>
                <p>{listing.address}</p>
                <button className="view-button" onClick={() => openListingModal(listing)}>View</button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer className="listings-footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>

      {showListingModal && currentListing && (
        <div className="modal-background">
          <div className="modal">
            <span className="close-modal" onClick={closeListingModal}>&times;</span>
            <div className="modal-images">
              <button onClick={prevImage} className="image-nav">&lt;</button>
              <img src={currentListing.imageUrls[currentListing.imageIndex]} alt="Listing" className="modal-image" />
              <button onClick={nextImage} className="image-nav">&gt;</button>
            </div>
            <div className="modal-details">
              <h3>{currentListing.title}</h3>
              <p>Location: {currentListing.address}</p>
              <p>Unit #{currentListing.unitNum}</p>
              <p>{currentListing.bedroomNum} Bedrooms, {currentListing.bathroomNum} Bathroom</p>
              <p>Payment: {currentListing.price}</p>
              <button onClick={() => {
                closeListingModal();
                openApplicationForm();
              }} className="submit-application">Submit an Application</button>
            </div>
          </div>
        </div>
      )}

      {showApplicationForm && currentListing && (
        <ApplicationForm listingId={currentListing._id} closeFunction={closeApplicationForm} />
      )}
      </div>
  );
}

export default ListingsPage;