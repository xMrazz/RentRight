import React, { useState, useEffect } from "react";
import axios from "axios";
import "../css/viewListings.css";

function ViewListings() {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [showDetailView, setShowDetailView] = useState(false);
  const [showEditView, setShowEditView] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: "",
    address: "",
    unitNum: "",
    bedroomNum: "",
    bathroomNum: "",
    price: "",
    imageUrls: [],
  });
  const [searchQuery, setSearchQuery] = useState("");

  const fetchListings = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/listings");
      setListings(response.data);
    } catch (error) {
      console.error("Error fetching listings:", error);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const handleViewDetails = (listing) => {
    setSelectedListing(listing);
    setShowDetailView(true);
    setShowEditView(false);
  };

  const handleEdit = (listing) => {
    setEditFormData({
      ...listing,
    });
    setSelectedListing(listing);
    setShowEditView(true);
    setShowDetailView(false);
  };

  const handleEditChange = (e) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(
        `http://localhost:3000/api/v1/listings/${selectedListing.unitNum}`,
        editFormData
      );
      setSelectedListing(null);
      setShowEditView(false);
      fetchListings();
    } catch (error) {
      console.error("Error updating listing:", error);
    }
  };

  const handleDeleteConfirmation = (listing) => {
    setShowConfirmationModal(true);
    setListingToDelete(listing.unitNum);
  };

  const handleDeleteListing = async () => {
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/listings/${listingToDelete}`
      );
      setShowConfirmationModal(false);
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredListings = listings.filter(
    (listing) =>
      listing.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.unitNum.toString().includes(searchQuery)
  );

  return (
    <div className="listings-container">
      <h2>Listings</h2>
      <input
        type="text"
        placeholder="Search by Unit # or Address"
        value={searchQuery}
        onChange={handleSearchChange}
        className="search-input"
      />
      <div className="listings-list">
        {filteredListings.map((listing) => (
          <div key={listing.unitNum} className="listing-item">
            <p>
              {listing.address} - Unit: {listing.unitNum}
            </p>
            <button
              className="listing-view-button"
              onClick={() => handleViewDetails(listing)}
            >
              View
            </button>
            <button
              className="listing-edit-button"
              onClick={() => handleEdit(listing)}
            >
              Edit
            </button>
            <button
              className="listing-delete-button"
              onClick={() => handleDeleteConfirmation(listing)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      {showDetailView && selectedListing && (
        <div className="listing-modal-background">
          <div className="listing-modal">
            <span
              className="listing-close-modal"
              onClick={() => setShowDetailView(false)}
            >
              &times;
            </span>
            <h3 className="listing-header">{selectedListing.title}</h3>
            <div className="listing-details">
              <p>Address: {selectedListing.address}</p>
              <p>Unit Number: {selectedListing.unitNum}</p>
              <p>Bedrooms: {selectedListing.bedroomNum}</p>
              <p>Bathrooms: {selectedListing.bathroomNum}</p>
              <p>Price: {selectedListing.price}</p>
            </div>
          </div>
        </div>
      )}
      {showEditView && selectedListing && (
        <div className="listing-modal-background">
          <div className="listing-modal">
            <span
              className="listing-close-modal"
              onClick={() => setShowEditView(false)}
            >
              &times;
            </span>
            <form className="listing-edit-form" onSubmit={handleEditSubmit}>
              <h3 className="listing-header">Edit Listing</h3>
              <input
                name="title"
                className="listing-edit-input"
                value={editFormData.title}
                onChange={handleEditChange}
                placeholder="Title"
              />
              <input
                name="address"
                className="listing-edit-input"
                value={editFormData.address}
                onChange={handleEditChange}
                placeholder="Address"
              />
              <input
                name="unitNum"
                className="listing-edit-input"
                type="number"
                value={editFormData.unitNum}
                onChange={handleEditChange}
                placeholder="Unit Number"
              />
              <input
                name="bedroomNum"
                className="listing-edit-input"
                type="number"
                value={editFormData.bedroomNum}
                onChange={handleEditChange}
                placeholder="Number of Bedrooms"
              />
              <input
                name="bathroomNum"
                className="listing-edit-input"
                type="number"
                value={editFormData.bathroomNum}
                onChange={handleEditChange}
                placeholder="Number of Bathrooms"
              />
              <input
                name="price"
                className="listing-edit-input"
                value={editFormData.price}
                onChange={handleEditChange}
                placeholder="Price"
              />
              <input
                name="imageUrls"
                className="listing-edit-input"
                value={JSON.stringify(editFormData.imageUrls)}
                onChange={handleEditChange}
                placeholder="Image URLs (comma separated)"
              />
              <button type="submit" className="listing-save-button">
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}{" "}
      {showConfirmationModal && (
        <div className="listing-modal-background">
          <div className="listing-modal">
            <div className="listing-confirmation-content">
              <span
                className="listing-close-modal"
                onClick={() => setShowConfirmationModal(false)}
              >
                &times;
              </span>
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this listing?</p>
              <div className="modal-footer">
                <button onClick={handleDeleteListing} className="listing-delete-button">Delete</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ViewListings;
