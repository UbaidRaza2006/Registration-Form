"use client";

// import AntInputComponent from "@/components/AntInput";
// // import AntUploadComponent from "@/components/AntUpload";
// import ImageUploadComponent from "@/components/AntUpload/ubaid2";
// import { Button } from "antd";
// import Image2UploadComponent from "@/components/AntUpload/ubaid2";
import React, { useEffect, useState } from "react";
import AntInputComponent from "../../components/AntInput";
import { Button } from "antd";
// import style from "../../components/Navbar/nav.css"
import ImageUploadComponent from "../../components/AntUpload";
import NextImage from "next/image"; // Alias one of the imports
import img from "../../../public/images/paymentBg5.avif"

import { Image as CloudinaryImage } from "cloudinary-react"; // Keep the other import as is
import Notification from "../../components/Notification";
import { Bounce, toast } from "react-toastify";

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

  const [imageee, setImageee] = useState("");
  const [rollNumber,setRollNumber] = useState("")

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
      ...data,
      address: decodeURIComponent(data.address),
      qualification: decodeURIComponent(data.qualification),
    };

    setFullName(decodedUser.fullName);
    setFatherName(decodedUser.fatherName);
    setEmail(decodedUser.email);
    setCourse(decodedUser.course);
        setBatch(decodedUser.batch);
        setStatus(decodedUser.status);
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
    
    
        setImageee(userData.data.paymentImg);


        if(userData.data[0].payment == "Done"){
          setCheck(true)
        }
        else{
          setPayment("Done")
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
    if(check){
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
      body: JSON.stringify({ _id: userId, address, batch, city, cnic, course, dateOfBirth, email, fatherName, fullName, gender, imageUrl, payment, paymentImg, phone, qualification, rollNo, status }),
      headers: {
        "Content-Type": "application/json"
      }
    });

    dataToEdit = await dataToEdit.json();

    if (dataToEdit.success) {
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
  else if(paymentImg== "not-done"){
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
      // setImageee(data.secure_url);

      // Convert the image to base64
      const base64Image = await getBase64Image(data.secure_url);
      console.log("Base64 image:", base64Image);

      // Update the form data with the base64 representation of the image
      if(data.secure_url){

        setPaymentImg(base64Image);
        setImageee(base64Image);

      }
      // setPayment("done")
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













console.log(imageee);
console.log("Image Url ka baap hon----->", paymentImg)

  return (
    <div id="payment" 
    // style={{ backgroundImage: 'url("/images/paymentBg5.avif")', backgroundSize: 'cover', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', minHeight: '100vh' }}
    >


{/* Background Image */}
<NextImage src={img} alt="image here" className="absolute top-0 left-0 w-full h-full object-cover z-0" width={600} height={400} />

      {/* <h1 style={{color: "blue", fontSize: "30px", fontWeight: "bolder", marginLeft: "50px", }}>Payment Verify</h1> */}

      <div
    style={{ boxShadow: "0px -5px 1px 12px rgba(0, 0, 0, 0.1)" }}
    className="items-center justify-between mt-0 w-screen bg-[#248ba5] lg:h-16 md:h-16 mx:h-16 lg:text-4xl md:text-4xl mx:text-4xl text-white flex items-center justify-center text-2xl xs:text-1xl text-[20px] font-bold h-12 relative z-10"
  >
    <p className="mx-auto">
      Payment Verify Form
    </p>
  </div>

      <div className="space-y-6 mx-auto w-[400px] xs:w-[100%] md:bg-white mx:bg-white lg:bg-white xl:bg-white sm:bg-white bg-none border border-black-1500 relative z-10" style={styles.container}>
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
              value={rollNumber}
              onChange={(event)=>{
                // setRollNumber(event.target.value)
                console.log(event.target.value)
                  setRollNumber(event.target.value)

                }}
            />
          </div>
          <div style={{ marginTop: "5px" }}>
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>Name</p>
            <AntInputComponent
              placeholder={"Enter Name"}
              style={styles.inputs}
              value={fullName}
            />
          </div>
          <div>
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>Course</p>
            <AntInputComponent
              placeholder={"Enter Course"}
              style={styles.inputs}
              value={course}
            />
          </div>
          <div>
            <p style={{ fontSize: "15px", marginLeft: "20px" }}>Batch</p>

            <AntInputComponent
              placeholder={"Enter Batch"}
              style={styles.inputs}
              value={batch}
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
          /> {!paymentImg ||  paymentImg === "Not-Done" ? (
            <h1> Upload Here</h1>
          ) : (
            <NextImage
            alt="image"
              // cloudName="dbcpfhk6n"
              src={paymentImg}
              // style={{ width: "100%", height: "100%" }}
              width={600} height={400}
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
        
        {/* <Button style={{ backgroundColor: "#248ba5", fontSize: "20px", fontWeight: 500,
        color: "white", textAlign: "center", width:"300px", justifyContent :"center",height: "40px", margin: "0 auto", marginTop: "20px", borderRadius: "50px"
         }}
         onClick={updateUser(idForUser)}
         >Submit</Button> */}

         <button onClick={() => updateUser(idForUser)}>Submit</button>

         

         {/* {notification && <Notification message={notification.message} success={notification.success} />} */}

      </div>
    </div>
  );
}