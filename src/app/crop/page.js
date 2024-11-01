"use client"
import React, { useEffect, useRef, useState } from 'react';
import style from "../../components/Crop/index.css";
import Cropper from 'react-easy-crop';

const Crop = () => {
    const [isCropping, setIsCropping] = useState(true);
    const [croppingImage, setCroppingImage] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null);
    
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const fileRef = useRef();

    const onCropComplete = async (croppedArea, croppedAreaPixels) => {
        try {
            const croppedImageBlob = await getCroppedImg(croppingImage, croppedAreaPixels);
            setCroppedImage(URL.createObjectURL(croppedImageBlob));
        } catch (error) {
            console.error('Error cropping image:', error);
        }
    };

    const getCroppedImg = async (image, croppedAreaPixels) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        const imageBitmap = await createImageBitmap(image);
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
            imageBitmap,
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
            canvas.toBlob((blob) => {
                if (blob) {
                    resolve(blob); // this is the cropped image
                } else {
                    reject(new Error('Error creating cropped image blob'));
                }
            }, 'image/jpeg'); // You can change the format if needed
        });
    };

    const cropImage = (e) => {
        if (e.target.files[0]) {
            setIsCropping(true);
            setCroppingImage(URL.createObjectURL(e.target.files[0]));
        } else {
            setIsCropping(false);
        }
    };

    // Define the uploadImage function
    const uploadImage = () => {
        // This function can be expanded to handle the cropped image upload
        if (croppedImage) {
            console.log("Cropped Image URL:", croppedImage);
            // You can implement the upload logic here, e.g., sending it to a server
        } else {
            console.error('No image has been cropped yet.');
        }
    };

    return (
        <>
            <h1>HELLO</h1>
            {isCropping ? (
                <div className="mainCropper">
                    <div className="cropCont">
                        <div className='cropperCont'>
                            <Cropper
                                image={croppingImage}
                                crop={crop}
                                zoom={zoom}
                                aspect={3 / 2}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onZoomChange={setZoom}
                            />
                        </div>
                        <div className='cropControls'>
                            <input
                                type="range"
                                value={zoom}
                                min={1}
                                max={3}
                                step={0.1}
                                aria-labelledby="Zoom"
                                onChange={(e) => {
                                    setZoom(e.target.value);
                                }}
                                className="zoom-range"
                            />
                            <button className='cropBtn' onClick={uploadImage}>Select</button>
                        </div>
                    </div>
                </div>
            ) : null}
            <input type="file" accept='image/*' ref={fileRef} hidden id='file' onChange={(e) => cropImage(e)} />
        </>
    );
}

export default Crop;
    