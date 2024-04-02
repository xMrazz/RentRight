import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/aboutUs.css';

function AboutUs() {
  const navigate = useNavigate();

  return (
    <div className="about-us-page">
      <header className="navbar">
        <h1 className="logo-text">RentRight</h1>
        <button className="go-back-btn" onClick={() => navigate(-1)}>Go Back</button>
      </header>
      <main className="about-content">
        <h2>Made by PixelPerfect</h2>
        <div className="team-members">
          <h3>Our Team</h3>
          <ul>
            <li>Igor Tsyupko  -  Front-End Development</li>
            <li>Nizar Atassi  -  Back-End Development</li>
            <li>Egor Poimanov  -  Database Development</li>
            <li>Ahmet Buyukbas  -  API Integration & Testing</li>
          </ul>
        </div>
      </main>
      <footer className="footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>
    </div>
  );
}

export default AboutUs;