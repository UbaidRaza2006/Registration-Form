import React, { useState, useRef, useEffect } from "react";
import { Modal, Button } from "antd";
import Cropper from "react-easy-crop";
import { toast } from "react-toastify";
import { PlusOutlined } from "@ant-design/icons";

const ImageUploader = ({ formImage, onImageUpload, reset, size, ratio }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [croppingImage, setCroppingImage] = useState(null);
  const [croppedBlob, setCroppedBlob] = useState(null);
  const [croppedImageURL, setCroppedImageURL] = useState(null);
  const [previousImage, setPreviousImage] = useState(formImage || null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [imageLoading, setImageLoading] = useState(false);

  const fileInputRef = useRef();

  // Parse the height and ratio from props
  const height = parseInt(size.replace("px", ""), 10); // Extract height as a number
  const width = height * (ratio[0] / ratio[1]); // Calculate the width based on ratio

  // Reset the image when the reset prop changes
  useEffect(() => {
    if (reset) {
      setPreviousImage(null);
      setCroppedBlob(null);
      setCroppedImageURL(null);
    }
  }, [reset]);

  // Handle file input change and open the modal
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCroppingImage(file);
      setIsModalOpen(true);
    }
  };

  // Handle crop complete
  const handleCropComplete = async (croppedArea, croppedAreaPixels) => {
    if (!croppingImage) return;
    try {
      const croppedBlob = await getCroppedImg(croppingImage, croppedAreaPixels);
      const previewUrl = URL.createObjectURL(croppedBlob);
      setCroppedBlob(croppedBlob);
      setCroppedImageURL(previewUrl);
    } catch (error) {
      console.error("Error cropping image:", error);
    }
  };

  const getCroppedImg = async (imageSrc, croppedAreaPixels) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    const img = await createImageBitmap(imageSrc);
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;

    ctx.drawImage(
      img,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) resolve(blob);
          else reject(new Error("Canvas is empty"));
        },
        "image/jpeg",
        0.9
      );
    });
  };

  // Upload cropped image to Cloudinary
  const handleUploadToCloudinary = async () => {
    if (!croppedBlob) {
      toast.error("No cropped image to upload.");
      return;
    }
    setImageLoading(true);

    const formData = new FormData();
    formData.append("file", croppedBlob);
    formData.append("upload_preset", "Rizwan_Tayyab");

    const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      if (data.secure_url) {
        setPreviousImage(data.secure_url);
        onImageUpload(data.secure_url);
        toast.success("Image uploaded successfully!");
        setIsModalOpen(false);
      } else {
        throw new Error("Failed to upload image.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image.");
    } finally {
      setImageLoading(false);
    }
  };

  // Cancel the cropping and restore the previous image
  const handleCancel = () => {
    setIsModalOpen(false);
    setCroppingImage(null);
    setCroppedBlob(null);
    setCroppedImageURL(null);
    toast.info("Cropping cancelled.");
  };

  return (
    <div
      className="image-upload-container"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        border: "2px solid #cfcece",
        borderRadius: "12px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="uploader-content"
        onClick={() => fileInputRef.current.click()}
      >
        {!previousImage ? (
          <label className="upload-placeholder cursor-pointer text-gray-500">
            Upload <PlusOutlined className="ml-2" />
          </label>
        ) : (
          <img
            src={previousImage}
            alt="Uploaded"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "12px",
            }}
          />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {/* Modal for cropping */}
      <Modal
        style={{ marginTop: "-50px" }}
        open={isModalOpen}
        footer={null}
        closable={false}
        width={700}
      >
        <div className="cropper-container">
          <Cropper
            image={croppingImage ? URL.createObjectURL(croppingImage) : ""}
            crop={crop}
            zoom={zoom}
            aspect={ratio[0] / ratio[1]}
            onCropChange={setCrop}
            onCropComplete={handleCropComplete}
            onZoomChange={setZoom}
          />
        </div>

        {/* Controls & Buttons */}
        <div className="crop-controls">
          <input
            className="w-[30%]"
            type="range"
            value={zoom}
            min={1}
            max={3}
            step={0.1}
            onChange={(e) => setZoom(parseFloat(e.target.value))}
          />
        </div>

        <div className="modal-buttons">
          <Button type="default" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="primary"
            className="bg-blue-600"
            onClick={handleUploadToCloudinary}
          >
            Upload
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ImageUploader;
