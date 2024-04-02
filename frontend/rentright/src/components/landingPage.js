import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/landingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  const goToFindProperties = () => {
    navigate('/listings');
  };

  const goToAboutUs = () => {
    navigate('/about-us');
  };

  return (
    <div className="landing">
      <header className="navbar">
        <h1>RentRight</h1>
        <div>
          <a href="/login" className="loginBtn">Log In</a>
          <button onClick={goToAboutUs} className="aboutUsBtn">About Us</button>
        </div>
      </header>
      <main className="main-section">
        <div className="text-container">
          <p className="description-text left-text">
            Discover a place you'll love to live. <br/>
            Whether you're looking for modern apartments, cozy condos, or spacious homes<br/><br/>
            RentRight opens the door to your dream property. <br/><br/>
            Dive into our diverse listings and find the spaces that fit your lifestyle, <br/>
            preferences, and budget perfectly.
          </p>
          <button className="findBtn" onClick={goToFindProperties}>Find Your Dream Home</button>
          <p className="description-text right-text">
            RentRight isn't just about listings; it's about finding your future home. <br/><br/>
            Explore properties in vibrant neighborhoods, serene suburbs, or anything in-between.  <br/><br/>
            We connect you with luxury apartments and affordable homes. <br/>
            Start your journey with RentRight today.
          </p>
        </div>
      </main>
      <footer className="footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>
    </div>
  );
}

export default LandingPage;