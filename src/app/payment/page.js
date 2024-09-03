"use client";

// import AntInputComponent from "@/components/AntInput";
// // import AntUploadComponent from "@/components/AntUpload";
// import ImageUploadComponent from "@/components/AntUpload/ubaid2";
// import { Button } from "antd";
// import Image2UploadComponent from "@/components/AntUpload/ubaid2";
import React, { useEffect, useState } from "react";
import AntInputComponent from "../../components/AntInput";
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button } from "antd";
// import style from "../../components/Navbar/nav.css"
import ImageUploadComponent from "../../components/AntUpload";
import NextImage from "next/image"; // Alias one of the imports
import img from "../../../public/images/payment11.jpg"

import { Image as CloudinaryImage } from "cloudinary-react"; // Keep the other import as is
import Notification from "../../components/Notification";
import { Bounce, toast } from "react-toastify";
import dotenv from 'dotenv'
import { PlusOneOutlined } from "@mui/icons-material";

  dotenv.config()



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
      backgroundColor: "white",
      border: "1px solid #ddd",
      borderRadius: "10px",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
      height: "auto",
      marginTop: "35px",
      boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      padding: "20px",
    },
    inputs: {
      width: "100%",
      marginBottom: "15px",
      borderRadius: "5px",
      border: "1px solid #ccc",
      padding: "10px",
    },
    upload: {
      backgroundColor: "#f3f3f3",
      border: "1px solid #ccc",
      borderRadius: "5px",
      padding: "10px",
    },
    navbar: {
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    navbarLink: {
      color: "white",
      textDecoration: "none",
      padding: "10px 20px",
      borderRadius: "5px",
      fontWeight: "bold",
    },
    button: {
      backgroundColor: "#0e303e",
      border: "none",
      color: "white",
      padding: "10px 20px",
      borderRadius: "5px",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "16px",
      marginTop: "20px",
      transition: "background-color 0.3s",
    },
    buttonHover: {
      backgroundColor: "#18819b",
    },
  };

  const [imageee, setImageee] = useState("");
  const [rollNumber,setRollNumber] = useState("")
  const [registering, setRegistering] = useState(false)

  // const [paymentFormData, setPaymentFormData] = useState("");

// const [myPaymentData , setMyPaymentData ] = useState("")
const [user,setUser] = useState(null)

const [notification, setNotification] = useState(null); // Notification state


const [idForUser, setIdForUser] = useState('');
const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [status, setStatus] = useState('');
  const [otherStatus, setOtherStatus] = useState('');
  const [city, setCity] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('');
  const [paymentImg, setPaymentImg] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [check, setCheck] = useState(false);



  useEffect(() => {
  if(rollNumber.length==5){
    console.log("Updated rollNo:", rollNumber);
    // setRollNo(rollNumber)
    getUserData(rollNumber)
    }
    else{
    setCourse("")
    setBatch("")
    setFullName("")
    setFatherName("")
    setImageee("")
    setCheck(false)
    }
  }, [rollNumber])
  


  const getUserData = async (rollNumber) => {
  console.log("rollNoForUser-->", rollNumber);
  if(rollNumber){


    let userData = await fetch(`/api/students?rollNo=${rollNumber}`)
    userData = await userData.json()
      console.log(userData)
      if (userData.success) {
        let data = userData.data[0]
        console.log("data-->",data);
        // setUser(userData.data)
        // console.log(user);
    
    // agar ese data inputs mein nhi ata to phir ye user walay usestate se nikaal lena
    
    const decodedUser = {
      createdAt:data.createdAt,
      rollNo:data.rollNo,
      batch:data.batch,
      _id:data._id,
      fullName: decodeURIComponent(data.fullName),
      fatherName: decodeURIComponent(data.fatherName),
      email: decodeURIComponent(data.email),
      course: decodeURIComponent(data.course),
      payment: decodeURIComponent(data.payment),
      paymentImg: decodeURIComponent(data.paymentImg),
      status: decodeURIComponent(data.status),
      otherStatus: decodeURIComponent(data.otherStatus),
      city: decodeURIComponent(data.city),
      cnic: decodeURIComponent(data.cnic),
      phone: decodeURIComponent(data.phone),
      dateOfBirth: decodeURIComponent(data.dateOfBirth),
      gender: decodeURIComponent(data.gender),
      qualification: decodeURIComponent(data.qualification),
      address: decodeURIComponent(data.address),
      imageUrl: decodeURIComponent(data.imageUrl) // Decoding the image URL
    };

    setFullName(decodedUser.fullName);
    setFatherName(decodedUser.fatherName);
    setEmail(decodedUser.email);
    setCourse(decodedUser.course);
        setBatch(decodedUser.batch);
        setStatus(decodedUser.status);
        setOtherStatus(decodedUser.otherStatus);
        setCity(decodedUser.city);
        setCnic(decodedUser.cnic);
        setPhone(decodedUser.phone);
        setDateOfBirth(decodedUser.dateOfBirth);
        setGender(decodedUser.gender);
        setQualification(decodedUser.qualification);
        setAddress(decodedUser.address);
        setImageUrl(decodedUser.imageUrl);
        setRollNo(decodedUser.rollNo);
        setPayment(decodedUser.payment);
        setPaymentImg(decodedUser.paymentImg);
        setIdForUser(decodedUser._id)
    
    
        setImageee(decodedUser.paymentImg);


        if(userData.data[0].payment == "Done"){
          setCheck(true)
        }
        else{
          setPayment("Done")
          setOtherStatus("Enrolled")
          setCheck(false)

        }

        // console.log(fullName,fatherName,course,batch)

  }
  else if(userData.success === false){
    toast.error(userData.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });

  }
  
 

  }else{
    console.log("roll number nhi ara")
  }


}

const updateUser = async (userId) => {
  try {
    setRegistering(true)
    if(check){
    setRegistering(false)

      // setNotification({ message: 'Payment is Already Done!', success: true });
      toast.info('Your Payment is already done!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    else if(rollNumber.length !== 5 && fullName == ""){
    setRegistering(false)
      toast.error('Enter a correct 5 digit Roll Number!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
    }
    else if(userId && paymentImg !== "Not-Done" && check == false){
      // setPayment("done")
      // 27577
    let dataToEdit = await fetch(`/api/students/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ _id: userId, address, batch, city, cnic, course, dateOfBirth, email, fatherName, fullName, gender, imageUrl, payment, paymentImg, phone, qualification, rollNo, status,otherStatus }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    dataToEdit = await dataToEdit.json();

    if (dataToEdit.success) {
    setRegistering(false)
      // alert("Your Payment process has been done!..");
      // setNotification({ message: 'Payment successful!', success: true });
      toast.success('Payment Successful!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      setFullName("")
      setFatherName("")
      setCourse("")
      setBatch("")
      setPaymentImg("")
      setImageee("")
      setRollNumber("")
      setCheck(false)
    } else if(dataToEdit.success === false) {
    setRegistering(false)
      toast.error(dataToEdit.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
        });
      // setNotification({ message: 'Payment update failed!', success: false });
      console.log(dataToEdit.error);
    }
  }
  else if(paymentImg== "Not-Done"){
    setRegistering(false)
    toast.error('Provide your Payment pic!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }
  
  } catch (error) {
    setRegistering(false)
    console.error("An error occurred while updating user:", error);
    toast.error('Error, Try again later!', {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
      });
  }
};






const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Rizwan_Tayyab');

        const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_NAME
        try {
            const response = await fetch(
                `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
                {
                    method: 'POST',
                    body: formData,
                }
            );
      const data = await response.json();
      console.log("Data.response hon->>>", data.secure_url);

      // Set the image URL received from Cloudinary
      // setImageee(data.secure_url);

      // // Convert the image to base64
      // const base64Image = await getBase64Image(data.secure_url);
      // console.log("Base64 image:", base64Image);

      // Update the form data with the base64 representation of the image
      if(data.secure_url){

        setPaymentImg(data.secure_url);
        setImageee(data.secure_url);

      }
      // setPayment("done")
  } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
  }
};

// // Function to convert an image URL to base64
// const getBase64Image = async (imageUrl) => {
// //   try {
// //       const response = await fetch(imageUrl);
// //       const blob = await response.blob();
// //       return new Promise((resolve, reject) => {
// //           const reader = new FileReader();
// //           reader.onload = () => resolve(reader.result);
// //           reader.onerror = reject;
// //           reader.readAsDataURL(blob);
// //       });
// //   } catch (error) {
// //       console.error('Error fetching image for base64 conversion:', error);
// //       return null;
// //   }
// };











const triggerFileInput = () => {
  document.getElementById('file-upload').click();
};

console.log(imageee);
console.log("Image Url ka baap hon----->", paymentImg)

return (
  <div id="payment" className="bg-[#eefcfd]" style={{ minHeight: '100vh' }}>
    {/* Navbar */}
    <div className="bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white flex items-center justify-between px-4 py-2" style={styles.navbar}>
      <a href="/" style={styles.navbarLink}>Home</a>
      <p className="text-2xl font-bold">Payment Verify Form</p>
    </div>

    {/* Form Container */}
    <div className="space-y-6 mx-auto" style={styles.container}>
      <div className="space-y-6">
        <AntInputComponent
          placeholder={"Enter Roll No."}
          style={styles.inputs}
          value={rollNumber}
          onChange={(event) => setRollNumber(event.target.value)}
        />
        <AntInputComponent
          placeholder={"Enter Name"}
          style={styles.inputs}
          value={fullName}
        />
        <AntInputComponent
          placeholder={"Enter Course"}
          style={styles.inputs}
          value={course}
        />
        <AntInputComponent
          placeholder={"Enter Batch"}
          style={styles.inputs}
          value={batch}
        />
      </div>

      {/* Image Upload */}
      <div className="image-upload-container" onClick={triggerFileInput} style={styles.upload}>
        {!paymentImg || paymentImg === "Not-Done" ? (
          <label className="text-gray-600" htmlFor="file-upload">
            Payment Image <PlusOutlined />
          </label>
        ) : (
          <img src={paymentImg} alt="Uploaded image" className="uploaded-image" />
        )}
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageUpload}
        />
      </div>

      {/* Submit Button */}
      {registering ? (
        <button className="btn" style={{ ...styles.button, ...styles.buttonHover }}>
          <div className="flex items-center space-x-3 mx-auto">
            <div className="loader-dot w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }}></div>
            <div className="loader-dot w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }}></div>
            <div className="loader-dot w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite' }}></div>

            {/* Add more loader dots if needed */}
          </div>
        </button>
      ) : (
        <button className="btn" style={styles.button} onClick={() => updateUser(idForUser)}>
          Submit
        </button>
      )}
    </div>
  </div>
);
}