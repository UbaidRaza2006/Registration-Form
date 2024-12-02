"use client";

import { HomeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Button, Input, Table } from "antd";
import IdCard from "../../components/IdCard";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";
import Crop from "../../components/Crop";

function DownloadIdCard() {
  const [registering, setRegistering] = useState(false);
  const [res, setRes] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [cnic, setCnic] = useState(false);
  const [inputCnic, setInputCnic] = useState("");
  const [simpleCnic, setSimpleCnic] = useState("");
  const [usersWithCnic, setUsersWithCnic] = useState([]);
  const [content, setContent] = useState(null);
  const [contentImage, setContentImage] = useState("");

  useEffect(() => {
    if (inputCnic.length !== 15) {
      setUsersWithCnic([]);
    }
  }, [inputCnic]);

  useEffect(()=>{
    gettingContent();
  },[])

//   const getBase64Image = async (imageUrl) => {
//     console.log("Function Running!");
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
//         console.warn('getBase64Image function is being executed in a non-browser context.');
//         return null;
//     }
// };

  const gettingContent = async () => {
    console.log("gettingContent")
    try {
      const res = await fetch("/api/content", {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      console.log("gettingContent ka data-->",data)
      if (data.success) {
        // setContentImage(data?.data[0].contentImage)
        setContent(data?.data[0])
        // const base64Image = await getBase64Image(data?.data[0].contentImage);
        // console.log("Base64 image:", base64Image);
        setContentImage(data?.data[0].contentImage);      }
      else {
        toast.error(data.message, {
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
      console.error("Error fetching contentImage:", error);
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

  const columns = [
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <IdCard user={record} contentImage={contentImage} />,
    },
  ];

  const formatCnicNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, "");
    return cleanedInput.replace(/^(\d{5})(\d{7})(\d{1})$/, "$1-$2-$3");
  };

  const isFormValid = () => inputCnic.length === 15;

  const getUserCnicData = async (cnicNumber) => {
    console.log("cnicForUser-->", cnicNumber);
    if (cnicNumber) {
      try {
        setRegistering(true)
        console.log("Fetching user data...");
        let userData = await fetch(`/api/students?cnic=${cnicNumber}`);
        userData = await userData.json();
        console.log(userData);

        if (userData.success) {
          const decodedUsers = userData.data.map((user) => ({
            ...user,
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
            imageUrl: decodeURIComponent(user.imageUrl),
          }));

          setUsersWithCnic(decodedUsers);
          setRegistering(false)
        } else {
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
          setRegistering(false)
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error, Try again later!", {
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
      console.log("CNIC number is not provided!");
    }
  };

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate page load completion
    const timer = setTimeout(() => {
      setLoading(false);
    }, 300); // Adjust the timeout as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#d4f6f9]">
      {/* Navbar */}

      {loading? (
        <div className="h-[120px] w-[100%] flex items-center space-x-3 justify-center pt-[310px] mt-[-10px]">
        <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
        <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
        <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
        <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
    </div>
      ) : (
<>
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

<div className="text-center flex-grow text-3xl md:text-4xl font-bold">
Download ID Card
</div>
</div>

{/* Main Content */}
<div className="w-full flex flex-col items-center py-8 px-4 md:px-0">


  {/* CNIC Input */}
  <div className="mb-4 w-full max-w-xs md:max-w-md lg:max-w-lg">
    <Input
      className="rounded-3xl border-2 border-gray-400 py-2 text-xl text-center w-full"
      style={{ backgroundColor: "white" }}
      id="cnicInput"
      type="tel"       
      maxLength="15"
      inputMode="numeric"
      placeholder="00000-0000000-0"
      value={inputCnic}
      onChange={(event) => {
        setSimpleCnic(event.target.value);
        const inputValue = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
        if (inputValue.length <= 13) {
          const formattedCnic = formatCnicNumber(inputValue);
          setInputCnic(formattedCnic);
        }
      }}
      />
  </div>
      
      {/* To be removed */}
      
      {/* <Crop/> */}

  {/* Submit Button */}

  {registering ? (
    <button
    className="btn disabled:opacity-50 disabled:bg-gray-400 mt-0 bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white disabled:text-white rounded-3xl font-semibold w-full max-w-xs md:max-w-md lg:max-w-lg"
    // disabled={!isFormValid()}
    // onClick={() => getUserCnicData(inputCnic)}
  >
  <div className="flex items-center space-x-3 mx-auto">
        <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
        <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
        <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
        <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
      </div>
    </button>) : 
    (

    <button
      className="btn disabled:opacity-50 disabled:bg-gray-400 mt-0 bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white disabled:text-white rounded-3xl font-semibold w-full max-w-xs md:max-w-md lg:max-w-lg"
      disabled={!isFormValid()}
      onClick={() => getUserCnicData(inputCnic)}
    >
      SUBMIT
    </button>
  )}





  {/* Users Table */}
  <div className="mt-6 rounded-lg w-full px-4 md:px-8 lg:px-16 max-w-2xl mx-auto">
    {usersWithCnic.length > 0 ? (
      <Table
        columns={columns}
        dataSource={usersWithCnic}
        className="rounded-lg"
        pagination={{ pageSize: 10 }} // Pagination with 10 rows per page
        style={{ width: "100%" }}
      />
    ) : null}
  </div>
</div>
</>
      )}



    </div>
  );
}

export default DownloadIdCard;
