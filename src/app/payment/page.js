"use client";

// import AntInputComponent from "@/components/AntInput";
// // import AntUploadComponent from "@/components/AntUpload";
// import ImageUploadComponent from "@/components/AntUpload/ubaid2";
// import { Button } from "antd";
// import Image2UploadComponent from "@/components/AntUpload/ubaid2";
import React, { useState } from "react";
import AntInputComponent from "../../components/AntInput";
import { Button } from "antd";
// import style from "../../components/Navbar/nav.css"
import ImageUploadComponent from "../../components/AntUpload";

import { Image } from "cloudinary-react";

// const cloudinary = require('cloudinary').v2;
// import { v2 as cloudinary } from "cloudinary";

if (typeof window === "undefined") {
  const { v2: cloudinary } = require("cloudinary");
  cloudinary.config({
    cloud_name: "dbcpfhk6n",
    api_key: "588376267435949",
    api_secret: "ax1LWxiCFgecD5A2ve7Rfm4kBoA",
  });
}

export default function PaymentVerify() {
  const styles = {
    container: {
    //   backgroundColor: "white",
      // border: "2px solid black",
      // borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
    //   width: "400px",
      height: "600px",
      marginTop: "35px",
      boxShadow: "1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)",
      // boxShadow: '5px 0px 1px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: "600px",

      

      // marginLeft: "200px"
    },
    inputs: {
      color: "green",
      width: "500px",
      height: "105px",
      //   border: "2px solid black",
    },
    upload: {
      backgroundColor: "green",
    },
  };

  const [imageUrl, setImageUrl] = useState("");
  // const [paymentFormData, setPaymentFormData] = useState("");

const [myPaymentData , setMyPaymentData ] = useState("")

const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Rizwan_Tayyab');

  try {
      const response = await fetch(
          'https://api.cloudinary.com/v1_1/dbcpfhk6n/image/upload',
          {
              method: 'POST',
              body: formData,
          }
      );
      const data = await response.json();
      console.log("Data.response hon->>>", data.secure_url);

      // Set the image URL received from Cloudinary
      setImageUrl(data.secure_url);

      // Convert the image to base64
      const base64Image = await getBase64Image(data.secure_url);
      console.log("Base64 image:", base64Image);

      // Update the form data with the base64 representation of the image
      setMyPaymentData(base64Image);
  } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
  }
};

// Function to convert an image URL to base64
const getBase64Image = async (imageUrl) => {
  try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(blob);
      });
  } catch (error) {
      console.error('Error fetching image for base64 conversion:', error);
      return null;
  }
};













console.log(imageUrl);
console.log("Image Url ka baap hon----->", myPaymentData)

  return (
    <div id="payment" style={{ backgroundImage: 'url("/images/paymentBg5.avif")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}>
      {/* <h1 style={{color: "blue", fontSize: "30px", fontWeight: "bolder", marginLeft: "50px", }}>Payment Verify</h1> */}

      <div
    style={{ boxShadow: "0px -5px 1px 12px rgba(0, 0, 0, 0.1)" }}
    className="items-center justify-between mt-0 w-screen bg-[#248ba5] lg:h-16 md:h-16 mx:h-16 lg:text-4xl md:text-4xl mx:text-4xl text-white flex items-center justify-center text-2xl xs:text-1xl text-[20px] font-bold h-12"
  >
    <p className="mx-auto">
      Payment Verify Form
    </p>
  </div>

      <div className="space-y-6 mx-auto w-[400px] xs:w-[100%] md:bg-white mx:bg-white lg:bg-white xl:bg-white sm:bg-white bg-none border border-black-1500" style={styles.container}>
        <div
          style={{
            margin: "0 auto", 
            marginTop: "10px",
            //  backgroundColor: "white",
          }}
          className="space-y-3 mx-auto"
        >
          <div>
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>Roll No</p>
            <AntInputComponent
              placeholder={"Enter Roll No."}
              style={styles.inputs}
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>Name</p>
            <AntInputComponent
              placeholder={"Enter Name"}
              style={styles.inputs}
            />
          </div>
          <div>
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>Course</p>
            <AntInputComponent
              placeholder={"Enter Course"}
              style={styles.inputs}
            />
          </div>
          <div>
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>Batch</p>

            <AntInputComponent
              placeholder={"Enter Batch"}
              style={styles.inputs}
            />
          </div>

          {/* <div>
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>Upload</p>
            <ImageUploadComponent />
          </div> */}
<div
          className="image-uploader"
          onClick={() => document.getElementById("image-upload").click()}
        >
          {/* <h1>Upload</h1> */}
          {/* Upload */}

          <input
            id="image-upload"
            type="file"
            placeholder="Upload here"
            onChange={handleImageUpload}
            style={{ display: "none" }}
          /> {!imageUrl ? (
            <h1> Upload Here</h1>
          ) : (
            <Image
              cloudName="dbcpfhk6n"
              publicId={imageUrl}
              style={{ width: "100%", height: "100%" }}
            />
          )}

          <style jsx>{`
            .image-uploader {
              width: 120px;
              height: 120px; /* Reduced height */
              background-color: #f2f2f2;
              border: 2px dashed #ccc;
              border-radius: 5px;
              display: flex;
              align-items: center;
              justify-content: center;
              overflow: hidden;
              position: relative;
            }
            . .upload-text {
              margin: 0;
              color: #555;
            }
            input[type="file"] {
              position: absolute;
              top: 0;
              left: 0;
              width: 120px;
              height: 120px;
              opacity: 0;
              cursor: pointer;
            }
          `}</style>
        </div>


        </div>
        
        <Button style={{ backgroundColor: "#248ba5", fontSize: "20px", fontWeight: 500,
        color: "white", textAlign: "center", width:"300px", justifyContent :"center",height: "40px", margin: "0 auto", marginTop: "20px", borderRadius: "50px"
         }}>Submit</Button>
      </div>
    </div>
  );
}