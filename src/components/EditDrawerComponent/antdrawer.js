"use client"
import React, { useEffect, useState } from 'react';
// import 'antd/dist/antd.css';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import InputComponent from '../InputComponent';
import { batchOptions, courseOptions } from '../../utils';
import SelectComponent from '../SelectComponent';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
import NextImage from "next/image"; // Alias one of the imports

import { Image } from 'cloudinary-react';
import { Bounce, toast } from 'react-toastify';
import dotenv from 'dotenv'

  dotenv.config()


// const cloudinary = require('cloudinary').v2;
// import { v2 as cloudinary } from "cloudinary";

if (typeof window === 'undefined') {
  const { v2: cloudinary } = require('cloudinary');
  cloudinary.config({
    cloud_name: "dbcpfhk6n",
    api_key: "588376267435949",
    api_secret: "ax1LWxiCFgecD5A2ve7Rfm4kBoA"
  });
}


const { Option } = Select;
const EditDrawerApp = ({ userData }) => {

  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState({})

  const [fullName, setFullName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [batch, setBatch] = useState(null);
  const [status, setStatus] = useState("");
  const [otherStatus, setOtherStatus] = useState("");
  const [city, setCity] = useState("");
  const [cnic, setCnic] = useState("");
  const [phone, setPhone] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentImg, setPaymentImg] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [qualification, setQualification] = useState("");
  const [address, setAddress] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [studentImage, setStudentImage] = useState("")
  const [paymentImage, setPaymentImage] = useState("")

  const [verified, setVerified] = useState(true); // Initial state is verified
  const [buttonText, setButtonText] = useState("Pending");
  const [buttonColor, setButtonColor] = useState("Blue");

  const [otherButtonText, setOtherButtonText] = useState("Pending");
  const [otherButtonColor, setOtherButtonColor] = useState("Blue");


  useEffect(() => {
    getUserData(userData._id)
  }, [userData]);


  const getUserData = async (userId) => {
    console.log("idForUser-->", userId);
    let data = await fetch(`/api/students/${userId}`)
    data = await data.json()
    console.log(data);
    if (data.success) {
      let user = data.result

      const result = {
        createdAt:user.createdAt,
        rollNo:user.rollNo,
        batch:user.batch,
        _id:user._id,
        fullName: decodeURIComponent(user.fullName),
        fatherName: decodeURIComponent(user.fatherName),
        email: decodeURIComponent(user.email),
        course: decodeURIComponent(user.course),
        payment: decodeURIComponent(user.payment),
        paymentImg: decodeURIComponent(user.paymentImg),
        status: decodeURIComponent(user.status),
        otherStatus: decodeURIComponent(user.otherStatus),
        city: decodeURIComponent(user.city),
        cnic: decodeURIComponent(user.cnic),
        phone: decodeURIComponent(user.phone),
        dateOfBirth: decodeURIComponent(user.dateOfBirth),
        gender: decodeURIComponent(user.gender),
        qualification: decodeURIComponent(user.qualification),
        address: decodeURIComponent(user.address),
        imageUrl: decodeURIComponent(user.imageUrl) // Decoding the image URL
      };

      // const verified = decodedUser.filter(user => user.status === "verified");



      // setViewData(result)
      // console.log(viewData);
      setFullName(result.fullName);
      setFatherName(result.fatherName);
      setEmail(result.email);
      setCourse(result.course);
      setBatch(result.batch);
      setStatus(result.status);
      setOtherStatus(result.otherStatus);
      setCity(result.city);
      setCnic(result.cnic);
      setPhone(result.phone);
      setDateOfBirth(result.dateOfBirth);
      setGender(result.gender);
      setQualification(result.qualification);
      setAddress(result.address);
      setImageUrl(result.imageUrl);
      setRollNo(result.rollNo);
      setPayment(result.payment);
      setPaymentImg(result.paymentImg);


      setStudentImage(result.imageUrl);
      setPaymentImage(result.paymentImg);
      // useEffect(() => {

      //   if (userData.status == "verified") {
      //     setButtonColor("green");
      //     setButtonText("Verified");
      //   } else {
      //     setButtonColor("red");
      //     setButtonText("Un-verified");
      //   }
      // }, []);
      if (result.status === "Verified") {
        setButtonColor("green")
        setButtonText("Verified")
      }
      else {
        setButtonColor("red")
        setButtonText("Un-verified")
      }


      if (result.otherStatus === "Pending") {
        setOtherButtonColor("blue")
        setOtherButtonText("Pending")
      }
      else if(result.otherStatus === "Enrolled"){
        setOtherButtonColor("yellow")
        setOtherButtonText("Enrolled")
      }
      else if(result.otherStatus === "Completed"){
        setOtherButtonColor("green")
        setOtherButtonText("Completed")
      }


    }


  }


  const updateUser = async (userId) => {

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid userId format');
      console.log(userId)
      return NextResponse.json({
        success: false,
        error: 'Invalid userId format',
      });

    }

    if (email.includes('@') && email.includes('.com') && !email.includes(' ')) {

      if (cnic.length === 15) {

        if (phone.length === 12) {

          //  let formattedBatch= batch.replace(/^0+/, '');
          let formattedBatch = Number(batch).toString().replace(/^0+/, '');



          if (formattedBatch && formattedBatch >= 1) {

            if (formattedBatch.includes('.')) {
              formattedBatch = Math.floor(parseFloat(formattedBatch));
            }

            if (dateOfBirth) {




              const formattedAddress = address.trim().replace(/\s+/g, ' ');
              const formattedQualification = qualification.trim().replace(/\s+/g, ' ');
              const formattedCity = city.trim().replace(/\s+/g, ' ');
              const formattedCourse = course.trim().replace(/\s+/g, ' ');
              const formattedFullName = fullName.trim().replace(/\s+/g, ' ');
              const formattedFatherName = fatherName.trim().replace(/\s+/g, ' ');
              const formattedGender = gender.trim().replace(/\s+/g, ' ');


              if (formattedFullName.length > 0) {

                if (formattedFatherName.length > 0) {

                  if (formattedCity.length > 0) {

                    if (formattedAddress.length > 0) {

                      if (formattedQualification.length > 0) {












                        let data = await fetch(`/api/students/${userId}`, {
                          method: "PUT",
                          body: JSON.stringify({ _id: userId, address: formattedAddress, batch: formattedBatch, city: formattedCity, cnic, course: formattedCourse, dateOfBirth, email, fatherName: formattedFatherName, fullName: formattedFullName, gender: formattedGender, imageUrl, payment, paymentImg, phone, qualification: formattedQualification, rollNo, status, otherStatus }), headers: {
                            "Content-Type": "application/json"
                          }
                        })
                        data = await data.json()



                        // main yaha se he
                        if (data.success) {
                          toast.success('User Updated!', {
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
                          // setOpen(false);
                        }
                        else {
                          console.log(data);
                          toast.error(data.error, {
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
                        // main yahann tk he


                      }
                      else {


                        const qualificationInput = document.getElementById('qualificationInput');
                        if (qualificationInput) {
                          toast.error('Fill Qualification!', {
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
                            qualificationInput.focus();
                          return;
                        }
                        // Optionally, you can show an error message or handle the validation failure in another way
                        console.log("id error");

                      }
                    }
                    else {


                      const addressInput = document.getElementById('addressInput');
                      if (addressInput) {
                        toast.error('Fill the Address!', {
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
                          addressInput.focus();
                          return;
                      }
                      // Optionally, you can show an error message or handle the validation failure in another way
                      console.log("id error");

                    }
                  }
                  else {


                    const cityInput = document.getElementById('cityInput');
                    if (cityInput) {
                      toast.error('Fill the City!', {
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
                      cityInput.focus();
                      return;
                    }
                    // Optionally, you can show an error message or handle the validation failure in another way
                    console.log("id error");

                  }
                }
                else {


                  const fnameInput = document.getElementById('fnameInput');
                  if (fnameInput) {
                    toast.error('Fill the Father Name!', {
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
                    fnameInput.focus();
                    
                    return;
                  }
                  // Optionally, you can show an error message or handle the validation failure in another way
                  console.log("id error");

                }
              }
              else {


                const nameInput = document.getElementById('nameInput');
                if (nameInput) {
                  toast.error('Fill the Name!', {
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
                  nameInput.focus();
                  
                  return;
                }
                // Optionally, you can show an error message or handle the validation failure in another way
                console.log("id error");

              }
            }
            else {


              const dateInput = document.getElementById('dateInput');
              if (dateInput) {
                toast.error('Select D/O/B', {
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
                dateInput.focus();
                
                return;
              }
              // Optionally, you can show an error message or handle the validation failure in another way
              console.log("id error");

            }
          }
          else {


            const batchInput = document.getElementById('batchInput');
            if (batchInput) {
              toast.error('The Batch should be atleast 1!', {
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
              batchInput.focus();
              return;
            }
            // Optionally, you can show an error message or handle the validation failure in another way
            console.log("id error");

          }
        }
        else {


          const phoneInput = document.getElementById('phoneInput');
          if (phoneInput) {
            toast.error('Enter Complete Phone # !', {
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
            phoneInput.focus();
            return;
          }
          // Optionally, you can show an error message or handle the validation failure in another way
          console.log("id error");

        }
      }
      else {


        const cnicInput = document.getElementById('cnicInput');
        if (cnicInput) {
          toast.error('Enter Complete Cnic', {
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
          cnicInput.focus();
          return;
        }
        // Optionally, you can show an error message or handle the validation failure in another way
        console.log("id error");

      }
    }
    else {


      const emailInput = document.getElementById('emailInput');
      if (emailInput) {
        emailInput.focus();
        toast.error('Enter a Valid Email Address!', {
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
        return;
      }
      // Optionally, you can show an error message or handle the validation failure in another way
      console.log("id error");

    }
  }


  const handleButtonClick = () => {
    // Toggle the verification status and update button text and color accordingly
    setVerified(!verified);
    if (status === "Verified") {
      setStatus("Un-Verified")
      setButtonText('Un-Verified');
      setButtonColor('red');
    } else {
      setStatus("Verified")
      setButtonText('Verified');
      setButtonColor('green');
    }
    // updateUser(userData._id)
  };

  const handleButtonClick1 = () => {
    // Toggle the verification status and update button text and color accordingly
    // setVerified(!verified);
    if (otherStatus === "Pending") {
      setOtherStatus("Enrolled")
      setOtherButtonText('Enrolled');
      setOtherButtonColor('yellow');
    } else if (otherStatus === "Enrolled"){
      setOtherStatus("Completed")
      setOtherButtonText('Completed');
      setOtherButtonColor('green');
    } else if (otherStatus === "Completed"){
      setOtherStatus("Pending")
      setOtherButtonText('Pending');
      setOtherButtonColor('blue');
    }
    // updateUser(userData._id)
  };


  const showDrawer = () => {
    setOpen(true);
    getUserData(userData._id); // Pass the id to getUserData function

    // console.log(id);

  };
  const onClose = () => {
    setOpen(false);
  };

  const formatCnicNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedCnic = input.replace(/\D/g, '').replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    return formattedCnic;
  };

  const formatPhoneNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedNumber = input.replace(/\D/g, '').replace(/(\d{4})(\d{7})/, '$1-$2');
    return formattedNumber;
  };

  // Image Function for Student

  const handleStudentImage = async (e) => {
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

      // // Set the image URL received from Cloudinary
      // // setStudentImage(data.secure_url);

      // // Convert the image to base64
      // const base64Image = await getBase64Image(data.secure_url);
      // console.log("Base64 image:", base64Image);

      // Update the form data with the base64 representation of the image

      if (data.secure_url) {

        setImageUrl(data.secure_url)
        setStudentImage(data.secure_url)

      }

    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  // // Function to convert an image URL to base64
  // const getBase64Image = async (imageUrl) => {
  //   try {
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = reject;
  //       reader.readAsDataURL(blob);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching image for base64 conversion:', error);
  //     return null;
  //   }
  // };


  // Image Function for payment


  const handlePaymentImage = async (e) => {
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
      // setStudentImage(data.secure_url);

      // Convert the image to base64
      // const base64Image = await getBase64PaymentImage(data.secure_url);
      // console.log("Base64 image:", base64Image);

      // Update the form data with the base64 representation of the image
      if (data.secure_url) {

        setPaymentImg(data.secure_url)
        setPaymentImage(data.secure_url)
        setPayment("Done")

      }

    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
    }
  };

  // // Function to convert an image URL to base64
  // const getBase64PaymentImage = async (imageUrl) => {
  //   try {
  //     const response = await fetch(imageUrl);
  //     const blob = await response.blob();
  //     return new Promise((resolve, reject) => {
  //       const reader = new FileReader();
  //       reader.onload = () => resolve(reader.result);
  //       reader.onerror = reject;
  //       reader.readAsDataURL(blob);
  //     });
  //   } catch (error) {
  //     console.error('Error fetching image for base64 conversion:', error);
  //     return null;
  //   }
  // };

  // for user pic
  const triggerFileInput = () => {
    document.getElementById('file-upload').click();
  };

  // for paymentpic
  const triggerFileInput1 = () => {
    document.getElementById('file-upload1').click();
  };


  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
      <Button
        style={{
          border: "none",
          marginBottom: '5px',
          position: 'relative', // Ensure position is set to relative for proper icon positioning
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={showDrawer}
      >
        <EditOutlined
          style={{
            cursor: "pointer",
            fontSize: isHovered ? '20px' : '16px', // Set the desired sizes
            position: 'absolute', // Position the icon absolutely within the button
            top: '50%', // Center the icon vertically
            left: '50%', // Center the icon horizontally
            transform: 'translate(-50%, -50%)', // Center the icon perfectly
          }}
        />
      </Button>

      <Drawer
        style={{}}
        title="Hey Admin!, here you can Edit a Student."
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose} style={{ backgroundColor: 'gray', color: '#fff' }}>CANCEL</Button>
            <Button onClick={() => updateUser(userData._id)} style={{ backgroundColor: 'blue', color: '#fff' }}>SUBMIT</Button>
          </Space>
        }
      >




        {/* <div style={{ boxShadow: '1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)' }} className="mx-auto w-full  flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative"> */}



          <div className='display-inline flex felx-col space-x-8 ml-[7%]'>

          <div className="image-upload-container mb-12 mt-4 bg-[#e0e0e0] shadow-md shadow-gray-400" onClick={triggerFileInput}>
    {!studentImage ? (
    <label className="text-gray-600 text-2xl" htmlFor="file-upload">Upload <PlusOutlined/> </label>
    ) : (
    <img src={studentImage} alt="Uploaded image" className="uploaded-image" />
    )}
    <input
    id="file-upload"
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    onChange={handleStudentImage}
    />
    <style jsx>{`
    .image-upload-container {
    width: 180px;
    height: 220px;
    border: 2px solid #aaa;
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

    <div className="image-upload-container mb-12 mt-4 bg-[#e0e0e0] shadow-md shadow-gray-400" onClick={triggerFileInput1}>
    {!paymentImage || paymentImage == "Not-Done" ? (
    <label className="text-gray-600 text-2xl" htmlFor="file-upload">Upload Payment Image <PlusOutlined/> </label>
    ) : (
    <img src={paymentImage} alt="Uploaded image" className="uploaded-image" />
    )}
    <input
    id="file-upload1"
    type="file"
    accept="image/*"
    style={{ display: 'none' }}
    onChange={handlePaymentImage}
    />
    <style jsx>{`
    .image-upload-container {
    width: 350px;
    height: 220px;
    border: 2px solid #aaa;
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


          

          </div>





          <div className="w-full mr-0 mb-0 ml-0 space-y-4 lg:space-y-1 md:space-y-1 mx:space-y-1
                lg:grid grid-cols-2 gap-6 md:grid grid-cols-2 gap-6 mx:grid grid-cols-2 gap-6
                 ">

            <InputComponent
              type="text"
              id="nameInput"
              placeholder="Full Name"
              label="Full Name"
              value={fullName}
              onChange={(event) => {
                const newFullName = event.target.value;

                // Combine steps for efficiency
                const formattedFullName = newFullName
                  .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                  .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining

                setFullName(formattedFullName)
              }}
            />
            <InputComponent
              type="text"
              id="fnameInput"
              placeholder="Father Name"
              label="Father Name"

              value={fatherName}
              onChange={(event) => {
                const newFatherName = event.target.value;

                // Combine steps for efficiency
                const formattedFatherName = newFatherName
                  .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                  .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining

                setFatherName(formattedFatherName)
              }}
            />
            <InputComponent
              id="emailInput"
              type="text"
              placeholder="Email"
              label="Email"
              value={email}
              onChange={(event) => {

                setEmail(event.target.value)


              }}
            />

            <InputComponent
              id="cnicInput"
              type="text"
              maxLength="15"
              inputMode="numeric"
              placeholder="00000-0000000-0"
              label="Cnic/B-form"

              value={cnic}
              onChange={(event) => {



                const inputValue = event.target.value

                if (inputValue.length <= 15) {
                  const formattedCnic = formatCnicNumber(inputValue);


                  setCnic(formattedCnic)

                }


              }}
            />
            <InputComponent
              type="text"
              id="phoneInput"
              maxLength="12"
              inputMode="numeric"
              placeholder="0000-0000000"
              label="Phone"
              value={phone}
              onChange={(event) => {

                const inputValue = event.target.value

                if (inputValue.length <= 12) {
                  const formattedPhone = formatPhoneNumber(inputValue);


                  setPhone(formattedPhone)
                }
              }}
            />
            <InputComponent
              type="text"
              id="cityInput"
              placeholder="City"
              label="City"
              value={city}
              onChange={(event) => {
                const newCity = event.target.value;

                // Combine steps for efficiency
                const formattedCity = newCity
                  .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                  .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining

                setCity(formattedCity)
              }}
            />
            <InputComponent
              id="dateInput"
              type="date"
              placeholder="Date Of Birth"
              label="D/O/B"

              value={dateOfBirth}
              onChange={(event) => {
                setDateOfBirth(event.target.value)
              }}
            />


            <SelectComponent
              label="Gender"
              id="genderInput"
              options={[
                { id: "male", label: "Male" },
                { id: "female", label: "Female" },
              ]}
              value={gender}
              onChange={(event) => {
                setGender(event.target.value)
              }}
            />






            <SelectComponent
              label="Course"
              id="courseInput"
              options={courseOptions}
              value={course}
              onChange={(event) => {
                setCourse(event.target.value)
              }}
            />


            <div className='flex space-x-4'>
            <div className="relative h-14 mt-3 mb-[-5px]">
            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Roll-No</p>
            <Input
            id="rollNoInput"
            label="rollNo"
            type="text"
                value={rollNo}
                className="h-8 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit"
                onChange={(event) => {
                  setRollNo(event.target.value)
                }}
            />
        </div>


 <div className="relative h-14 mt-3 mb-[-5px]">
            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Batch</p>
            <Input
            id="batchInput"
            label="Batch"
            type="number"
            // options={batchOptions}
            value={batch}
            onChange={(event) => {
              setBatch(event.target.value)
            }}
                className="h-8 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit"
            />
        </div>

</div>


            <div style={{ marginTop: "20px" }}>

              <InputComponent
                id="qualificationInput"
                type="text"
                placeholder="Qualification"
                label="Edit Qualification"
                value={qualification}
                onChange={(event) => {
                  const newValue = event.target.value;

                  // Capitalize the first letter of each word
                  const formattedValue = newValue.replace(/\b\w/g, (char) => char.toUpperCase());
                  setQualification(formattedValue)
                }}
              /></div>
            <div style={{ marginTop: "20px" }}>
              <InputComponent
                id="addressInput"
                type="text"
                placeholder="Address"
                label="Edit Address"
                value={address}
                onChange={(event) => {
                  const newValue = event.target.value;

                  // Capitalize the first letter of each word
                  const formattedValue = newValue.replace(/\b\w/g, (char) => char.toUpperCase());
                  setAddress(formattedValue)
                }}
              />
            </div>


            <button
              style={{ backgroundColor: buttonColor, color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
              onClick={handleButtonClick}
            >
              {buttonText}
            </button>

            <button
              style={{ backgroundColor: otherButtonColor, color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
              onClick={handleButtonClick1}
            >
              {otherButtonText}
            </button>



          </div>






        {/* </div> */}



      </Drawer>
    </>
  );
};
export default EditDrawerApp;