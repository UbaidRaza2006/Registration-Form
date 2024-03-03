"use client";

// import DownloadIdCardTable from "@/components/AntIdCardsTable";
// import AntInputComponent from "@/components/AntInput";
// import { Button } from "antd";
import React, { useEffect } from "react";
import { useContext, useRef, useState } from "react";
import AntInputComponent from "../../components/AntInput";
import { Button, Table } from "antd";
import DownloadIdCardTable from "../../components/AntIdCardsTable";
import style from "../globals.css"
import Link from "next/link";
import InputComponent from "../../components/InputComponent";
import { findUserByCNIC, getAllUsers, getUserWithCnic } from "../../services/register";




function DownloadIdCard() {

    const [res,setRes]=useState(null)
  const [allUsers,setAllUsers] = useState([])
  const [cnic,setCnic]= useState(false)
  const [inputCnic,setInputCnic]= useState('')
  const [simpleCnic,setSimpleCnic]= useState('')
  // const [usersWithCnic,setUsersWithCnic]= useState([])
  var usersWithCnic=[]


    useEffect(() => {
        getAllUsers()
          .then((users) => {
            setRes(users)
            setAllUsers(users.data);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
          });
        }, []);
  
        console.log(res)
        console.log(allUsers)
        console.log(simpleCnic)
        console.log(cnic)
  

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
              <Button style={{ backgroundColor: "#248ba5" }}>
                <Link href={`/download/${record._id}`}>ID Card</Link>
              </Button>
            ),
      
          },
        ];
      

        // const formatCnicNumber = (input) => {
        //   // Remove any non-digit characters
        //   const cleanedInput = input.replace(/\D/g, '');
        
        //   // Insert hyphens after certain positions
        //   let formattedCnic = cleanedInput.replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
        
        //   return formattedCnic;
        // };
        const formatCnicNumber = (input) => {
          const cleanedInput = input.replace(/\D/g, '');
          let formattedCnic = cleanedInput.replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
          return formattedCnic;
        };

    // 



    // console.log(cnic)


    function isFormValid() {
        return inputCnic.length === 15 ? true : false
    }

    // setCnic(simpleCnic)

    const handleShow = () => {
      const filteredUsers = allUsers.filter(data => data.cnic === inputCnic);
      if (filteredUsers.length > 0) {
        filteredUsers.forEach(user => {
          usersWithCnic.push(user);
        });
        console.log('usersWithCnic-->', usersWithCnic);
        // setCnic(true)
      } else {
        console.log('cnic is not matching');
      }
      console.log('mein chal gaya');
    };




    return (
        <div className="h-full bg-gray">
            <div className="bg-[#248ba5] py-4 lg:py-6 text-white text-2xl md:text-4xl text-center font-bold">
                Download ID Card
            </div>

            <div className="mx-auto max-w-xl mt-6">
                <div className="p-4 rounded">
                  
<InputComponent
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

                <Button
                    className="disabled:opacity-50 mt-4 bg-[#248ba5] text-white font-semibold w-full"
                    style={{ height: "50px" }}
                    disabled={!isFormValid()}
                    onClick={handleShow()}
                >
                    SUBMIT
                </Button>



                <div className="mt-6">
                    <Table columns={columns} dataSource={usersWithCnic} style={{ width: '550px',  borderRadius: "0px" }}  />
                </div>
            </div>
        </div>
    );
}

export default DownloadIdCard;