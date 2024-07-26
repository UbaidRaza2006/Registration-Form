import React, { useState } from 'react';

const ImageUpload = () => {
  const [image, setImage] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('file-upload').click();
  };

  return (
    <div className="image-upload-container" onClick={triggerFileInput}>
      {!image ? (
        <label htmlFor="file-upload">Upload Image</label>
      ) : (
        <img src={image} alt="Uploaded image" className="uploaded-image" />
      )}
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleImageUpload}
      />
      <style jsx>{`
        .image-upload-container {
          width: 300px;
          height: 300px;
          border: 2px dashed #aaa;
          border-radius: 12px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
        }
        .uploaded-image {
          width: 100%;
          height: 100%;
          object-fit: cover; /* This line is important */
        }
      `}</style>
    </div>
  );
};

export default ImageUpload;
