import { PlusOutlined } from '@ant-design/icons';
import React, { useState } from 'react';
// import ImageIcon from './ImageIcon'; // Assuming you have an ImageIcon component

function ImageUploadComponent() {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const selectedFile = event.target.files[0];
    // Validate file type and size (replace with appropriate checks)
    if (!selectedFile.type.match('image/*') || selectedFile.size > 1024000) {
      return alert('Please select a valid image file (JPEG, PNG, or WEBP) under 1 MB.');
    }
    setSelectedImage(selectedFile);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '325px',
        height: '200px',
        border: '3px dashed #ccc',
        cursor: 'pointer',
        backgroundColor: "white",
        borderRadius: "10px",
        position: "relative", 

      }}
      onClick={() => document.getElementById('imageInput').click()}
    >
      {selectedImage ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img src={URL.createObjectURL(selectedImage)} alt="Uploaded Image" style={{ width: '325px', height:"200px", objectFit: 'cover' , borderRadius: "10px",
          }} />
        </div>
      ) : (
        <div style={{ color: '#ccc', fontSize: '18px', marginBottom: '10px' }}>
        Upload Your Payment Pic
         </div>
      )}
      <input type="file" id="imageInput" accept="image/jpeg,image/png,image/webp" onChange={handleImageChange} style={{ display: 'none' }} />
    </div>
  );
}

export default ImageUploadComponent;