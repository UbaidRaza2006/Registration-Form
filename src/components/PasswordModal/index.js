"use client"

import React from 'react';

const PasswordModal = () => {
  return (
    <div className="modal-container">
      <div className="modal-content">
        <h2 className="modal-heading">Hello</h2>
        {/* Add additional content here */}
      </div>
      <style jsx>{`
        .modal-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
          backdrop-filter: blur(8px); /* Blurred background */
        }
        
        .modal-content {
          background-color: #fff;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); /* Box shadow */
          max-width: 400px; /* Adjust width as needed */
          width: 100%;
        }
        
        .modal-heading {
          text-align: center;
          color: #333;
          font-size: 24px;
          margin-bottom: 20px;
        }
      `}</style>
    </div>
  );
};

export default PasswordModal;
