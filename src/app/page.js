
'use client'

// import style from "./globals.css"
// import { RegistartionformControls, firebaseConfig, firebaseStorageURL } from "@/utils";
// import { useState } from 'react';
import style from "../app/globals.css"
import { message, Upload } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { initializeApp } from 'firebase/app'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useContext, useRef, useState } from "react";
import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import { registerUser } from "../services/register";
import { RegistartionformControls, batchOptions, courseOptions, firebaseConfig, firebaseStorageURL } from '../utils';
import ImageUpload from '../components/UploadComponent';
import IdCardModal from '../components/IdCardComponent';
import { GlobalContext } from '../context';
import Navbar from '../components/Navbar';
import { Button } from '@mui/material';
import { Router } from "next/router";
import { useRouter } from "next/navigation";

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


// const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
//   };

const app = initializeApp(firebaseConfig);
const storage = getStorage(app, firebaseStorageURL)


// const getBase64 = (img, callback) => {
//     const reader = new FileReader();
//     reader.addEventListener('load', () => callback(reader.result));
//     reader.readAsDataURL(img);
//   };
  
//   const beforeUpload = (file) => {
//     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
//     if (!isJpgOrPng) {
//       message.error('You can only upload JPG/PNG file!');
//     }
//     const isLt2M = file.size / 1024 / 1024 < 2;
//     if (!isLt2M) {
//       message.error('Image must be smaller than 2MB!');
//     }
//     return isJpgOrPng && isLt2M;
//   };
  const createUniqueFileName = (getFile) => {
    const timeStamp = Date.now();

    const randomStringValue = Math.random().toString(36).substring(2, 16)
    return `${getFile.name}-${timeStamp}-${randomStringValue}`

}

async function helperForUploadingImageToFirebase(file) {

    const getFileName = createUniqueFileName(file);

    const storageRefrence = ref(storage, `ecommerce/${getFileName}`);
    const uploadImage = uploadBytesResumable(storageRefrence, file)



    return new Promise((resolve, reject) => {
        uploadImage.on('state_changed', (snapshot) => { }, (error) => {
            console.log(error);
            reject(error)
        }, () => {
            getDownloadURL(uploadImage.snapshot.ref).then(downloadUrl => resolve(downloadUrl)).catch(error => reject(error))
        }
        )

    })


}
const initialFormData = {
    fullName: '',
    fatherName: '',
    email: '',
    course:`${courseOptions[0].label}`,
    batch:`${batchOptions[0]}`,
    payment:'not-done',
    status:"un-verified",
    city: '',
    cnic: '',
    phone: '',
    dateOfBirth: '',
    gender: 'male',
    qualification: '',
    address: '',
    imageUrl: ''
}




export default function RegisterUser() {

    const [resData, setResData] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState(initialFormData)
    const [isButtonClicked,setButtonClicked]= useState(false)
    const [isButtonClicked1,setButtonClicked1]= useState(false)
    const [emailState,setEmailState]= useState(false)
    const inputRef = useRef(null);
    const router = useRouter()
    const nameRegex = /^[A-Za-z][a-z]*(?: [A-Za-z][a-z]*)*$/;
    // const emailRegex = /^\S+@\S+(\.\S+)?$/;

    const {user,setUser}=useContext(GlobalContext)


    // const beforeUpload = (file) => {
    //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    //     if (!isJpgOrPng) {
    //       message.error('You can only upload JPG/PNG file!');
    //     }
    //     const isLt2M = file.size / 1024 / 1024 < 2;
    //     if (!isLt2M) {
    //       message.error('Image must be smaller than 2MB!');
    //     }
    //     return isJpgOrPng && isLt2M;
    //   };

    //   const uploadButton = (
    //     <button style={{ border: 0, background: 'none' }} type="button">
    //       {loading ? <LoadingOutlined /> : <PlusOutlined />}
    //       <div style={{ marginTop: 8 }}>Upload</div>
    //     </button>
    //   );

    // async function handleChange(info) {

    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //       }
    //       if (info.file.status === 'done') {
    //         // Get this url from response in the real world.
    //         getBase64(info.file.originFileObj, (url) => {
    //           setLoading(false);
    //           setImageUrl(url);
    //         });

    //         console.log(info.file);

    //         const extractImageUrl = await helperForUploadingImageToFirebase(info.file)
    
    //         console.log(extractImageUrl);
    
    //         if (extractImageUrl) {
    //             setFormData({
    //                 ...formData,
    //                 imageUrl: extractImageUrl
    //             })
    
    //         }

    //       }

        
        
    // }

    // async function handleChange(info) {
    //     if (info.file.status === 'uploading') {
    //         setLoading(true);
    //         return;
    //     }


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
            setImage(data.secure_url);
    
            // Convert the image to base64
            const base64Image = await getBase64Image(data.secure_url);
            console.log("Base64 image:", base64Image);
    
            // Update the form data with the base64 representation of the image
            setFormData(prevFormData => ({
                ...prevFormData,
                imageUrl: base64Image,
            }));
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




    // const handleImageUpload = async (e) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('upload_preset', 'Rizwan_Tayyab');
        
    //     console.log("Me file hon->>>",file)
    //     try {
    //       const response = await fetch(
    //         'https://api.cloudinary.com/v1_1/dbcpfhk6n/image/upload',
    //         {
    //           method: 'POST',
    //           body: formData,
    //         }
    //       );
    //       const data = await response.json();
    //       console.log("Data.response hon->>>",data.secure_url)
    //       setImage(data.secure_url);
        
    //     //   console.log("setImage hon->>>", setImage)
    //     setFormData((prevFormData) => ({
    //         ...prevFormData,
    //         imageUrl: data.secure_url,
    //       }));
    //     //   if (data) {
    //     //     setFormData({
    //     //         ...formData,
    //     //         imageUrl: data.secure_url
    //     //     })

    //     // }
    //     } catch (error) {
    //       console.error('Error uploading image to Cloudinary:', error);
    //     }
    
        
    //             };













    // async function handleImage(event) {

    //     const selectedImage = event.target.files[0];
    //     if (selectedImage) {
    //       const reader = new FileReader();
    //       reader.onload = () => {
    //         setImage(reader.result);
    //       };
    //       reader.readAsDataURL(selectedImage);
    //     }
    


    //     console.log(event.target.files);

    //     const extractImageUrl = await helperForUploadingImageToFirebase(event.target.files[0])

    //     console.log(extractImageUrl);

    //     if (extractImageUrl) {
    //         // setImageUploadUrl(extractImageUrl)
    //         setFormData({
    //             ...formData,
    //             imageUrl: extractImageUrl
    //         })

    //     }
    // }





    
    //     if (info.file.status === 'done') {
    //         // Get this url from response in the real world.
    //         getBase64(info.file.originFileObj, (url) => {
    //             setLoading(false);
    //             setImageUrl(url);
    //         });
    
    //         console.log(info.file);
    
    //         try {
    //             const extractImageUrl = await helperForUploadingImageToFirebase(info.file);
    //             console.log("extractImageUrl:", extractImageUrl);
    
    //             if (extractImageUrl) {
    //                 setFormData({
    //                     ...formData,
    //                     imageUrl: extractImageUrl
    //                 });
    //             }
    //         } catch (error) {
    //             console.error("Error extracting image URL:", error);
    //         }
    //     }
    // }

// cnic and phone
const formatPhoneNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedNumber = input.replace(/\D/g, '').replace(/(\d{4})(\d{7})/, '$1-$2');
    return formattedNumber;
  };

  const handleChange2 = (event) => {
    const inputValue=event.target.value

    if (inputValue.length <= 12) {
        const formattedPhone = formatPhoneNumber(inputValue);


    setFormData({
        ...formData,
        phone: formattedPhone
    });}
}


const formatCnicNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedCnic = input.replace(/\D/g, '').replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    return formattedCnic;
  };

  const handleChange1 = (event) => {
    const inputValue=event.target.value

    if (inputValue.length <= 15) {
        const formattedCnic = formatCnicNumber(inputValue);


    setFormData({
        ...formData,
        cnic: formattedCnic
    });}
}

  

// cnic and phone
    async function handleRegister() {

        // if (image) {
        //     try {
        //         await handleImageUpload(event); // Upload the image
        //     } catch (error) {
        //         console.error('Error uploading image:', error);
        //         // Handle error if necessary
        //     }
        // }


        if (formData.email.includes('@') && formData.email.includes('.com') && !formData.email.includes(' ')){


            
            
            
            console.log("formData-->",formData);
            const res = await registerUser(formData);
            // setResData(res.user)
            console.log("res-->",res);

    //         if(res.message=== "Student from this Cnic/B-form is already registered!"){

    //             const cnicInput = document.getElementById('cnicInput');
    //   if (cnicInput) {
    //     cnicInput.focus();
    //     alert('Student from this Cnic/B-form is already registered!');
    //     return;
    //   }

    //         }

            if(res.success){

        localStorage.setItem("user", JSON.stringify(res?.user));


        const userLocal = localStorage.getItem("user");

// Check if userLocalString is not null or undefined before parsing
 // Set the user in the global state
 setUser(res?.user);
 console.log('user-->', user);

// Now, userLocal will either contain the parsed user object or be null if parsing fails
// setUser(userLocal);
console.log(userLocal);
    
       
        

     
            setShowModal(true);
        }

       
      
         

        setButtonClicked(true);

    // Set a timeout to reset the button state after a certain duration
    setTimeout(() => {
      setButtonClicked(false);
    }, 300);}
    else{


        const emailInput = document.getElementById('emailInput');
      if (emailInput) {
        emailInput.focus();
        alert('Please enter a valid email address.');
        return;
      }
      // Optionally, you can show an error message or handle the validation failure in another way
      console.log("id error");
          
    }
    }


    // console.log(formData);



    function isFormValid(){
        return formData && formData.fullName && formData.fullName.trim() !== '' && formData.fatherName && formData.fatherName.trim() !== '' && formData.email && formData.email.trim() !== '' && formData.cnic && formData.cnic.trim() !== '' && formData.phone && formData.phone.trim() !== '' && formData.city && formData.city.trim() !== '' && formData.address && formData.address.trim() !== '' && formData.qualification && formData.qualification.trim() !== '' ?true: false
     }
const closeModal = () => {
    
    setShowModal(false);
  };

    return (
        <div className="mr-0 mb-0 ml-0 relative">

            {/* <div style={{boxShadow:'5px 0px 1px 12px rgba(0, 0, 0, 0.1)'}} className="items-center justify-between mt-8 w-full bg-[#248ba5] lg:h-16 md:h-16 mx:h-16 lg:text-4xl md:text-4xl mx:text-4xl text-white flex items-center justify-center text-2xl xs:text-1xl text-[20px] font-bold h-12"><p className="lg:pl-[30%] md:pl-[12%] mx:pl-[20%]  ml-4">Course Registration Form</p>

                <button style={{boxShadow:'1px 5px 5px 0px rgba(0.2, 0.2, 0.2, 0.2)'}}  className="inline-flex w-[20%] h-10 lg:h-12 md:h-12 mx:h-12 lg:text-lg md:text-lg mx:text-1xl mr-2 text-xs items-center justify-center bg-[#248ba5] ml-2 text-white border border-white-500 uppercase tracking-wide rounded-md shadow-md hover:bg-[#155261] transition duration-300"
                >Payment Verify</button>
            </div> */}

            <Navbar/>

            <div style={{boxShadow:'1px 1px 1px 4px rgba(0.1, 0.1, 0, 0.1)'}}  className="w-full bg-white text-[#248ba5] lg:font-bold md:font-bold mx:font-bold lg:h-8 md:h-8 mx:h-8 flex items-center justify-center text-1xl  h-6">Service-Education-Registration
            </div>

            <div style={{boxShadow:'1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)'}} className=" mt-8 mx-auto h-[300px] w-full  lg:w-[60%] md:w-[60%] mx:w-[60%] rounded-xl mb-[30px]"><img className="h-[300px] mx-auto w-full rounded-xl"
                src="/images/Rizwan.png"

            /></div>

            <div className="bg-none flex items-center justify-center rounded-xl space-x-0 mt-4 mb-4">
            <Button color="inherit"
          id='button1'
          onClick={()=>{router.push("/download")}}
          className='h-12 w-[14%] md:w-[20%] border border-white-900   justify-between items-center text-center'
          sx={{ display: { xs: 'inline', sm: 'inline', md: 'none', lg: 'none', xl: 'none' } }}
        >
          <p className='font-bold '>Download ID Card</p>
          </Button>
        

        <Button
          color="inherit"    
          id='button2'
          onClick={()=>{router.push("/payment")}}
          className='h-12 w-[14%] md:w-[20%] border border-white-900 bg-[#248ba5]  justify-between items-center  text-center'
          sx={{ display: { xs: 'inline', sm: 'inline', md: 'none', lg: 'none', xl: 'none' } }}
        >
          <p className='font-bold '>Payment Verify</p>
        </Button>

            </div>







            <div style={{boxShadow:'1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)'}} className="mx-auto w-full lg:w-[60%] md:w-[60%] mx:w-[60%] flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
                <div className="w-full mr-0 mb-0 ml-0 space-y-4 lg:space-y-1 md:space-y-1 mx:space-y-1
                lg:grid grid-cols-2 gap-6 md:grid grid-cols-2 gap-6 mx:grid grid-cols-2 gap-6
                 ">

                    <InputComponent
                        type="text"
                        placeholder="Full Name"
                        label="Full Name"
                        value={formData.fullName}
                        onChange={(event) => {

                            const newName = event.target.value;

                            // Capitalize the first letter of each word
                            const formattedName = newName.replace(/\b\w/g, (char) => char.toUpperCase());
                    
                            // Update the state with the formatted name
                            setFormData({
                                ...formData,
                                fullName: formattedName
                            });
                        }} />
                    <InputComponent
                        type="text"
                        placeholder="Father Name"
                        label="Father Name"

                        value={formData.fatherName}
                        onChange={(event) => {
                            const newFatherName = event.target.value;

                            // Capitalize the first letter of each word
                            const formattedFatherName = newFatherName.replace(/\b\w/g, (char) => char.toUpperCase());
                    
                            // Update the state with the formatted name
                            setFormData({
                                ...formData,
                                fatherName: formattedFatherName
                            });
                        }} />
                   <InputComponent
   id="emailInput"
   type="text"
    placeholder="Email"
    label="Email"
    value={formData.email}
    onChange={(event) => {
      
        setFormData({
            ...formData,
            email: event.target.value
        });
    

    }}
/>

                    <InputComponent
   id="cnicInput"
                        type="text"
                        maxLength="15"
                        inputMode="numeric"
                        placeholder="00000-0000000-0"
                        label="Cnic/B-form"

                        value={formData.cnic}
                        onChange={(event) => {

                           

                            handleChange1(event)

                            

                            
                        }} />
                    <InputComponent
                        type="text"
                        id="phoneInput"
                        maxLength="12"
                        inputMode="numeric"
                        placeholder="0000-0000000"
                        label="Phone"
                        value={formData.phone}
                        onChange={(event) => {

                            handleChange2(event)
                            
                            
                        }} />
                    <InputComponent
                        type="text"
                        placeholder="City"
                        label="City"
                        value={formData.city}
                        onChange={(event) => {
                            const newCity = event.target.value;

                            // Capitalize the first letter of each word
                            const formattedCity = newCity.replace(/\b\w/g, (char) => char.toUpperCase());
                    
                            // Update the state with the formatted name
                            setFormData({
                                ...formData,
                                city: formattedCity
                            });
                        }} />
                    <InputComponent
                        type="date"
                        placeholder="Date Of Birth"
                        label="Date Of Birth"

                        value={formData.dateOfBirth}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                dateOfBirth: event.target.value
                            });
                        }} />

</div>
                        <div className='mt-[5px] w-full mr-0 mb-0 ml-0 space-y-8 lg:space-y-3 md:space-y-3 mx:space-y-3
                lg:grid grid-cols-2 gap-6 md:grid grid-cols-2 gap-6 mx:grid grid-cols-2 gap-6'>
                    <SelectComponent
                        label="Select Gender"
                        options={[
                            { id: "male", label: "Male" },
                            { id: "female", label: "Female" },
                          ]}
                        value={formData.gender}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                gender: event.target.value,
                            });
                        }}
                    />




              

                    <SelectComponent
                        label="Select Course"
                        options={courseOptions}
                        value={formData.course}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                course: event.target.value,
                            });
                        }}
                    />



                </div>


                <div className="w-full mt-[35px] lg:mt-[15px] mx:mt-[15px] md:mt-[15px] mr-0 mb-0 ml-0 space-y-6">
                    <InputComponent
                        type="text"
                        placeholder="Qualification"
                        label="Qualification"
                        value={formData.qualification}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                qualification: event.target.value
                            });
                        }} />
                    <InputComponent
                        type="text"
                        placeholder="Address"
                        label="Address"
                        value={formData.address}
                        onChange={(event) => {
                            setFormData({
                                ...formData,
                                address: event.target.value
                            });
                        }} />

                </div>

                
{/* <ImageUpload 
// beforeUpload={beforeUpload}
//         onChange={handleChange}
        /> */}

                {/* <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        beforeUpload={beforeUpload}
        onChange={handleImage}
      > */}
        {/* {imageUploadUrl ? <img src={imageUploadUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
      {/* </Upload> */}


                {/* <input className="lg:w-[20%] xl md:w-[20%]" style={{ border: '2px solid gray', borderRadius: '8px', height: '100px', }}
                    accept="image/*"
                    onChange={handleImage}
                    max="1000000"
                    type="file"

                />  */}


<div className="image-uploader" onClick={() => document.getElementById('image-upload').click()}>
      <input id="image-upload" type="file"  onChange={handleImageUpload} style={{ display: 'none' }} />
      {/* {image ? (
        <img src={image} alt="ID Card" style={{ maxWidth: '100%', maxHeight: '100%', borderRadius: '5px' }} /> */}
      {/* ) : (
        <p className="upload-text">Upload</p>
      )} */}

{image && <Image  cloudName="dbcpfhk6n" publicId={image} style={{ width: '100px', height: '150px' }} />}

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

{/* Checking Github */}

    <button
        onClick={handleRegister}
        className={`disabled:opacity-50 inline-flex w-[40%] lg:w-[25%] md:w-[25%] mx:w-[25%] h-[55px] mt-[20px] items-center justify-center mb-[-10px] mx-auto bg-${isButtonClicked ? '[#155261]' : '[#248ba5]'} text-white font-semibold uppercase tracking-wide rounded-md transition duration-300 ease-in-out`}
        disabled={!isFormValid()}
        >Register</button>

                {/* </div>



                


                
                {/* <button
                onClick={()=>{setButtonClicked1(true) ;
                    setTimeout(() => {
                    setButtonClicked1(false);
                  }, 300);}}
                    className={`disabled:opacity-50 inline-flex w-[40%] lg:w-[25%] md:w-[25%] mx:w-[25%] h-[55px] mt-[20px] items-center justify-center mb-[-10px] mx-auto bg-${isButtonClicked1 ? '[#155261]' : '[#248ba5]'} text-white font-semibold uppercase tracking-wide rounded-md transition duration-300 ease-in-out`}
                >Payment Verify</button> */}
            </div>

    <div>
      <IdCardModal isOpen={showModal} onClose={closeModal} />
    </div>


        

        </div>

    )
}


