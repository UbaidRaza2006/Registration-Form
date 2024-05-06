"use client"

import React, { useEffect, useState } from 'react';
import { Button, Input, InputNumber, Layout, Menu, Modal } from 'antd';
import "./index.css"
import { ClassroomOutlined } from '@ant-design/icons';
import {
  UserOutlined,
  LaptopOutlined,
  BlockOutlined,
  LockOutlined,
  LockTwoTone,
  CheckCircleTwoTone,
  StopOutlined,
  DeleteOutlined,
  NotificationOutlined,
  SettingOutlined,
  SoundOutlined,
  MusicOutlined,
  HistoryOutlined,
  SaveOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

import { usePassword } from '../../context';
import { backdropClasses } from '@mui/material';
import Batch from '../CourseBatch';
import Image from 'next/image';
import AdmissionModal from '../CourseAdmission';
import ReactModal from 'react-modal';
import { CheckCircle } from '@mui/icons-material';
import BatchModal from '../CourseBatch';
const { Sider } = Layout;




function SideNavbarComponent() {


  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);
  const [isModalVisible5, setIsModalVisible5] = useState(false);
  const [isModalVisible6, setIsModalVisible6] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [inputPassword, setInputPassword] = useState('');
  const [recheckPassword, setRecheckPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inputCondition, setInputCondition] = useState("verify");

  const [admissionsOpen, setAdmissionsOpen] = useState("");

  const [admin, setAdmin] = useState(null)
  const [admissions, setAdmissions] = useState("")
  const [adminName, setAdminName] = useState("")
  const [adminPassword, setAdminPassword] = useState("")
  const [message, setMessage] = useState("")


  const [allCourses, setAllCourses] = useState([])
  const [batchValues, setBatchValues] = useState(Array(allCourses.length).fill(0));

  const [currentUser, setCurrentUser] = useState(null)
  const [isAdding, setIsAdding] = useState(false);
  // const [selectedItemData, setSelectedItemData] = useState(null)

  let selectedItemData = null

  const customStyles = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    },
    content: {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '8px',
      padding: '0px',
      maxWidth: '600px', // Adjust width as needed
      width: '90%',
      maxHeight: '90vh',
      height:"457px",
      overflow: 'auto',
      
    }
  };
  const scrollStyles = {
    // Scrollbar styles
  scrollbarWidth: 'thin',
  scrollbarColor: '#6b7280 #d1d5db', // thumb color, track color
  }

//   const customScrollbarStyles = `
//   /* Custom scrollbar styles */
//   .custom-scrollbar::-webkit-scrollbar {
//     width: 8px; /* Width of vertical scrollbar */
//   }

//   .custom-scrollbar::-webkit-scrollbar-thumb {
//     background-color: #a5a5a5; /* Color of scrollbar thumb */
//     border-radius: 4px; /* Border radius of scrollbar thumb */
//   }

//   .custom-scrollbar::-webkit-scrollbar-track {
//     background-color: #f0f0f0; /* Color of scrollbar track */
//   }
// `;


  const { api, setApi, allowAdmission, setAllowAdmission, coursesToLoad, setCoursesToLoad } = usePassword();

  console.log(inputCondition)
  console.log(inputPassword)

  useEffect(() => {
    console.log("admin", admin)
    if (admin) {
      setAdmissionsOpen(admin.admissions)
    }

  }, [admin])


  // useEffect(()=>{
  //   setAdmissionsOpen(admissions)
  //   console.log("admission-->",admissions);
  // },[admissions])

  useEffect(() => {
    console.log("coursesToLoad-->", coursesToLoad)

    if (coursesToLoad) {
      console.log("gettingCourses()")
      gettingCourses();
    }
  }, [coursesToLoad])

  useEffect(() => {
    gettingAdmin();
  }, [isModalVisible2])

  
// isModalVisible1
const handlePassword = () => {


  if (inputCondition === "verify") {
    if (inputPassword === admin.adminPassword) {
      console.log(admin.adminPassword)
      setInputCondition("update")
      setInputPassword("")
    }
    else {
      alert("First , enter correct current Password")
    }
  }
  else if (inputCondition === "update") {
    if (inputPassword) {
      setRecheckPassword(inputPassword)
      setInputPassword("")
      setInputCondition("recheck")
    }
  }
  else if (inputCondition === "recheck") {
    if (inputPassword === recheckPassword) {
      setAdminPassword(inputPassword)
      updateAdminPassword("66032b8c2c0200b18d1d8a4c")
      setInputPassword("")
      setInputCondition("done")

      // alert(`Password changed into "${inputPassword}" `)
    }
    else {
      alert("Type Again!")
    }
  }
  // setPassword(inputPassword);
  // setInputPassword('');
};

  const updateAdminPassword = async (adminId) => {


    try {
      if (inputPassword) {
        let data = await fetch(`/api/admins/${adminId}`, {
          method: "PUT",
          body: JSON.stringify({ _id: adminId, adminPassword: inputPassword }), headers: {
            "Content-Type": "application/json"
          }
        })
        data = await data.json()
        console.log(data, `/api/admins/${adminId}`)
        // console.log("info-->",data);
        if (data.success) {
          alert(`Passowrd has been Updated!.. into  ${data.result.adminPassword}`)
          setInputCondition("verify")
          // setOpen(false);
        }
        else {
          console.log(data);
        }
      }
      else {
        console.log("adminPassword nhi araha")
      }
    }
    catch (error) {
      console.log("error-->", error)
    }
  }

// isModalVisible2
  const updateMesssage = async (adminId) => {


    try {
      if (message) {
        let data = await fetch(`/api/admins/${adminId}`, {
          method: "PUT",
          body: JSON.stringify({ _id: adminId, textAdmission: message }), headers: {
            "Content-Type": "application/json"
          }
        })
        data = await data.json()
        console.log(data, `/api/admins/${adminId}`)
        // console.log("info-->",data);
        if (data.success) {
          alert(`Message has been sent.....  ${data.result.textAdmission}`)
          setMessage("")
        }
        else {
          console.log(data);
        }
      }
      else {
        console.log("Message nhi araha")
      }
    }
    catch (error) {
      console.log("error-->", error)
    }
  }

  const updateAdmissions = async (adminId, newStatus) => {


    try {
      // if(admissionsOpen){
      let data = await fetch(`/api/admins/${adminId}`, {
        method: "PUT",
        body: JSON.stringify({ _id: adminId, admissions: newStatus, textAdmission: "" }), headers: {
          "Content-Type": "application/json"
        }
      })
      data = await data.json()
      console.log(data, `/api/admins/${adminId}`)
      // console.log("info-->",data);
      if (data.success) {
        alert(`Admission Status has been Updated!.. into  ${data.result.admissions}`)
        setAllowAdmission(data.result.admissions)
        // setInputCondition("verify")
        // setOpen(false);
      }
      else {
        console.log(data);
      }
      // }
      // else{
      //   console.log("adminsOpen nhi araha")
      // }
    }
    catch (error) {
      console.log("error-->", error)
    }
  }

  const handleSwitchChange = () => {
    const newStatus = admissionsOpen === "Open" ? "Close" : "Open";
    setAdmissionsOpen(newStatus);
    updateAdmissions(admin._id, newStatus); // Update admission status
  };

// // isModalVisible3
// const editBatchOfTheCourse = async (batch, courseId) => {


//   try {
//     if (batch && id) {
//       let data = await fetch(`/api/courses/${courseId}`, {
//         method: "PUT",
//         body: JSON.stringify({ _id: courseId, batch: batch }), headers: {
//           "Content-Type": "application/json"
//         }
//       })
//       data = await data.json()
//       console.log(data, `/api/courses/${courseId}`)
//       // console.log("info-->",data);
//       if (data.success) {
//         alert(`New Batch No.${data.result.batch} has been Launched!}`)
//         setIsAdding(false)
//         // setOpen(false);
//       }
//       else {
//         console.log(data);
//       }
//     }
//     else {
//       console.log("batch wagerah aa hi nhi rahaa")
//     }
//   }
//   catch (error) {
//     console.log("error-->", error)
//   }
// }
 



  
  const showModal = (par,itemData) => {
    if (par === 1) {
      console.log("showModal", par)
      setIsModalVisible1(true)
    }
    else if (par === 2) {
      console.log("showModal", par)
      setIsModalVisible2(true)
    }
    else if (par === 3) {
      console.log("showModal", par)
      setIsModalVisible3(true)
    }
    else if (par === 4 && itemData) {
      console.log("showModal", par)
      setCurrentUser(itemData)
      setIsModalVisible4(true)
    }
    else if (par === 5) {
      console.log("showModal", par)
      // console.log("item", itemData)
      setCurrentUser(itemData)
      setIsModalVisible5(true)
    }
    // else if (par === 6) {
    //   console.log("showModal", par)
    //   setIsModalVisible6(true)
    // }
  };

  const handleCancel = (par) => {
    if (par === 1) {
      console.log("closeModal", par)
      setIsModalVisible1(false)
    }
    else if (par === 2) {
      console.log("closeModal", par)
      setIsModalVisible2(false)
    }
    else if (par === 3) {
      console.log("closeModal", par)
      setIsModalVisible3(false)
    }
    else if (par === 4) {
      console.log("closeModal", par)
      setIsModalVisible4(false)
    }
    else if (par === 5) {
      console.log("closeModal", par)
      setIsModalVisible5(false)
    }
    // else if (par === 6) {
    //   console.log("closeModal", par)
    //   setIsModalVisible6(false)
    // }
  };

  const back = () => {
    if (inputCondition === "update") {
      setInputCondition("verify")
    }
    else if (inputCondition === "recheck") {
      setInputCondition("update")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const gettingAdmin = async () => {
    console.log("gettingAdmin")
    try {
      const res = await fetch("/api/admins", {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      setAdmin(data.data[0])

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
        setCoursesToLoad(false)
      } else {
        setAllCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };


  // const handleBatchChange = (index, value) => {
  //   const newBatchValues = [...batchValues];
  //   newBatchValues[index] += value;
  //   setBatchValues(newBatchValues);
  // };


  const reloadButton = () => {
    console.log("reloadButton")
    setCoursesToLoad(true)
  }

  return (
    <Layout style={{ height: '100%', position: 'fixed', marginTop: '-20px' }}>
      <Sider style={{ backgroundColor: "#0E4C92", paddingTop: '10px', height: "100%" }} width={80} theme="dark">
        <Menu mode="vertical" className='space-y-5' style={{ backgroundColor: "#0E4C92" }} theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="i1" icon={<Image style={{ borderRadius: "20px", marginLeft: '-25%', width: "100%" }}   width={600} height={400} src='/images/BhattiSahab.jpg' alt='User' />} />
          <Menu.Item key="1" icon={<LockOutlined />} onClick={() => showModal(1)} />
          <Menu.Item key="2" icon={<StopOutlined />} onClick={() => showModal(2)} />
          <Menu.Item key="3" icon={<LaptopOutlined />} onClick={() => showModal(3)} />
          <Menu.Item key="4" icon={api ? (
            <div className="flex items-center space-x-2">
              <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
              <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
              <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
              <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
            </div>
          ) : (<ReloadOutlined />)} onClick={() => { setApi(true) }} />

          {/* <Menu.Item key="3" icon={<LaptopOutlined />} onClick={() => showModal()} />
          <Menu.Item key="4" icon={<SaveOutlined />} onClick={() => showModal()} />
          <Menu.Item key="5" icon={<NotificationOutlined />} onClick={() => showModal()} />
          <Menu.Item key="6" icon={<SettingOutlined />} onClick={() => showModal()} />
          <Menu.Item key="7" icon={<SoundOutlined />} onClick={() => showModal()} />
          <Menu.Item key="8" icon={<HistoryOutlined />} onClick={() => showModal()} /> */}
          {/* <Menu.Item key="6" icon={<MusicOutlined />} /> */}
        </Menu>
      </Sider>



      <Modal
        visible={isModalVisible1}
        onCancel={() => handleCancel(1)}
        footer={null}
        centered
      >
        {inputCondition === "done" ? (<div className="flex justify-center items-center h-[140px]">
          <div className="flex  space-x-4">
            <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
            <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
            <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
            <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
            <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}></div>
          </div>
        </div>) : (<><div style={{ marginBottom: '20px' }}>
          <p>{inputCondition === "verify" ? "First Verify It is You?!" : inputCondition === "update" ? "Enter The Passowrd to be updated!" : "Type again to Confirm"} </p>
          <Input.Password
            value={inputPassword}
            onChange={(e) => setInputPassword(e.target.value)}
            placeholder={inputCondition === "verify" ? "Enter Current Password" : inputCondition === "update" ? "Enter New Password" : "Confirm Password"}
            addonAfter={
              showPassword ? (
                <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
              ) : (
                <EyeOutlined onClick={togglePasswordVisibility} />
              )
            }
          />
        </div>
          <Button type="primary" style={{ backgroundColor: "#0056b3" }} onClick={handlePassword}>{inputCondition === "verify" ? "Next" : inputCondition === "update" ? "Save Password" : "Confirm"}</Button>
          <Button type="primary" style={{ backgroundColor: "#0056b3", marginLeft: "250px" }} onClick={() => { back() }}>Back</Button>
        </>)}
        {/* <div style={{ marginBottom: '20px' }}>
        <p>{inputCondition === "verify"? "First Verify It is You?!" : inputCondition === "update" ? "Enter The Passowrd to be updated!": "Type again to Confirm"} </p>
        <Input.Password
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder={inputCondition === "verify"? "Enter Current Password" : inputCondition === "update" ? "Enter New Password": "Confirm Password"}
          addonAfter={
            showPassword ? (
              <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
            ) : (
              <EyeOutlined onClick={togglePasswordVisibility} />
            )
          }
        />
      </div>
      <Button type="primary" style={{backgroundColor:"#0056b3"}} onClick={handlePassword}>{inputCondition === "verify"? "Next" : inputCondition === "update" ? "Save Password": "Confirm"}</Button> */}
      </Modal>


      <Modal
        visible={isModalVisible2}
        onCancel={() => handleCancel(2)}
        footer={null}
        centered
      >
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <p style={{ fontSize: '24px', marginBottom: '20px' }}>Admissions Status</p>
          <div
            className='mx-auto'
            onClick={handleSwitchChange}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              border: '2px solid #ccc',
              borderRadius: '30px',
              padding: '2px',
              width: '120px',
              height: '60px',
              backgroundColor: admissionsOpen === "Open" ? '#1890ff' : '#f5222d',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
                transform: admissionsOpen === "Open" ? 'translateX(58px)' : 'translateX(2px)',
                transition: 'transform 0.3s',
              }}
            />
          </div>
          {admissionsOpen === "Close" ? (<><p style={{ fontSize: '18px', marginTop: '20px', color: '#333' }}>Enter The Message for Users, while courses are Closed</p> <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter Message"

          />
            <Button type="primary" style={{ width: '60%', backgroundColor: '#0056b3', color: 'white', border: 'none', marginTop: '20px' }} onClick={() => { updateMesssage(admin._id) }}>Message Done</Button></>) : null}


          <Button type="primary" style={{ width: '60%', backgroundColor: '#0056b3', color: 'white', border: 'none', marginTop: '20px' }} onClick={() => { handleCancel(2) }}>Back</Button>
        </div>
      </Modal>


      <ReactModal
  isOpen={isModalVisible3}
  onRequestClose={() => handleCancel(3)}
  style={customStyles}
  contentLabel="Custom Modal"
>
  <div className="py-4 px-8 bg-white rounded-lg shadow-lg">
    <h2 className="text-3xl font-serif text-dark-brown mb-6">Add Course</h2>
    <div className="mb-6 flex items-center">
      <Input
        type="text"
        placeholder="Enter Course"
        className="border border-gray-300 rounded-md px-3 py-2 w-80 mr-2"
      />
      <Button
        style={{ backgroundColor: "dark-blue" }}
        className="bg-blue-900 h-10 text-white text-antique-white rounded-md justify-between items-center text-center"
      >
        Add Course
      </Button>
      <Button
        style={{ backgroundColor: "dark-blue" }}
        className="bg-blue-600 h-10 w-[20%] text-white text-antique-white rounded-md justify-between my-auto items-center text-center"
        onClick={()=>{reloadButton()}}
      >
        {coursesToLoad?
        (
          <div className="flex items-center space-x-2 ml-[20%]">
          <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
          <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
          <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
          <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
        </div>
        ):
        (<> Reload <ReloadOutlined /></>)
      }
       
      </Button>
    </div>
    <div className="w-full h-[250px] overflow-y-auto max-h-[250px] rounded-md border-4 border-[#4d4b4b]" style={scrollStyles}>
      <table className="w-full">
      <thead className=''>
          <tr className=" text-white text-1xl font-large">
            <th className="px-6 py-3 bg-[#727272] border-r-3 border-[#4d4b4b] ">Course</th>
            <th className="px-3 py-3 bg-[#5e5d5d] border-r-3 border-[#4d4b4b] text-center">Batch</th>
            <th className="px-3 py-3 bg-[#727272] border-r-3 border-[#4d4b4b] text-center">Admission</th>
            <th className="px-3 py-3 bg-[#5e5d5d] border-r-3 border-[#4d4b4b] text-center">Delete</th>
          </tr>
        </thead>
        <tbody className=''>
          {
            allCourses.length>0?

          allCourses.map((item) => (
                <tr key={item._id} className="border-b border-gray-300"> {/* Added bottom border to each row */}
                  <td className="px-3 py-3">{item.course}</td>
                  <td className="px-3 py-3 text-center">
                    <div className="flex items-center justify-center ">

                      <p className="text-2xl font-bold text-blue-600">{item.batch}</p>
                      <span className="cursor-pointer ml-1" onClick={()=>{showModal(4 , item)}}>
                          <PlusOutlined style={{ fontSize: '18px', color: 'gray', strokeWidth: '2px' }} />
                        </span>
                      {/* <Batch selectedItem={item}/> */}
                    </div>
                  </td>
                  <td className="px-3 py-3 text-center">
                    {/* <Button onClick={()=>{showModal(5,item)}}>Admission</Button> */}
                    <Button className='text-0.5xl font-small'
    style={{ opacity: '75%', backgroundColor: item.admission ==="Opened"? "green" : "red", width: '70px', height: '30px', color: 'white', padding: '5px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
    onClick={()=>{showModal(5 , item)}}
  >
    {item.admission}
  </Button>
                  </td>
                  <td className='text-center'>
                    <Button style={{ backgroundColor: "dark-blue" }} className="bg-blue-900 h-10 text-white  text-antique-white rounded-md justify-between items-center  text-center"><DeleteOutlined /></Button>
                  </td>
                </tr>
              ))
              
              :
              
              <div className="flex justify-center items-center mt-[-25px] ml-[200px] h-screen">
      <div className="flex mt-[-300px] space-x-4">
        <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
        <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
        <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
        <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
        {/* <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}></div> */}
      </div>
     </div>

}
</tbody>
      </table>
    </div>
    <Button
      style={{ backgroundColor: "dark-blue" }}
      className="bg-blue-600 h-8 w-[100px] mt-4 text-white text-antique-white rounded-md justify-content-center justify-between items-center text-center ml-[82%]"
      onClick={() => { handleCancel(3) }}
    >
      Close
    </Button>
  </div>
</ReactModal>


  

   



   



      

{/* Ye Course walay Modal k under k Modals hein... */}

      {/* <Batch isOpen={isModalVisible4} onClose={handleCancel(4)} selectedItem={}/> */}

      
     

{/* Ye Course walay Modal k under k Modals hein... */}



<BatchModal isOpen={isModalVisible4} onClose={()=>{handleCancel(4)}} user={currentUser}/>
<AdmissionModal isOpen={isModalVisible5} onClose={()=>{handleCancel(5)}} user={currentUser}/>

    </Layout>
  );
};

export default SideNavbarComponent;





// import React, { useState } from 'react';
// import { Button, Input, Layout, Menu, Modal } from 'antd';
// import { UserOutlined, ReloadOutlined, EyeOutlined, EyeInvisibleOutlined,LockOutlined,BlockOutlined } from '@ant-design/icons';
// import { usePassword } from '../../context';

// const { Sider } = Layout;

// // Custom Icon Component
// const CourseBatchIcon = () => (
//   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
//     <path d="M12 2L1 9l11 7 10-7-11-7zm0 2.1L3.8 9 12 13.9 20.2 9 12 4.1zM2.5 9l9.5 6.3L21.5 9 12 2.7 2.5 9z"/>
//   </svg>
// );

// const SideNavbarComponent = () => {
//   const [isModalVisible1, setIsModalVisible1] = useState(false);
//     const [isModalVisible2, setIsModalVisible2] = useState(false);
//     const [isModalVisible3, setIsModalVisible3] = useState(false);
//     const [selectedIcon, setSelectedIcon] = useState(null);
//     const [inputPassword, setInputPassword] = useState('');
//     const [recheckPassword, setRecheckPassword] = useState('');
//     const [showPassword, setShowPassword] = useState(false);
//     const [inputCondition, setInputCondition] = useState("verify");
//   // const [isModalVisible1, setIsModalVisible1] = useState(false);
//   // const [inputPassword, setInputPassword] = useState('');
//   // const [recheckPassword, setRecheckPassword] = useState('');
//   // const [showPassword, setShowPassword] = useState(false);
//   // const [inputCondition, setInputCondition] = useState("verify");

//   const { password, setPassword, api, setApi } = usePassword();

//  const handlePassword = () => {


//   if(inputCondition === "verify"){
//     if(inputPassword===password){
// setInputCondition("update")
// setInputPassword("")
//     }
//     else{
//       alert("First , enter correct current Password")
//     }
//   }
//   else if(inputCondition === "update"){
//     setRecheckPassword(inputPassword)
//     setInputPassword("")
// setInputCondition("recheck")
//   }
//   else if(inputCondition === "recheck"){
//     if(inputPassword === recheckPassword){
//       setPassword(inputPassword)
//       setInputPassword("")
//       setInputCondition("verify")
//       alert(`Pssword changed into "${inputPassword}" `)
//     }
//     else {
//       alert("Type Again!")
//     }
//   }
//   // setPassword(inputPassword);
//   // setInputPassword('');
// };


//   const showModal = (par) => {
//     if(par===1){
//  console.log("showModal", par)
//  setIsModalVisible1(true)
//     }
//     else if(par===2){
//  console.log("showModal", par)
//  setIsModalVisible2(true)
//     }
// //     else if(par===3){
// //  console.log("showModal", par)
// //  setIsModalVisible3(true)
//     // }
//   };

//   const handleCancel = (par) => {
//     if(par===1){
//     console.log("closeModal", par)
//     setIsModalVisible1(false)
//     }
//     else if(par===2){
//     console.log("closeModal", par)
//     setIsModalVisible2(false)
//     }
//     // else if(par===3){
//     // console.log("closeModal", par)
//     // setIsModalVisible3(false)
//     // }
//   };


//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword);
//   };

//   return (
//     <Layout style={{ minHeight: '100vh', position: 'fixed', marginTop: '-20px' }}>
//       <Sider style={{ backgroundColor: "#0E4C92", paddingTop: '10px' }} width={80} theme="dark">
//         <Menu mode="vertical" className='space-y-5' style={{ backgroundColor: "#0E4C92" }} theme="dark" defaultSelectedKeys={['1']}>
//           <Menu.Item key="i1" icon={<UserOutlined />} />
//           <Menu.Item key="1" icon={<LockOutlined />} onClick={() => showModal(1)} />
//           <Menu.Item key="1" icon={<BlockOutlined />} onClick={() => showModal(2)} />
//           <Menu.Item key="1" icon={<CourseBatchIcon />} onClick={() => showModal(3)} />
//           <Menu.Item key="2" icon={api ? (
//             <div className="flex items-center space-x-2">
//               <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
//               <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
//               <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
//               <div className="loader-dot w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
//             </div>
//           ) : (<ReloadOutlined />)} onClick={() => { setApi(true) }} />
//         </Menu>
//       </Sider>

//       <Modal
//         visible={isModalVisible1}
//         onCancel={() => handleCancel(1)}
//         footer={null}
//         centered
//       >
//         <div style={{ marginBottom: '20px' }}>
//           {/* Input and password handling UI here... */}
//         </div>
//         <Button type="primary" style={{ backgroundColor: "#0056b3" }} onClick={handlePassword}>
//           {inputCondition === "verify" ? "Next" : inputCondition === "update" ? "Save Password" : "Confirm"}
//         </Button>
//       </Modal>
//     </Layout>
//   );
// };

// export default SideNavbarComponent;

