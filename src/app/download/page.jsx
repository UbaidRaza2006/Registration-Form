"use client";

// import DownloadIdCardTable from "@/components/AntIdCardsTable";
// import AntInputComponent from "@/components/AntInput";
// import { Button } from "antd";
import { EditOutlined, PlusOutlined,DownloadOutlined } from '@ant-design/icons';
import React, { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import AntInputComponent from "../../components/AntInput";
import { Button, Input, Table } from "antd";
import DownloadIdCardTable from "../../components/AntIdCardsTable";
import style from "../globals.css"
import Link from "next/link";
import InputComponent from "../../components/InputComponent";
import { findUserByCNIC, getAllUsers, getUserWithCnic } from "../../services/register";
// import IdCard from "../../components/IdCard";
import dynamic from "next/dynamic";
import IdCard from "../../components/IdCard";
import { Bounce, toast } from "react-toastify";

function DownloadIdCard() {

  const [res, setRes] = useState(null)
  const [allUsers, setAllUsers] = useState([])
  const [cnic, setCnic] = useState(false)
  const [inputCnic, setInputCnic] = useState('')
  const [simpleCnic, setSimpleCnic] = useState('')
  const [usersWithCnic, setUsersWithCnic] = useState([])
  // const [usersWithCnic,setUsersWithCnic]= useState([])


  useEffect(() => {

    if (inputCnic.length > 15 || inputCnic.length < 15) {
      setUsersWithCnic([])
    }

  }, [inputCnic]);

  const data = [
    {
      key: '1',
      course: 'Course 1',
      batch: 'Batch 1',
    },
    {
      key: '2',
      course: 'Course 2',
      batch: 'Batch 2',
    },
    {
      key: '3',
      course: 'Course 3',
      batch: 'Batch 3',
    },
  ];

  const columns = [
    {
      title: 'Course',
      dataIndex: 'course',
      key: 'course',
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <IdCard user={record} />
      ),

    },
  ];

  const formatCnicNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, '');
    let formattedCnic = cleanedInput.replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    return formattedCnic;
  };

  function isFormValid() {
    return inputCnic.length === 15 ? true : false
  }

  const getUserCnicData = async (cnicNumber) => {
    console.log("cnicForUser-->", cnicNumber);
    if (cnicNumber) {
      try {
        console.log("ruko zara, sabar karo!")
        let userData = await fetch(`/api/students?cnic=${cnicNumber}`);
        userData = await userData.json();
        console.log(userData);

        if (userData.success) {
          let data = userData.data;
          console.log("data-->", data);

          const users = Array.isArray(data) ? data : [data];

          const decodedUsers = users.map(user => ({
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
          }));
    

          setUsersWithCnic(decodedUsers);
        } else if (userData.success === false) {
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
      } catch (error) {
        console.error("Error fetching user data:", error);
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
    }
    else{
      console.log("cnicNumber nhi araha!")
    }
  };

  return (
    <div className="h-[1100px] bg-[#d4f6f9]">
      <div className="flex justify-center bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white text-3xl md:text-4xl text-center font-bold h-[60px] py-2">
      <div className='text-3xl font-bold mr-4'><DownloadOutlined/></div>
        Download ID Card
      </div>

      <div className="w-full h-[750px] mt-12 flex flex-col items-center">
        <div className="mx-auto">

          <Input
          className="rounded-3xl border-5 border-gray-400 py-1 text-xl text-center"
          style={{width:"400px", height:"45px", backgroundColor:"white"}}
            id="cnicInput"
            type="text"
            maxLength="15"
            inputMode="numeric"
            placeholder="00000-0000000-0"
            label="Cnic/B-form"
            value={inputCnic}
            onChange={(event) => {
              setSimpleCnic(event.target.value)
              const inputValue = event.target.value.replace(/\D/g, ''); // Remove non-digit characters
              if (inputValue.length <= 13) {
                const formattedCnic = formatCnicNumber(inputValue);
                setInputCnic(formattedCnic);
              }
            }}
          />
        </div>

        <button
          className="btn disabled:opacity-50 disabled:bg-gradient-to-t from-[#0e303e] to-[#18819b] mt-0 bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white disabled:text-white rounded-3xl font-semibold w-[400px]"
          disabled={!isFormValid()}
          onClick={() => getUserCnicData(inputCnic)}
        >
          SUBMIT
        </button>
        <div className="mt-6 rounded-lg">
          {usersWithCnic.length > 0 ? <Table columns={columns} dataSource={usersWithCnic} className='rounded-lg w-[400px]' /> : null}
        </div>
      </div>

    </div>
  );
}

export default DownloadIdCard

// export default dynamic(() => Promise.resolve(Cart), {
//     ssr: false,
// });