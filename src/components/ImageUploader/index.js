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

    // Default to 3:4 ratio if no ratio is provided
    const aspectRatio = ratio ? ratio[0] / ratio[1] : 3 / 4;

    // Parse the height and ratio from props for the uploader's size
    const height = parseInt(size.replace("px", ""), 10) || 200; // Default height to 200px
    const width = height * aspectRatio; // Dynamically calculate width based on ratio

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

    const triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };

    return (
    <>
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
            onClick={() => fileInputRef.current.click()}
            // onClick={triggerFileInput}>
        >
            <div
                className="uploader-content">
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
                id="file-upload"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChange}
                />

                </div>
            {/* Modal for cropping */}
            <Modal
                style={{ marginTop: "-30px" }}
                open={isModalOpen}
                footer={null}
                closable={false}
                width={700} // Fixed width for consistency
                // onClick={(e) => e.stopPropagation()} // Prevent click propagation inside modal
            >
                <div
                    style={{
                        width: "100%",
                        height: "400px", // Fixed height
                        position: "relative",
                    }}
                >
                    <Cropper
                        image={croppingImage ? URL.createObjectURL(croppingImage) : ""}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspectRatio} // Use dynamic or default ratio
                        onCropChange={setCrop}
                        onCropComplete={handleCropComplete}
                        onZoomChange={setZoom}
                    />
                </div>

                {/* Controls & Buttons */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "20px",
                    }}
                >



                    <Button type="default" onClick={handleCancel}>
                        Cancel
                    </Button>

                    <input
                        className="w-[40%]"
                        type="range"
                        value={zoom}
                        min={1}
                        max={3}
                        step={0.1}
                        onChange={(e) => setZoom(parseFloat(e.target.value))}
                    />

                    <Button
                        type="primary"
                        className="bg-blue-600"
                        onClick={handleUploadToCloudinary}
                    >
                        Upload
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default ImageUploader;
