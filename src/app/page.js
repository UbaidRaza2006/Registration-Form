'use client'


import style from "../app/globals.css"
import { useContext, useEffect, useRef, useState } from "react";
import InputComponent from "../components/InputComponent";
import SelectComponent from "../components/SelectComponent";
import { batchOptions, courseOptions } from '../utils';
// import IdCardModal from '../components/IdCardComponent';
import { usePassword } from '../context';
import Navbar from '../components/Navbar';
import { Button } from '@mui/material';
import { useRouter } from "next/navigation";
import Image from "next/image";
import IdCardModal from "../components/IdCardComponent";
import { Bounce, toast } from "react-toastify";
import dotenv from 'dotenv'
import ImageUpload from "../components/Abc";
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Flex, Input, message, Upload } from 'antd';
import Link from "next/link";
import NotifyBox from "../components/NotifyBox";

dotenv.config()



export default function MainPage() {


    const [allCourses, setAllCourses] = useState([])

    const initialFormData = {
        fullName: '',
        fatherName: '',
        email: '',
        course: '', // Set course based on allCourses,
        batch: null,
        payment: 'Not-Done',
        paymentImg: 'Not-Done',
        status: "Un-Verified",
        otherStatus: 'Pending',
        city: '',
        cnic: '',
        phone: '',
        dateOfBirth: '',
        gender: 'Male',
        qualification: '',
        address: '',
        imageUrl: ''
    }
    // const [imageLoading, setImageLoading] = useState(false)
    const [registering, setRegistering] = useState(false)
    const [resData, setResData] = useState(null)
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(null);
    const [formData, setFormData] = useState(initialFormData)
    const [isButtonClicked, setButtonClicked] = useState(false)
    const [isButtonClicked1, setButtonClicked1] = useState(false)
    const [emailState, setEmailState] = useState(false)
    const inputRef = useRef(null);
    const router = useRouter()
    const nameRegex = /^[A-Za-z][a-z]*(?: [A-Za-z][a-z]*)*$/;
    const { allowAdmission, setAllowAdmission } = usePassword();

    const [admin, setAdmin] = useState(null);
    const [message, setMessage] = useState("");
    const [isFormDisabled, setIsFormDisabled] = useState(false);
    const [currentUser, setCurrentUser] = useState(null)


    const [src, setSrc] = useState(null); // For previewing the selected image before cropping
    const [crop, setCrop] = useState({ aspect: 1.6 }); // Set the aspect ratio to the ID card size
    const [completedCrop, setCompletedCrop] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    // const [loading1, setLoading1] = useState(false);
    // const [imageUrl, setImageUrl] = useState();
    // const   handleChange = (info) => {
    //   if (info.file.status === 'uploading') {
    //     setLoading1(true);
    //     return;
    //   }
    //   if (info.file.status === 'done') {
    //     // Get this url from response in real world.
    //     getBase64(info.file.originFileObj, (url) => {
    //       setLoading1(false);
    //       setImageUrl(url);
    //     });
    //   }
    // };
    // const uploadButton = (
    //   <button
    //     style={{
    //       border: 0,
    //       background: 'none',
    //     }}
    //     type="button"
    //   >
    //     {loading1 ? <LoadingOutlined /> : <PlusOutlined />}
    //     <div
    //       style={{
    //         marginTop: 8,
    //       }}
    //     >
    //       Upload
    //     </div>
    //   </button>
    // );




    // // Handle image selection and cropping
    // const handleImageUpload = async (e) => {
    //     setImageLoading(true);

    //     const file = e.target.files[0];

    //     // Preview the image locally for cropping
    //     const localImageUrl = URL.createObjectURL(file);
    //     setSrc(localImageUrl);

    //     // Once the cropping is done, upload it to Cloudinary
    //     if (completedCrop) {
    //         const croppedImageBlob = await getCroppedImageBlob(localImageUrl, completedCrop);
    //         const formData = new FormData();
    //         formData.append('file', croppedImageBlob);
    //         formData.append('upload_preset', 'Rizwan_Tayyab');

    //         const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;

    //         try {
    //             const response = await fetch(
    //                 `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    //                 {
    //                     method: 'POST',
    //                     body: formData,
    //                 }
    //             );
    //             const data = await response.json();

    //             console.log("Data.response from Cloudinary:", data.secure_url);

    //             // Set the image URL received from Cloudinary
    //             if (data.secure_url) {
    //                 setImage(data.secure_url); // Replace local preview with the Cloudinary URL once upload completes
    //                 setFormData(prevFormData => ({
    //                     ...prevFormData,
    //                     imageUrl: data.secure_url,
    //                 }));
    //                 toast.success("Image added", {
    //                     position: "top-right",
    //                     autoClose: 5000,
    //                     hideProgressBar: false,
    //                     closeOnClick: true,
    //                     pauseOnHover: true,
    //                     draggable: true,
    //                     progress: undefined,
    //                     theme: "light",
    //                     transition: Bounce,
    //                 });
    //             }

    //             setImageLoading(false);

    //         } catch (error) {
    //             setImageLoading(false);
    //             console.error('Error uploading image to Cloudinary:', error);
    //             toast.error(error, {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //                 transition: Bounce,
    //             });
    //         }
    //     }
    // };

    // // Function to crop the image
    // const getCroppedImageBlob = (imageUrl, crop) => {
    //     const image = new Image();
    //     image.src = imageUrl;

    //     return new Promise((resolve) => {
    //         image.onload = () => {
    //             const canvas = document.createElement('canvas');
    //             const scaleX = image.naturalWidth / image.width;
    //             const scaleY = image.naturalHeight / image.height;

    //             canvas.width = crop.width;
    //             canvas.height = crop.height;
    //             const ctx = canvas.getContext('2d');

    //             ctx.drawImage(
    //                 image,
    //                 crop.x * scaleX,
    //                 crop.y * scaleY,
    //                 crop.width * scaleX,
    //                 crop.height * scaleY,
    //                 0,
    //                 0,
    //                 crop.width,
    //                 crop.height
    //             );

    //             canvas.toBlob(blob => {
    //                 resolve(blob); // Return the cropped image blob
    //             }, 'image/jpeg');
    //         };
    //     });
    // };

    // const handleImageUpload = async (e) => {
    //     setImageLoading(true);
    
    //     const file = e.target.files[0];
    
    //     // Preview the image locally before uploading
    //     const localImageUrl = URL.createObjectURL(file);
    //     setImage(localImageUrl); // This will immediately show the image in the UI
    
    //     // Now proceed with the Cloudinary upload
    //     const formData = new FormData();
    //     formData.append('file', file);
    //     formData.append('upload_preset', 'Rizwan_Tayyab');
    
    //     const cloud = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
        
    //     try {
    //         const response = await fetch(
    //             `https://api.cloudinary.com/v1_1/${cloud}/image/upload`,
    //             {
    //                 method: 'POST',
    //                 body: formData,
    //             }
    //         );
    //         const data = await response.json();
    
    //         console.log("Data.response from Cloudinary:", data.secure_url);
    
    //         // Set the image URL received from Cloudinary
    //         if (data.secure_url) {
    //             setImage(data.secure_url); // Replace local preview with the Cloudinary URL once upload completes
    //         }
    
    //         // Update the form data with the Cloudinary image URL
    //         if (data.secure_url) {
    //             setFormData(prevFormData => ({
    //                 ...prevFormData,
    //                 imageUrl: data.secure_url,
    //             }));
    //             toast.success("Image Added", {
    //                 position: "top-right",
    //                 autoClose: 5000,
    //                 hideProgressBar: false,
    //                 closeOnClick: true,
    //                 pauseOnHover: true,
    //                 draggable: true,
    //                 progress: undefined,
    //                 theme: "light",
    //                 transition: Bounce,
    //               })
    //         }
    
    //         setImageLoading(false);
    
    //     } catch (error) {
    //         setImageLoading(false);
    //         console.error('Error uploading image to Cloudinary:', error);
    //         toast.error(error, {
    //             position: "top-right",
    //             autoClose: 5000,
    //             hideProgressBar: false,
    //             closeOnClick: true,
    //             pauseOnHover: true,
    //             draggable: true,
    //             progress: undefined,
    //             theme: "light",
    //             transition: Bounce,
    //         });
    //     }
    // };
    

    // // Function to convert an image URL to base64

    // const getBase64Image = async (imageUrl) => {
    //     // Check if window is defined (i.e., we're in the browser environment)
    //     if (typeof window !== 'undefined') {
    //         try {
    //             const response = await fetch(imageUrl);
    //             const blob = await response.blob();
    //             return new Promise((resolve, reject) => {
    //                 const reader = new FileReader();
    //                 reader.onload = () => resolve(reader.result);
    //                 reader.onerror = reject;
    //                 reader.readAsDataURL(blob);
    //             });
    //         } catch (error) {
    //             console.error('Error fetching image for base64 conversion:', error);
    //             return null;
    //         }
    //     } else {
    //         // Handle the case where window is not defined (e.g., in a server-side context)
    //         console.warn('getBase64Image function is being executed in a non-browser context.');
    //         return null;
    //     }
    // };

    const handleImageUpload = async (e) => {
        setImageLoading(true);
    
        const file = e.target.files[0];
    
        // Preview the image locally before uploading
        const localImageUrl = URL.createObjectURL(file);
        setImage(localImageUrl); // This will immediately show the image in the UI
    
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
    
            console.log("Data.response from Cloudinary:", data.secure_url);
    
            // Set the image URL received from Cloudinary
            if (data.secure_url) {
                setImage(data.secure_url); // Replace local preview with the Cloudinary URL once upload completes
            }
    
            // Update the form data with the Cloudinary image URL
            if (data.secure_url) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    imageUrl: data.secure_url,
                }));
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
            }
    
            setImageLoading(false);
    
        } catch (error) {
            setImageLoading(false);
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


    const triggerFileInput = () => {
        document.getElementById('file-upload').click();
    };







    // cnic and phone
    const formatPhoneNumber = (input) => {
        const formattedNumber = input.replace(/\D/g, '').replace(/(\d{4})(\d{7})/, '$1-$2');
        return formattedNumber;
    };

    const handleChange2 = (event) => {
        const inputValue = event.target.value

        if (inputValue.length <= 12) {
            const formattedPhone = formatPhoneNumber(inputValue);


            setFormData({
                ...formData,
                phone: formattedPhone
            });
        }
    }


    const formatCnicNumber = (input) => {
        // Your formatting logic here (e.g., adding hyphens)
        // This is just a basic example, you may need to adjust it based on your requirements
        const formattedCnic = input.replace(/\D/g, '').replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
        return formattedCnic;
    };

    const handleChange1 = (event) => {
        const inputValue = event.target.value

        if (inputValue.length <= 15) {
            const formattedCnic = formatCnicNumber(inputValue);


            setFormData({
                ...formData,
                cnic: formattedCnic
            });
        }
    }


    // Register button Functions


    async function handleRegister() {
        if (formData.email.includes('@') && formData.email.includes('.com') && !formData.email.includes(' ')) {

            if (formData.cnic.length === 15) {

                if (formData.phone.length === 12) {

                    let formattedBatch = Number(formData.batch).toString().replace(/^0+/, '');

                    if (formattedBatch && formattedBatch >= 1) {

                        if (formattedBatch.includes('.')) {
                            formattedBatch = Math.floor(parseFloat(formattedBatch));
                        }

                        if (formData.dateOfBirth) {

                            const formattedAddress = formData.address.trim().replace(/\s+/g, ' ');
                            const formattedQualification = formData.qualification.trim().replace(/\s+/g, ' ');
                            const formattedCity = formData.city.trim().replace(/\s+/g, ' ');
                            const formattedFullName = formData.fullName.trim().replace(/\s+/g, ' ');
                            const formattedFatherName = formData.fatherName.trim().replace(/\s+/g, ' ');

                            if (formattedFullName.length > 0) {

                                if (formattedFatherName.length > 0) {

                                    if (formattedCity.length > 0) {

                                        if (formattedAddress.length > 0) {

                                            if (formattedQualification.length > 0) {

                                                if (formData.imageUrl) {

                                                    const updatedFormData = {
                                                        ...formData,
                                                        fullName: formattedFullName,
                                                        fatherName: formattedFatherName,
                                                        batch: formattedBatch,
                                                        city: formattedCity,
                                                        qualification: formattedQualification,
                                                        address: formattedAddress,
                                                    };

                                                    setRegistering(true)
                                                    setFormData(updatedFormData);
                                                    await finalRegistration(updatedFormData);

                                                } else {
                                                    toast.error('Provide Your Image!', {
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
                                            } else {
                                                const qualificationInput = document.getElementById('qualificationInput');
                                                if (qualificationInput) {
                                                    toast.error('Provide Your Qualification!', {
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
                                            }
                                        } else {
                                            const addressInput = document.getElementById('addressInput');
                                            if (addressInput) {
                                                toast.error('Fill the Address field!', {
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
                                        }
                                    } else {
                                        const cityInput = document.getElementById('cityInput');
                                        if (cityInput) {
                                            toast.error('Give Your City Name!', {
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
                                    }
                                } else {
                                    const fnameInput = document.getElementById('fnameInput');
                                    if (fnameInput) {
                                        toast.error('Give your Father Name in the field!', {
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
                                }
                            } else {
                                const nameInput = document.getElementById('nameInput');
                                if (nameInput) {
                                    toast.error('Give your Name in the field!', {
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
                            }
                        } else {
                            const dateInput = document.getElementById('dateInput');
                            if (dateInput) {
                                toast.error('Select D/O/B!', {
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
                        }
                    } else {
                        toast.error('There might be some Error, Try again!', {
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
                } else {
                    const phoneInput = document.getElementById('phoneInput');
                    if (phoneInput) {
                        toast.error('Enter complete Phone #!', {
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
                }
            } else {
                const cnicInput = document.getElementById('cnicInput');
                if (cnicInput) {
                    toast.error('Enter complete Cnic!', {
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
            }
        } else {
            const emailInput = document.getElementById('emailInput');
            if (emailInput) {
                toast.error('Enter a valid Email address!', {
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
                emailInput.focus();
                return;
            }
        }
    }

    const finalRegistration = async (formData) => {
        console.log("formData-->", formData);
        const res = await registerUser(formData);

        console.log("res-->", res);

        if (res.success) {
            toast.success('Registered Successfully!', {
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
            setShowModal(true);
            setCurrentUser(res.user);
            setFormData(initialFormData)
            setImage(null)

        } else if (res.success === false) {
            toast.error(res.message, {
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
        setRegistering(false)
        setButtonClicked(true);

        setTimeout(() => {
            setButtonClicked(false);
        }, 300);
    }

    const registerUser = async (formData) => {
        try {
            const response = await fetch("/api/registartion", {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            return data;

        } catch (e) {
            console.log('error', e);
            toast.error('There is an Internal Error!', {
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
    }


    // Register button Functions........



    useEffect(() => {
        gettingAdmin();
        // toast("This is awesome!")
    }, []);

    useEffect(() => {
        if (admin)
            gettingCourses();
        // toast("This is awesome!")
    }, [admin]);



    useEffect(() => {
        settingCourseAndBatch()
    }, [allCourses]);

    const settingCourseAndBatch = () => {

        if (allCourses.length > 0) {
            const courseUpdate = allCourses.filter((course) => course.admission === 'Opened')
            setFormData(prevFormData => ({
                ...prevFormData,
                course: courseUpdate[0].course,
                batch: courseUpdate[0].batch// Or use whatever field you need from allCourses
            }));
        }

    }


    const gettingAdmin = async () => {
        console.log("gettingAdmin")
        try {
            const res = await fetch("/api/admins", {
                method: "GET",
                cache: "no-cache", // Set cache control policy to 'no-cache'
            });
            const data = await res.json();
            console.log(data)
            if (data.success) {
                setAdmin(data.data[0])
                setAllowAdmission(data.data[0].admissions)
                setMessage(data.data[0].textAdmission)
            }
            else {
                toast.error('Ntetwork Error, Try again later!', {
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
            console.error("Error fetching users:", error);
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

    const gettingCourses = async () => {
        console.log("gettingCourses");
        try {
            const res = await fetch("/api/courses", {
                method: "GET",
                cache: "no-cache", // Set cache control policy to 'no-cache'
            });
            const data = await res.json();
            console.log("gettingCourses ka data-->", data)

            if (data.success) {
                const courses = Array.isArray(data.data) ? data.data : [data.data]; // Use data.data directly
                console.log("allCourses-->", courses)
                setAllCourses(courses);
            } else {
                setAllCourses([]);
                console.log(data)
                toast.error('Error in Courses!', {
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
            console.error("Error fetching courses:", error);
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


    // console.log(formData);
    useEffect(() => {
        setIsFormDisabled(allowAdmission !== "Open");
    }, [allowAdmission]);

    function isAdmission() {
        console.log("allowAdmission-->", allowAdmission);
        setIsFormDisabled(allowAdmission !== "Open");
    }

    function isFormValid() {
        return formData && formData.fullName && formData.fullName.trim() !== '' && formData.fatherName && formData.fatherName.trim() !== '' && formData.email && formData.email.trim() !== '' && formData.cnic && formData.cnic.trim() !== '' && formData.phone && formData.phone.trim() !== '' && formData.city && formData.city.trim() !== '' && formData.address && formData.address.trim() !== '' && formData.qualification && formData.qualification.trim() !== '' ? true : false
    }
    const closeModal = () => {

        setShowModal(false);
    };

    const text = "Admissions are Closed!"


    return (
        <div className="mr-0 mb-0 ml-0 pb-8 relative bg-[#c1ebee]">  {/* Parent div with background color */}

            <div className="bg-[#c1ebee] pt-4">  {/* Additional div to apply padding-top */}
                <Navbar />
            </div>

            <div style={{ boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.3)' }} className="w-full bg-gradient-to-r from-[#0e303e] to-[#18819b] text-white lg:font-bold md:font-bold mx:font-bold lg:h-8 md:h-8 mx:h-8 flex items-center justify-center text-1xl h-6">
                Service-Education-Registration
            </div>


            <div style={{ boxShadow: '1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)' }} className=" mt-8 mx-auto h-[280px] lg:h-[350px] md:h-[350px] sm:h-[350px] w-[95%]  lg:w-[60%] md:w-[60%] mx:w-[60%] rounded-xl mb-[30px]"><Image className="h-[280px] lg:h-[350px] md:h-[350px] sm:h-[350px] mx-auto w-full rounded-xl" src="/images/Rizwan.png" alt="course info" width={600} height={400}

            /></div>

            <div className="bg-none flex items-center justify-center rounded-xl space-x-4 mt-4 mb-4">
                <Link href="/download" passHref>
                    <button
                        //   color="inherit"
                        id='button3'
                        // onClick={() => { router.push("/download") }}
                        className='btn h-12 inline md:hidden bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] rounded-md text-md lg:text-lg md:text-lg sm:text-lg w-[160px] lg:w-[200px] md:w-[200px] sm:w-[200px]'
                    //   sx={{ display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline', xl: 'inline' } }}
                    >
                        <p className='font-bold '>Download ID Card</p>
                    </button>
                </Link>
                <Link href="/payment" passHref>
                    <button
                        //   color="inherit"
                        id='button4'
                        // onClick={() => { router.push("/payment") }}
                        className='btn h-12 inline md:hidden  bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] text-white rounded-md text-md lg:text-lg md:text-lg sm:text-lg w-[160px] lg:w-[200px] md:w-[200px] sm:w-[200px]'
                    //   sx={{ display: { xs: 'none', sm: 'none', md: 'inline', lg: 'inline', xl: 'inline' } }}
                    >
                        <p className='font-bold'>Payment Verify</p>
                    </button>
                </Link>

            </div>




            {isFormDisabled && message ? (

                <div className="flex justify-center items-center mb-6">
                    <div className="text-center text-[#004d66] text-3xl py-2">
                        {message}
                    </div>
                </div>

            ) : null}




            {admin ? (
                
                <div
                    style={{
                        boxShadow: '1px 5px 5px 8px rgba(0, 0, 0, 0.2)',
                        // opacity: isFormDisabled ? 0.5 : 1,
                        display: isFormDisabled ? "none" : "",
                        // pointerEvents: isFormDisabled ? 'none' : 'auto',
                    }}
                    className={`mx-auto w-[95%] lg:w-3/5 md:w-4/5 sm:w-4/5 p-8 bg-[#eefcfd] shadow-2xl rounded-xl relative ${isFormDisabled ? 'opacity-50' : ''
                        }`}
                >
                    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-8 mb-4 mt-4">

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Full Name</p>
                            <Input
                                type="text"
                                id="nameInput"
                                placeholder="Full Name"
                                label="Full Name"
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300"
                                value={formData.fullName}
                                onChange={(event) => {
                                    const formattedName = event.target.value
                                        .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                                        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining
                                    setFormData({ ...formData, fullName: formattedName });
                                }}
                            />
                        </div>

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Father Name</p>
                            <Input
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300"
                                type="text"
                                id="fnameInput"
                                placeholder="Father Name"
                                label="Full Name"
                                value={formData.fatherName}
                                onChange={(event) => {
                                    const formattedFatherName = event.target.value
                                        .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                                        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining
                                    setFormData({ ...formData, fatherName: formattedFatherName });
                                }}
                            />
                        </div>

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Email</p>
                            <Input
                                type="email"
                                id="emailInput"
                                placeholder="Email"
                                label="Email"
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300"
                                value={formData.email}
                                onChange={(event) => setFormData({ ...formData, email: event.target.value })}
                            />
                        </div>

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Cnic/B-form</p>
                            <Input
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300"
                                type="tel"
                                id="cnicInput"
                                maxLength="15"
                                inputMode="numeric"
                                placeholder="00000-0000000-0"
                                value={formData.cnic}
                                onChange={handleChange1}
                            />
                        </div>

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Phone No</p>
                            <Input
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300"
                                type="tel"
                                id="phoneInput"
                                maxLength="12"
                                inputMode="numeric"
                                placeholder="0000-0000000"
                                value={formData.phone}
                                onChange={handleChange2}
                            />
                        </div>

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">City</p>
                            <Input
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300"
                                type="text"
                                id="cityInput"
                                placeholder="City"
                                value={formData.city}
                                onChange={(event) => {
                                    const formattedCity = event.target.value
                                        .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                                        .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining
                                    setFormData({ ...formData, city: formattedCity });
                                }}
                            />
                        </div>

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Date Of Birth</p>
                            <Input
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300 color-black"
                                type="date"
                                id="dateInput"
                                placeholder="Date Of Birth"
                                value={formData.dateOfBirth}
                                onChange={(event) => setFormData({ ...formData, dateOfBirth: event.target.value })}
                            />
                        </div>

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Qualification</p>
                            <Input
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300"
                                type="text"
                                id="qualificationInput"
                                placeholder="Qualification"
                                value={formData.qualification}
                                onChange={(event) => {
                                    const formattedValue = event.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                    setFormData({ ...formData, qualification: formattedValue });
                                }}
                            />
                        </div>



                    </div>



                    <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-2 gap-7 mb-12">

                        <div className="mt-[-7px]">
                            <label className="block font-medium text-gray-600 ml-3 mb-0">Select Gender</label>
                            <select
                                value={formData.gender}
                                id="genderInput"
                                onChange={(event) => setFormData({ ...formData, gender: event.target.value })}
                                className="border-2 border-gray-300 focus:border-blue-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-inherit rounded-md"
                                style={{
                                    color: formData.gender ? 'black' : 'gray', // Black for selected, gray for placeholder
                                }}
                            >


                                {/* Actual options */}
                                <option key="Male" value="Male" style={{ color: 'black' }}>
                                    Male
                                </option>
                                <option key="Female" value="Female" style={{ color: 'black' }}>
                                    Female
                                </option>
                            </select>
                        </div>



                        <div className="lg:mt-[-7px] md:mt-[-7px]">
                            <label className="block font-medium text-gray-600 ml-3 mb-0 ">Select Course</label>
                            <select
                                value={formData.course}
                                id="courseInput"
                                onChange={(event) => {
                                    const selectedCourse = allCourses.find((course) => course.course === event.target.value);
                                    setFormData({
                                        ...formData,
                                        course: event.target.value,
                                        batch: selectedCourse?.batch, // Set batch if selectedCourse exists
                                    });
                                }}
                                className="border-2 border-gray-300 focus:border-blue-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-inherit rounded-md"
                                style={{
                                    color: formData.course ? 'black' : 'gray', // Black for selected, gray for placeholder
                                }}
                            >


                                {/* Dynamically generating the options from the allCourses array */}
                                {allCourses
                                    .filter((course) => course.admission === 'Opened')
                                    .map((course) => (
                                        <option key={course.course} value={course.course} style={{ color: 'black' }}>
                                            {course.course}
                                        </option>
                                    ))}
                            </select>
                        </div>




                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">

                        <div className="relative h-14">
                            <p className="pt-0 pr-2 pb-0 pl-2 absolute mt-[-22px] mr-0 mb-0 ml-2 font-medium text-gray-600 bg-inherit">Address</p>
                            <Input
                                className="h-10 placeholder-gray-400 w-full pt-4 pr-4 pb-4 pl-4 mr-0 ml-0 text-base block bg-inherit border-2 border-gray-300"
                                type="text"
                                id="addressInput"
                                placeholder="Address"
                                value={formData.address}
                                onChange={(event) => {
                                    const formattedValue = event.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
                                    setFormData({ ...formData, address: formattedValue });
                                }}
                            />
                        </div>

                    </div>

                    <div
                        className="image-upload-container mt-4 bg-[#eefcfd] shadow-md shadow-gray-400"
                        onClick={triggerFileInput}
                    >
                        {!image ? (
                            <label className="text-gray-600 cursor-pointer flex items-center justify-center">
                                Upload <PlusOutlined className="ml-2" />
                            </label>
                        ) : (
                            <img src={image} alt="Uploaded" className="uploaded-image" />
                        )}
                        <input
                            id="file-upload"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={handleImageUpload}
                        />
                        <style jsx>{`
        .image-upload-container {
          width: 130px;
          height: 150px;
          border: 2px solid #cfcece;
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
          object-fit: cover;
        }
      `}</style>
                    </div>

                    {registering ? (
                        <button
                            className="btn mt-4 text-white text-lg bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] h-12 rounded-lg mx-auto block px-12 tracking-wider flex items-center justify-center border-none"
                            disabled={isFormDisabled}
                        >
                            <div className="flex items-center space-x-3">
                                <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse"></div>
                                <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                                <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                                <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                            </div>
                        </button>
                    ) : (
                        <button
                            className="btn mt-4 text-white text-lg bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] h-12 rounded-lg mx-auto block px-12 tracking-wider border-none"
                            onClick={handleRegister}
                            disabled={isFormDisabled}
                        >
                            Register
                        </button>
                    )}
                </div>
            ) : (
                <div className="h-[250px] w-[100%] flex items-center space-x-3 justify-center mt-[-70px]">
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse"></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDelay: '0.3s' }}></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDelay: '0.6s' }}></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDelay: '0.9s' }}></div>
                </div>
            )}


{
    admin?  
    isFormDisabled? (

        <NotifyBox/>
    ):(
        null
    ): null
}


            <div>
                <IdCardModal isOpen={showModal} onClose={closeModal} user={currentUser} />
            </div>


            {/* <ImageUpload/> */}



            {/* 
            <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        // beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
            </Upload>
      <Upload
        name="avatar"
        listType="picture-circle"
        className="avatar-uploader"
        showUploadList={false}
        action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
        // beforeUpload={beforeUpload}
        onChange={handleChange}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="avatar"
            style={{
              width: '100%',
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload> */}

        </div>

    )
}


