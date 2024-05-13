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
        city: '',
        cnic: '',
        phone: '',
        dateOfBirth: '',
        gender: 'Male',
        qualification: '',
        address: '',
        imageUrl: ''
    }

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
            if (data.secure_url) {
                setImage(data.secure_url);
            }
            // Convert the image to base64
            const base64Image = await getBase64Image(data.secure_url);
            console.log("Base64 image:", base64Image);

            // Update the form data with the base64 representation of the image

            if (data.secure_url) {
                setFormData(prevFormData => ({
                    ...prevFormData,
                    imageUrl: base64Image,
                }));
            }


        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    };

    // Function to convert an image URL to base64
    const getBase64Image = async (imageUrl) => {
        // Check if window is defined (i.e., we're in the browser environment)
        if (typeof window !== 'undefined') {
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
        } else {
            // Handle the case where window is not defined (e.g., in a server-side context)
            console.warn('getBase64Image function is being executed in a non-browser context.');
            return null;
        }
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



    // cnic and phone
    async function handleRegister() {
        if (formData.email.includes('@') && formData.email.includes('.com') && !formData.email.includes(' ')) {

            if (formData.cnic.length === 15) {

                if (formData.phone.length === 12) {

                    //  let formattedBatch= batch.replace(/^0+/, '');
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








                                                    // ye main code hein ayha se

                                                    setFormData(prevFormData => ({
                                                        ...prevFormData,
                                                        fullName: formattedFullName,
                                                        fatherName: formattedFatherName,
                                                        batch: formattedBatch,
                                                        city: formattedCity,
                                                        qualification: formattedQualification,
                                                        address: formattedAddress,
                                                    }));

                                                    finalRegistration()



                                                    // ye main code he yahan tk



                                                }
                                                else {
                                                    console.log(formData.imageUrl)
                                                    alert("Provide Your Image")
                                                }
                                            }
                                            else {


                                                const qualificationInput = document.getElementById('qualificationInput');
                                                if (qualificationInput) {
                                                    console.log(formattedQualification)
                                                    alert('Please fill the Qualification field');
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
                                                console.log(formattedAddress)
                                               alert('Please fill the Address field');
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
                                            console.log(formattedCity)
                                            alert('Please fill the City field');
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
                                        console.log(formattedFatherName)
                                        alert('Please fill the Father Name field');
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
                                    console.log(formattedName)
                                    alert('Please fill the Name field');
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
                                console.log(formData.dateOfBirth)
                                alert('Please select a D/O/B');
                                dateInput.focus();
                                return;
                            }
                            // Optionally, you can show an error message or handle the validation failure in another way
                            console.log("id error");

                        }
                    }
                    else {


                        //   const batchInput = document.getElementById('batchInput');
                        //   if (batchInput) {
                        //       batchInput.focus();
                        console.log(formData.batch)
                        alert('There might be some error, Try again!');
                        //       return;
                        //   }
                        //   // Optionally, you can show an error message or handle the validation failure in another way
                        //   console.log("id error");

                    }
                }
                else {


                    const phoneInput = document.getElementById('phoneInput');
                    if (phoneInput) {
                        console.log(formData.phone)
                        alert('Please enter your complete Phone #');
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
                    console.log(formData.cnic)
                    alert('Please enter your complete Cnic');
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
                console.log(formData.email)
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }
            // Optionally, you can show an error message or handle the validation failure in another way
            console.log("id error");

        }
    }


    const finalRegistration = async () => {

        console.log("formData-->", formData);
        const res = await registerUser(formData);

        // setResData(res.user)
        console.log("res-->", res);

        if (res.success) {

            setShowModal(true);
            setCurrentUser(res.user)
            setFormData(initialFormData)
            setImage(null)
            settingCourseAndBatch()

        }





        setButtonClicked(true);

        // Set a timeout to reset the button state after a certain duration
        setTimeout(() => {
            setButtonClicked(false);
        }, 300);



    }


    const registerUser = async (formData) => {
        try {
            const response = await fetch("/api/registartion",
                {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json',
                    },

                    body: JSON.stringify(formData)
                });

            const data = await response.json()
            return data;

        }
        catch (e) {
            console.log('error', e);
        }
    }


    useEffect(() => {
        gettingAdmin();
        gettingCourses();
    }, []);

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
            console.log(data.data[0])
            setAdmin(data.data[0])
            setAllowAdmission(data.data[0].admissions)
            setMessage(data.data[0].textAdmission)

        } catch (error) {
            console.error("Error fetching users:", error);
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
            }
        } catch (error) {
            console.error("Error fetching courses:", error);
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
        <div className="mr-0 mb-0 ml-0 relative">


            <Navbar />

            <div style={{ boxShadow: '1px 1px 1px 4px rgba(0.1, 0.1, 0, 0.1)' }} className="w-full bg-white text-[#248ba5] lg:font-bold md:font-bold mx:font-bold lg:h-8 md:h-8 mx:h-8 flex items-center justify-center text-1xl  h-6">Service-Education-Registration
            </div>

            <div style={{ boxShadow: '1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)' }} className=" mt-8 mx-auto h-[300px] w-full  lg:w-[60%] md:w-[60%] mx:w-[60%] rounded-xl mb-[30px]"><Image className="h-[300px] mx-auto w-full rounded-xl" src="/images/Rizwan.png" alt="course info" width={600} height={400}

            /></div>

            <div className="bg-none flex items-center justify-center rounded-xl space-x-0 mt-4 mb-4">
                <Button color="inherit"
                    id='button1'
                    onClick={() => { router.push("/download") }}
                    className='h-12 w-[14%] md:w-[20%] border border-white-900   justify-between items-center text-center'
                    sx={{ display: { xs: 'inline', sm: 'inline', md: 'none', lg: 'none', xl: 'none' } }}
                >
                    <p className='font-bold '>Download ID Card</p>
                </Button>


                <Button
                    color="inherit"
                    id='button2'
                    onClick={() => { router.push("/payment") }}
                    className='h-12 w-[14%] md:w-[20%] border border-white-900 bg-[#248ba5]  justify-between items-center  text-center'
                    sx={{ display: { xs: 'inline', sm: 'inline', md: 'none', lg: 'none', xl: 'none' } }}
                >
                    <p className='font-bold '>Payment Verify</p>
                </Button>

            </div>



            {isFormDisabled && message ? (<div className="flex justify-center items-center mb-6">
                <div className="text-center text-gray-700 text-3xl">
                    {message}
                </div>
            </div>) : null}



            <div style={{ boxShadow: '1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)', opacity: isFormDisabled ? 0.5 : 1, pointerEvents: isFormDisabled ? 'none' : 'auto' }} className={`disabled:opacity-40 mx-auto w-full lg:w-[60%] md:w-[60%] mx:w-[60%] flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative`} //disabled={!isAdmission()}
            >
                <div className="w-full mr-0 mb-0 ml-0 space-y-4 lg:space-y-1 md:space-y-1 mx:space-y-1
                lg:grid grid-cols-2 gap-6 md:grid grid-cols-2 gap-6 mx:grid grid-cols-2 gap-6
                 ">

                    <InputComponent
                        type="text"
                        id="nameInput"
                        placeholder="Full Name"
                        label="Full Name"
                        value={formData.fullName}
                        onChange={(event) => {
                            const newName = event.target.value;

                            // Combine steps for efficiency
                            const formattedName = newName
                                .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                                .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining

                            setFormData({
                                ...formData,
                                fullName: formattedName
                            });
                        }} />
                    <InputComponent
                        type="text"
                        id="fnameInput"
                        placeholder="Father Name"
                        label="Father Name"

                        value={formData.fatherName}
                        onChange={(event) => {
                            const newFatherName = event.target.value;

                            // Combine steps for efficiency
                            const formattedFatherName = newFatherName
                                .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                                .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining

                            setFormData({
                                ...formData,
                                fatherName: formattedFatherName
                            });
                        }}  />
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
                        id="cityInput"
                        placeholder="City"
                        label="City"
                        value={formData.city}
                        onChange={(event) => {
                            const newCity = event.target.value;

                            // Combine steps for efficiency
                            const formattedCity = newCity
                                .replace(/[^a-zA-Z\s]/g, '') // Remove non-alphanumeric characters
                                .replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()); // Capitalize first letter, lowercase remaining

                            setFormData({
                                ...formData,
                                city: formattedCity
                            });
                        }}  />
                    <InputComponent
                        type="date"
                        id="dateInput"
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
                        id="genderInput"
                        options={[
                            { id: "Male", label: "Male" },
                            { id: "Female", label: "Female" },
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
                        id="courseInput"
                        options={allCourses
                            .filter((course) => course.admission === 'Opened')
                            .map((course) => ({ value: course.course, label: course.course }))}
                        value={formData.course}
                        onChange={(event) => {
                            const selectedCourse = allCourses.find((course) => course.course === event.target.value);
                            setFormData({
                                ...formData,
                                course: event.target.value,
                                batch: selectedCourse?.batch, // Set batch if selectedCourse exists
                            });
                        }}
                    />


                </div>


                <div className="w-full mt-[35px] lg:mt-[15px] mx:mt-[15px] md:mt-[15px] mr-0 mb-0 ml-0 space-y-6">
                    <InputComponent
                        type="text"
                        id="qualificationInput"
                        placeholder="Qualification"
                        label="Qualification"
                        value={formData.qualification}
                        onChange={(event) => {
                            const newValue = event.target.value;

                            // Capitalize the first letter of each word
                            const formattedValue = newValue.replace(/\b\w/g, (char) => char.toUpperCase());
                            setFormData({
                                ...formData,
                                qualification: formattedValue
                            });
                        }} />
                    <InputComponent
                        type="text"
                        id="addressInput"
                        placeholder="Address"
                        label="Address"
                        value={formData.address}
                        onChange={(event) => {
                            const newValue = event.target.value;

                            // Capitalize the first letter of each word
                            const formattedValue = newValue.replace(/\b\w/g, (char) => char.toUpperCase());
                            setFormData({
                                ...formData,
                                address: formattedValue
                            });
                        }} />

                </div>


                <div className="image-uploader" onClick={() => document.getElementById('image-upload').click()}>
                    <input id="image-upload" type="file" onChange={handleImageUpload} style={{ display: 'none' }} />

                    {image && <Image cloudName="dbcpfhk6n" src={image} alt="image" style={{ width: '100px', height: '150px' }} width={600} height={400} />}

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
                // disabled={!isFormValid()}
                >Register</button>

            </div>

            <div>
                <IdCardModal isOpen={showModal} onClose={closeModal} user={currentUser} />
            </div>
        </div>

    )
}


