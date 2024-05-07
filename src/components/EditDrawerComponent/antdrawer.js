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


// const cloudinary = require('cloudinary').v2;
// import { v2 as cloudinary } from "cloudinary";

if (typeof window === 'undefined') {
    const { v2: cloudinary } = require('cloudinary');
cloudinary.config({
    cloud_name: "dbcpfhk6n",
    api_key: "588376267435949",
    api_secret:"ax1LWxiCFgecD5A2ve7Rfm4kBoA"
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
  const [batch, setBatch] = useState("");
  const [status, setStatus] = useState("");
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

  const [studentImage,setStudentImage]= useState("")
  const [paymentImage,setPaymentImage]= useState("")

  const [verified, setVerified] = useState(true); // Initial state is verified
  const [buttonText, setButtonText] = useState("Pending");
  const [buttonColor, setButtonColor] = useState("Blue");

  
  // useEffect(() => {
  //   getUserData(userData._id)
  // }, [userData]);


  const getUserData = async (userId) => {
    console.log("idForUser-->", userId);
    let data = await fetch(`/api/students/${userId}`)
    data = await data.json()
    console.log(data);
    if (data.success) {
      let result = data.result
      // setViewData(result)
      // console.log(viewData);
      setFullName(result.fullName);
      setFatherName(result.fatherName);
      setEmail(result.email);
      setCourse(result.course);
      setBatch(result.batch);
      setStatus(result.status);
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
      if(result.status === "Verified"){
        setButtonColor("green")
        setButtonText("Verified")
      }
      else{
        setButtonColor("red")
        setButtonText("Un-verified")
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

    
    const formattedAddress = address.trim().replace(/\s+/g, ' ');
    const formattedQualification = qualification.trim().replace(/\s+/g, ' ');
    const formattedCity = city.trim().replace(/\s+/g, ' ');
    const formattedCourse = course.trim().replace(/\s+/g, ' ');
    const formattedFullName = fullName.trim().replace(/\s+/g, ' ');
    const formattedFatherName = fatherName.trim().replace(/\s+/g, ' ');
    const formattedGender = gender.trim().replace(/\s+/g, ' ');
    const formattedBatch = batch.trim().replace(/\s+/g, ' ');





    let data = await fetch(`/api/students/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ _id: userId, address:formattedAddress, batch:formattedBatch, city:formattedCity, cnic, course:formattedCourse, dateOfBirth, email, fatherName:formattedFatherName, fullName:formattedFullName, gender:formattedGender, imageUrl, payment,paymentImg, phone, qualification:formattedQualification, rollNo, status }), headers: {
        "Content-Type": "application/json"
      }
    })
    data = await data.json()
    // console.log("info-->",data);
    if (data.success) {
      alert("User has been Updated!..")
      // setOpen(false);
    }
    else {
      console.log(data);
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
        // setStudentImage(data.secure_url);

        // Convert the image to base64
        const base64Image = await getBase64Image(data.secure_url);
        console.log("Base64 image:", base64Image);

        // Update the form data with the base64 representation of the image

            if(data.secure_url){

              setImageUrl(base64Image)
              setStudentImage(base64Image)

            }

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


// Image Function for payment


const handlePaymentImage = async (e) => {
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
      // setStudentImage(data.secure_url);

      // Convert the image to base64
      const base64Image = await getBase64PaymentImage(data.secure_url);
      console.log("Base64 image:", base64Image);

      // Update the form data with the base64 representation of the image
      if(data.secure_url){
        
        setPaymentImg(base64Image)
        setPaymentImage(base64Image)
        setPayment("done")

      }

  } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
  }
};

// Function to convert an image URL to base64
const getBase64PaymentImage = async (imageUrl) => {
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




        <div style={{ boxShadow: '1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)' }} className="mx-auto w-full  flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">



            <div className='display-inline flex felx-col'>

            <div className="image-uploader" onClick={() => document.getElementById('student-image-upload').click()}>
  <input id="student-image-upload" type="file" onChange={handleStudentImage} style={{ display: 'none' }} />
  {studentImage ? (
    <div className="uploaded-image" style={{ backgroundImage: `url(${studentImage})` }}></div>
  ) : (
    <p className="upload-text">Upload Image</p>
  )}

  <style jsx>{`
    .image-uploader {
      width: 160px;
      height: 140px;
      background-color: #f2f2f2;
      border: 2px solid #ccc; /* Solid border */
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
      cursor: pointer;
      transition: all 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Box shadow */
    }
    .image-uploader:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); /* Increased box shadow on hover */
    }
    .upload-text {
      margin: 0;
      color: #555;
      font-size: 14px;
    }
    .uploaded-image {
      width: 100%;
      height: 100%;
      background-size: cover; /* Ensure image covers the full area without stretching */
      background-position: center; /* Center the image */
    }
    input[type='file'] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0;
      cursor: pointer;
    }
  `}</style>
</div>


    <div className="image-uploader" onClick={() => document.getElementById('payment-image-upload').click()}>
      <input id="payment-image-upload" type="file"  onChange={handlePaymentImage} style={{ display: 'none' }} />
      {/* {image ? (
        <img src={image} alt="ID Card" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '5px' }} /> */}
      {/* ) : (
        <p className="upload-text">Upload</p>
      )} */}

{paymentImage && paymentImage !== "Not-Done" && <NextImage  src={paymentImage} style={{ width: '320px', height: '140px' }}               width={600} height={400}
/>}

       <style jsx>{`
    .image-uploader {
      width: 320px;
      height: 140px; /* Reduced height */
      background-color: #f2f2f2;
      border: 2px dashed #ccc;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      position: relative;
    }
    .upload-text {
      margin: 0;
      color: #555;
    }
    input[type='file'] {
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





          <div className="w-full mr-0 mb-0 ml-0 space-y-4 lg:space-y-1 md:space-y-1 mx:space-y-1
                lg:grid grid-cols-2 gap-6 md:grid grid-cols-2 gap-6 mx:grid grid-cols-2 gap-6
                 ">

            <InputComponent
              type="text"
              placeholder="Full Name"
              label="Full Name"
              value={fullName}
              onChange={(event) => {

                const newName = event.target.value;

                // Capitalize the first letter of each word
                const formattedName = newName.replace(/\b\w/g, (char) => char.toUpperCase());

                // Update the state with the formatted name
                setFullName(formattedName);
              }}
            />
            <InputComponent
              type="text"
              placeholder="Father Name"
              label="Father Name"

              value={fatherName}
              onChange={(event) => {
                const newFatherName = event.target.value;

                // Capitalize the first letter of each word
                const formattedFatherName = newFatherName.replace(/\b\w/g, (char) => char.toUpperCase());

                // Update the state with the formatted name
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
              placeholder="City"
              label="City"
              value={city}
              onChange={(event) => {
                const newCity = event.target.value;

                // Capitalize the first letter of each word
                const formattedCity = newCity.replace(/\b\w/g, (char) => char.toUpperCase());

                // Update the state with the formatted name
                setCity(formattedCity)
              }}
            />
            <InputComponent
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
              options={courseOptions}
              value={course}
              onChange={(event) => {
                setCourse(event.target.value)
              }}
            />

            <InputComponent
              label="Batch"
              type={"number"}
              // options={batchOptions}
              value={batch}
              onChange={(event) => {
                setBatch(event.target.value)
              }}
            />


            <div style={{ marginTop: "20px" }}>

              <InputComponent
                type="text"
                placeholder="Qualification"
                label="Edit Qualification"
                value={qualification}
                onChange={(event) => {
                  setQualification(event.target.value)
                }}
              /></div>
            <div style={{ marginTop: "20px" }}>
              <InputComponent
                type="text"
                placeholder="Address"
                label="Edit Address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value)
                }}
              />
            </div>


            <button
      style={{ backgroundColor: buttonColor, color: 'white', padding: '10px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
      onClick={handleButtonClick}
    >
      {buttonText}
    </button>



          </div>






        </div>


        {/* <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name" 
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: 'Please enter url',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: 'Please select an owner',
                  },
                ]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the dateTime',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%',
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form> */}
      </Drawer>
    </>
  );
};
export default EditDrawerApp;