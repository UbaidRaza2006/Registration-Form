"use client";

import { Table, Button } from 'antd';
import { useEffect, useState } from 'react';
import { getAllUsers } from '../../services/register';
import InputComponent from '../InputComponent';
import React from 'react';

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
    // render: (text, record) => (
    //   <Button style={{backgroundColor : "#248ba5",}} onClick={() => handleShow()}>
    //     Download ID Card
    //   </Button>

    // ),
  },
];


// const handleDownload = (key) => {
  //   // Logic to handle ID card download for the corresponding record
  //   console.log('Downloading ID card for record with key:', key);
  // };
  
const DownloadIdCardTable = () => {
  const [res,setRes]=useState(null)
  const [allUsers,setAllUsers] = useState([])
  const [cnic,setCnic]= useState('')
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
      console.log(cnic)

      
      
     
      const handleShow= ()=>{
      
        allUsers.map((data,ind)=>{
      
          if(cnic === data.cnic){
            usersWithCnic.push(data)
            console.log('usersWithCnic-->',usersWithCnic)
  
          }
          else{
            console.log('cnic is not matching')
          }
        })

        console.log('mein chal gaya')
        
      }




  return (
  
  <>
  {/* {  
    allUsers.map((data,ind)=>{
return(
      <Table columns={columns} dataSource={data} style={{ width: '550px',  borderRadius: "0px" }}  />
      )
      
      })  
}
   */}

<InputComponent
                        id="cnicInput"
                        type="text"
                        maxLength="15"
                        inputMode="numeric"
                        placeholder="00000-0000000-0"
                        label="Cnic/B-form"

                        value={cnic}
                        onChange={(event) => {


                            // if (event.target.value.length <= 15) {
                            //     const formattedCnic = formatCnicNumber(event.target.value);


                            //     if (formattedCnic){

                                    setCnic(event.target.value)
                            //     }


                            // }


                        }} />

<Button
                    className="disabled:opacity-50 mt-4 bg-[#248ba5] text-white font-semibold w-full"
                    style={{ height: "50px" }}
                    // disabled={!isFormValid()}
                    onClick={handleShow()}
                >
                    SUBMIT
                </Button>
   
<Table columns={columns} dataSource={allUsers.data} style={{ width: '550px',  borderRadius: "0px" }}  />


  </>
  
  )
};

export default DownloadIdCardTable;