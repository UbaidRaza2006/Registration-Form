"use client";

// import AntInputComponent from "@/components/AntInput";
// // import AntUploadComponent from "@/components/AntUpload";
// import ImageUploadComponent from "@/components/AntUpload/ubaid2";
// import { Button } from "antd";
// import Image2UploadComponent from "@/components/AntUpload/ubaid2";
import React, { useEffect, useState } from "react";
import AntInputComponent from "../../components/AntInput";
import { EditOutlined, PlusOutlined, ButtonOutlined, HomeOutlined } from '@ant-design/icons';
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
import Link from "next/link";
import Crop from "../../components/Crop";

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
    //   backgroundColor: "white",
      // border: "2px solid black",
      // borderRadius: "20px",
      display: "flex",
      flexDirection: "column",
      margin: "0 auto",
    //   width: "400px",
      height: "550px",
      marginTop: "35px",
      boxShadow: "1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)",
      // boxShadow: '5px 0px 1px 12px rgba(0, 0, 0, 0.1)',
      maxWidth: "600px",

      

      // marginLeft: "200px"
    },
    inputs: {
      // borderRadius: "4px", // Add a slight border-radius for a more polished look
    boxShadow: "0 2px 3px rgba(156, 163, 175, 0.4)",
      // color: "green",
      // width: "500px",
      // height: "140px",
      //   border: "2px solid black",
      
        //backgroundColor: "	#C0C0C0",
        border: "1px solid #aaa",
          backgroundColor: "inherit",
          width: "270px",
          height: "40px",
         //  borderRadius: "10px",
          fontSize: "15px",
       
    },
    upload: {
      backgroundColor: "green",
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
    setPaymentImg("")
    setImageUrl("")
    setCheck(false)
    }
  }, [rollNumber])
  


  const getUserData = async (rollNumber) => {
  console.log("rollNoForUser-->", rollNumber);
  if(rollNumber){

    setRegistering(true)


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

        setRegistering(false)


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

    setRegistering(false)


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




const triggerFileInput = () => {
  document.getElementById('file-upload').click();
};

const handleImageUpload = async (e) => {
  const file = e.target.files[0];

  // Preview the image locally before uploading
  const localImageUrl = URL.createObjectURL(file);
  setImageee(localImageUrl); // This will immediately show the image in the UI

  // Now proceed with the Cloudinary upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'Rizwan_Tayyab');

  const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
  
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

      // Set the Cloudinary image URL once the upload is successful
      if (data.secure_url) {
          setPaymentImg(data.secure_url);  // Update the payment image with the final Cloudinary URL
          toast.success("Image added", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            transition: Bounce,
          })
          // setImageee(data.secure_url);     // Replace the local preview with the Cloudinary URL
      }
  } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      toast.error(error, {
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

const [loading, setLoading] = useState(true);


useEffect(() => {
  // Simulate page load completion
  const timer = setTimeout(() => {
    setLoading(false);
  }, 300); // Adjust the timeout as needed
  return () => clearTimeout(timer);
}, []);





const isFormValid = () => rollNo.length === 5;




console.log(imageee);
console.log("Image Url ka baap hon----->", paymentImg)

  return (

<div id="payment" className="bg-[#eefcfd] h-[700px]">
{loading ? (
        <div className="h-[120px] w-[100%] flex items-center space-x-3 justify-center pt-[310px] mt-[-10px]">
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
                </div>
      ) : ( <>
    
    
    {/* Background Image */}
    {/* <NextImage src={img} alt="image here" className="absolute top-0 left-0 w-full h-[650px] object-cover z-0" width={600} height={600} /> */}
    
          {/* <h1 style={{color: "blue", fontSize: "30px", fontWeight: "bolder", marginLeft: "50px", }}>Payment Verify</h1> */}
    
          <div className="flex items-center justify-between bg-gradient-to-r from-[#0e303e] to-[#18819b] text-white h-[60px] py-2 px-4">
      {/* Enlarged Circular Home Icon Button using Ant Design */}
      <Link href="/" passHref>
        <Button
          type="default" // Default type for Ant Design button with custom border
          shape="circle"
          size="large"  // Increased size of the button
          icon={<HomeOutlined style={{ fontSize: '20px' }} />}  // Increased icon size
          className="flex items-center justify-center border-2 border-[#d4f6f9]" // Add border similar to the page background
          style={{
            backgroundColor: "transparent", // Match navbar background
            color: "white", // Icon color
          }}
        />
      </Link>
    
    
      <div className="text-center flex-grow text-3xl md:text-4xl font-bold block lg:hidden">
        Payment Form
      </div>
      <div className="text-center flex-grow text-3xl md:text-4xl font-bold hidden lg:block">
        Payment Verify Form
      </div>
    </div>
    
          <div className="space-y-6 mx-auto w-[320px] xs:w-[100%] bg-[#f8f8f8] border border-black-1500 relative z-10 rounded-md" style={styles.container}>
            <div
              // style={{
              //   margin: "0 auto", 
              //   marginTop: "10px",
              //   //  backgroundColor: "white",
              // }}
              className="space-y-6 ml-6 mt-6"
            >
              <div>
                {/* <p style={{ fontSize: "15px", marginLeft: "20px" }}>Roll No</p> */}
                <AntInputComponent
                          maxLength={5} // Restrict input to 5 characters
                 type="tel" 
                className="shadow-md shadow-gray-400"
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
              <div >
                {/* <p style={{ fontSize: "15px", marginLeft: "20px" }}>Name</p> */}
                <AntInputComponent
                disabled
                className="shadow-md shadow-gray-400 custom-disabled-input"
                  placeholder={"Enter Name"}
                  style={styles.inputs}
                  value={fullName}
                />
              </div>
              <div>
                {/* <p style={{ fontSize: "15px", marginLeft: "20px" }}>Course</p> */}
                <AntInputComponent
                disabled
                className="shadow-md shadow-gray-400 custom-disabled-input"
                  placeholder={"Enter Course"}
                  style={styles.inputs}
                  value={course}
                />
              </div>
              <div>
                {/* <p style={{ fontSize: "15px", marginLeft: "20px" }}>Batch</p> */}
    
                <AntInputComponent
                disabled
                className="shadow-md shadow-gray-400 custom-disabled-input"
                  placeholder={"Enter Batch"}
                  style={styles.inputs}
                  value={batch}
                />
              </div>
    
              {/* <div>
                <p style={{ fontSize: "15px", marginLeft: "20px" }}>Upload</p>
                <ImageUploadComponent />
              </div> */}
    </div>
      
    
            <div className="image-upload-container bg-[#f8f8f8] shadow-md shadow-gray-400 mx-auto" onClick={triggerFileInput}>
            {(!paymentImg || paymentImg === "Not-Done") && (!imageee || imageee === "Not-Done") ? (
    <label className="text-gray-600 text-1xl" htmlFor="file-upload">Payment Image <PlusOutlined/> </label>
) : (
  <img 
  src={imageee || (paymentImg !== "Not-Done" ? paymentImg : '')} 
  alt="Uploaded image" 
  className="uploaded-image" 
/>

)}

        <input
        id="file-upload"
        type="file"
        accept=".jpg, .jpeg, .png, .gif, .bmp, .tiff, .svg, .webp, .ico, .heic, .heif" 
        style={{ display: 'none' }}
        onChange={handleImageUpload}
        />
        <style jsx>{`
        .image-upload-container {
        width: 270px;
        height: 180px;
        border: 1px solid #aaa;
        border-radius: 12px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        }
        .uploaded-image {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        object-fit: cover; /* This line is important */
        }
        `}</style>
        </div>
    
    
            
            {/* <Button style={{ backgroundColor: "#248ba5", fontSize: "20px", fontWeight: 500,
            color: "white", textAlign: "center", width:"300px", justifyContent :"center",height: "40px", margin: "0 auto", marginTop: "20px", borderRadius: "50px"
             }}
             onClick={updateUser(idForUser)}
             >Submit</Button> */}
    
    {registering?(<button className="btn mt-4 mb-8 disabled:opacity-50 disabled:bg-gray-400 mt-0 bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white disabled:text-white hover:bg-[#0d4a5b] active:bg-[#092e3e] shadow-xl h-4 rounded-2xl mx-auto block px-8 tracking-wider border-none"  
                // onClick={handleRegister}
            // disabled={!isFormValid()}
        ><div className="flex items-center space-x-3 mx-auto">
        <div className="loader-dot w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
        <div className="loader-dot w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
        <div className="loader-dot w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
        <div className="loader-dot w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
        </div>
        </button>):(
    
             <button className="btn mt-4 mb-8 disabled:opacity-50 disabled:bg-gray-400 mt-0 bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white disabled:text-white hover:bg-[#0d4a5b] active:bg-[#092e3e] shadow-xl h-4 rounded-2xl mx-auto block px-8 tracking-wider border-none"
            //  disabled={!isFormValid()}
             onClick={() => updateUser(idForUser)}
        >SUBMIT
        </button>
        )}
    

    {/* <Crop/> */}
             
    
             {/* {notification && <Notification message={notification.message} success={notification.success} />} */}
    
          </div>
        </> ) }

        </div>


    // Some new functionalities are going to come as sir has said, today is 4 September, this line is to be removed whenver it is seen
   
  );
}