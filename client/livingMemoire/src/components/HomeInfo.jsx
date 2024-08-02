import React from 'react';
import '../styles/homeinfo.css';

const HomeInfo = () => {
  return (
    <div className="container">
      <div className="header">
        <h2>
          Loving Legacy
        </h2>
      </div>
      <div className="content">
        <div className="message">
          <h2>Your account has not been linked yet.</h2>
          <p>Please scan the QR-Code to link your account.</p>
        </div>
<button className="connect-button">
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="icon"
  >
    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path>
    <circle cx="12" cy="13" r="4"></circle>
  </svg>
  Connect now
</button>


        <div className="divider">
          <hr />
          <span>or</span>
          <hr />
        </div>
        <div className="footer">
          <h2>Don't have one yet?</h2>
          <p>Order now and link it to your account to create a memorial page.</p>
          <button className="buy-button">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default HomeInfo;
