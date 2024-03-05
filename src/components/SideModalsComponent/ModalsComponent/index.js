import React from 'react';

const RightSideModel = ({ children, onClose }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '50%',
        right: 0,
        transform: 'translateY(-50%)',
        height: '500px',
        width: '300px',
        backgroundColor: '#fff',
        boxShadow: '-1px 0px 10px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        boxSizing: 'border-box',
        zIndex: 1000, // Ensure it's above other content
      }}
    >
      {children}

      <button
        onClick={onClose}
        style={{
          marginTop: '20px',
          padding: '8px 16px',
          backgroundColor: '#1890ff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        Close
      </button>
    </div>
  );
};

export default RightSideModel;
