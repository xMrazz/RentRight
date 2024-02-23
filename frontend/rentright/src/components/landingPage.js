import React from 'react';
import './css/landingPage.css';

function LandingPage() {
  return (
    <div className="landing">
      <header className="navbar">
        <h1>RentRight</h1>
        <a href="/login" className="loginBtn">Log In</a>
      </header>
      <main className="main-section">
        <div className="text-container">
          <p className="description-text left-text">
            Your perfect place is just a click away. Explore apartments, condos, homes, and more.
          </p>
          <button className="findBtn">Find Properties</button>
          <p className="description-text right-text">
            With RentRight, you have access to top listings including luxury apartments, cozy condos, and spacious homes.
          </p>
        </div>
      </main>
      <footer className="navbar footer">
        <p>© 2024 RentRight by PixelPerfect</p>
      </footer>
    </div>
  );
}

export default LandingPage;