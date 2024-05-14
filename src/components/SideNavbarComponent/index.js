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
  GlobalOutlined,
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
  CloseOutlined,
  EyeOutlined,
  PlusOutlined,
  ReloadOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

import { usePassword } from '../../context';
import { Icon, backdropClasses } from '@mui/material';
import Batch from '../CourseBatch';
import Image from 'next/image';
import AdmissionModal from '../CourseAdmission';
import ReactModal from 'react-modal';
import BatchModal from '../CourseBatch';
import DeleteModal from '../CourseDelete';
import img from "../../../public/images/—Pngtree—line building dubai city silhouette_5978784.png"
import img1 from "../../../public/images/images1.png"
import InputComponent from '../InputComponent';
import { Bounce, toast } from 'react-toastify';
const { Sider } = Layout;




function SideNavbarComponent() {


  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [isModalVisible4, setIsModalVisible4] = useState(false);
  const [isModalVisible5, setIsModalVisible5] = useState(false);
  const [isModalVisible6, setIsModalVisible6] = useState(false);
  const [isModalVisible7, setIsModalVisible7] = useState(false);
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
  const [courseName, setCourseName] = useState("")


  const [allCourses, setAllCourses] = useState([])
  const [uniqueCities, setUniqueCities] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [searchedCities, setSearchedCities] = useState([])
  const [batchValues, setBatchValues] = useState(Array(allCourses.length).fill(0));

  const [currentUser, setCurrentUser] = useState(null)
  const [isAdding, setIsAdding] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  // const [selectedItemData, setSelectedItemData] = useState(null)


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

  const customStyles1 = {
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 1000
    },
    content: {
      backgroundColor:'rgba(204, 227, 230, 0.98)',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      border: 'none',
      borderRadius: '8px',
      padding: '20px',
      width: '400px', // Reduced width for a narrower modal
      maxHeight: '500px', // Increased height for more content space
      height:'450px',
      overflow: 'hidden', // Prevent modal overflow
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
      // backgroundColor: '#f5f5f5', // Light grey background
      color: '#333', // Dark grey text color
      fontFamily: 'Georgia, serif', // Classic serif font
      display: 'flex',
      flexDirection: 'column'
    }
  };
  


  const { api, setApi, allowAdmission, setAllowAdmission, coursesToLoad, setCoursesToLoad, sideNavbarCity,setSideNavbarCity } = usePassword();

  console.log(inputCondition)
  console.log(inputPassword)

  useEffect(() => {
    console.log("admin", admin)
    if (admin) {
      setAdmissionsOpen(admin.admissions)
    }

  }, [admin])



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

  useEffect(() => {
    if(allCourses.length>0){
      gettingCities()
    };
  }, [allCourses])

  // useEffect(() => {
  //   if(api){
  //     gettingCities()
  //   };
  // }, [api])

  
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
      updateAdminPassword(admin._id)
      setInputPassword("")
      setInputCondition("done")

      // alert(`Password changed into "${inputPassword}" `)
    }
    else {
      toast.error('Type again!', {
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
          toast.success(`New Password: ${data.result.adminPassword}`, {
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
          gettingAdmin()
          handleCancel(1)
          setInputCondition("verify")
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
      }
      else {
        console.log("adminPassword nhi araha")
      }
    }
    catch (error) {
      console.log("error-->", error)
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
          toast.success(`Message sent.....  ${data.result.textAdmission}`, {
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
          setMessage("")
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
      }
      else {
        console.log("Message nhi araha")
      }
    }
    catch (error) {
      console.log("error-->", error)
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
        toast.success(`Admissions are.. ${data.result.admissions}`, {
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
        
        setAllowAdmission(data.result.admissions)
        // setInputCondition("verify")
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
      // }
      // else{
      //   console.log("adminsOpen nhi araha")
      // }
    }
    catch (error) {
      console.log("error-->", error)
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
    else if (par === 6) {
      console.log("showModal", par)
      // console.log("item", itemData)
      setCurrentUser(itemData)
      setIsModalVisible6(true)
    }
    else if (par === 7) {
      console.log("showModal", par)
      setIsModalVisible7(true)
    }
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
    else if (par === 6) {
      console.log("closeModal", par)
      setIsModalVisible6(false)
    }
    else if (par === 7) {
      console.log("closeModal", par)
      setIsModalVisible7(false)
    }
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
      if(data.success){
      setAdmin(data.data[0])
      }
      else{
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

        const sortedCourses = courses.slice().sort((a, b) => {
          const courseA = a.course.toLowerCase(); // Convert to lowercase for case-insensitive sorting
          const courseB = b.course.toLowerCase();
        
          // Natural sorting using localeCompare with options
          return courseA.localeCompare(courseB, undefined, { numeric: true });
        });



        setAllCourses(courses);
        setCoursesToLoad(false)
      } else {
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
        setAllCourses([]);
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

  const gettingCities = async () => {
    console.log("gettingCities")
    try {
      const res = await fetch("/api/getCities", {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      if(data.success){
      setUniqueCities(data.data)
      console.log("UniqueCities-->",data.data)
      }
      else{
        console.log(data)
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
      console.error("Error fetching cities:", error);
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


  // const handleBatchChange = (index, value) => {
  //   const newBatchValues = [...batchValues];
  //   newBatchValues[index] += value;
  //   setBatchValues(newBatchValues);
  // };


  const reloadButton = () => {
    console.log("reloadButton")
    setCoursesToLoad(true)
  }

  const addCourse = async () => {
    console.log("courseName-->",courseName)
    const formattedValue = courseName.trim().replace(/\s+/g, ' ');
    console.log("formattedValue-->",formattedValue)

      try {
          const response = await fetch("/api/addCourse",
              {
                  method: 'POST',
                  headers: {
                      'content-type': 'application/json',
                  },
                  body: JSON.stringify({course:formattedValue, admission: "Closed", batch: 1 })
  
                  
              });
              
              const data = await response.json()
              if(data.success){
                toast.success('Course Added!', {
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
                console.log("data-->",data)
              }
              else{
                console.log("data-->",data)
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
              
          } 
          catch (e) {
              console.log('error', e);
              toast.error(e, {
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

      const searchingCities = (uniqueCities, searchTerm) => {
        console.log("function running here are searchCities value -->", searchTerm); // Log searchTerm for debugging
        const lowerCaseTerm = searchTerm.toLowerCase(); // Ensure case-insensitive search
      
        // If searchTerm is empty, return all uniqueCities in lowercase for comparison:
        if (!searchTerm) {
          return uniqueCities.map(city => ({ ...city, _id: city._id.toLowerCase() }));
        }
      
        return uniqueCities.filter((city) => {
          const lowerCaseCity = city._id.toLowerCase();
          // Combine prefix and substring search:
          return lowerCaseCity.startsWith(lowerCaseTerm) || lowerCaseCity.includes(lowerCaseTerm);
        });
      };

      const eyeOutlinedClick = (value) => {
        console.log("sideNavbarCity-->",value)
        setSideNavbarCity(value)
      };

      
      useEffect(() => {
        const handleSearch = async () => {
          setIsLoading(true); // Set loading state to true
          try {
            const newSearchedCities = await searchingCities(uniqueCities, searchTerm);
            setSearchedCities(newSearchedCities);
            if(newSearchedCities.length===0){
              toast.error("City not Found!", {
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
            console.error('Error performing search:', error);
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
            // Handle errors appropriately (e.g., display an error message)
          } finally {
            setIsLoading(false); // Set loading state to false regardless of success or error
          }
        };
      
        if (searchTerm) {
          handleSearch();
        }
      }, [searchTerm, uniqueCities]);



  return (
    <Layout style={{ height: '100%', position: 'fixed', marginTop: '-20px' }}>
      <Sider style={{ backgroundColor: "#0E4C92", paddingTop: '10px', height: "100%" }} width={80} theme="dark">
        <Menu mode="vertical" className='space-y-5' style={{ backgroundColor: "#0E4C92" }} theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="i1" icon={<Image style={{ borderRadius: "20px", marginLeft: '-25%', width: "100%" }}   width={600} height={400} src='/images/BhattiSahab.jpg' alt='User' />} />
          <Menu.Item key="1" icon={<LockOutlined />} onClick={() => showModal(1)} />
          <Menu.Item key="2" icon={<StopOutlined />} onClick={() => showModal(2)} />
          <Menu.Item key="3" icon={<LaptopOutlined />} onClick={() => showModal(3)} />
          <Menu.Item key="4" icon={<GlobalOutlined/>} onClick={() => showModal(7)} />
          <Menu.Item key="5" icon={api ? (
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


          {/* ye admin password ka he... */}
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

      {/* ye admissions off ka he.... */}
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




      {/* ye courses ka he..           */}
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
       label="Course"
       className="border border-gray-300 rounded-md px-3 py-2 w-80 mr-2"
       value={courseName}
       onChange={(event) => {

           const newCourse = event.target.value;

           // Capitalize the first letter of each word
           const formattedCourse = newCourse.replace(/\b\w/g, (char) => char.toUpperCase());
          // console.log("formattedCourse-->",formattedCourse)
           // Update the state with the formatted name
           setCourseName(formattedCourse)
       }} 
        
      />
      <Button
        style={{ backgroundColor: "dark-blue" }}
        className="bg-blue-900 h-10 text-white text-antique-white rounded-md justify-between items-center text-center"
        onClick={()=>{addCourse()}}
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
    <div className="w-full h-[250px] overflow-y-auto overflow-x-hidden max-h-[250px] rounded-md border-4 border-[#4d4b4b]" 
    // style={scrollStyles}
    >
      <table className="w-[528px]">
      <thead className='border-b-2 border-[#4d4b4b]'>
          <tr className=" text-white text-1xl font-large ">
            <th className="px-6 py-3 bg-[#9e9e9efa] border-r-3 border-[#4d4b4b] w-[275px]">Course</th>
            <th className="px-3 py-3 bg-[#8d8c8cfa] border-r-3 border-[#4d4b4b] text-center">Batch</th>
            <th className="px-3 py-3 bg-[#9e9e9efa] border-r-3 border-[#4d4b4b]  text-center">Admission</th>
            <th className="px-3 py-3 bg-[#8d8c8cfa] border-r-3 border-[#4d4b4b] w-[80px] text-center">Delete</th>
          </tr>
        </thead>
        <tbody className=''>
          {
            allCourses.length>0?

          allCourses.map((item) => (
                <tr key={item._id} className="border-b border-gray-300"> {/* Added bottom border to each row */}
                  <td className="px-3 py-3 ">{item.course}</td>
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
                    <Button style={{ backgroundColor: "dark-blue" }} className="bg-blue-900 h-10 text-white  text-antique-white rounded-md justify-between items-center  text-center" onClick={()=>{showModal(6 , item)}}><DeleteOutlined /></Button>
                  </td>
                </tr>
              ))
              
              :
              <tr>
     <td colSpan="4">
              <div className="flex justify-center items-center mt-[-25px] ml-[265px] h-screen w-[10px]">
      <div className="flex mt-[-370px] space-x-4">
        <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
        <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
        <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
        <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
        {/* <div className="loader-dot w-4 h-4 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}></div> */}
      </div>
     </div>
     </td>
     </tr>

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


      {/* <ReactModal
  isOpen={isModalVisible7}
  onRequestClose={() => handleCancel(7)}
  style={customStyles1}
  contentLabel="Custom Modal"
>
  <div className="py-4 px-8 bg-white rounded-lg shadow-lg">
    <h1>Data</h1>
  </div>
      </ReactModal> */}



      {/* ye cities ka he... */}
      <ReactModal
        isOpen={isModalVisible7}
        onRequestClose={() => handleCancel(7)}
        style={customStyles1}
        contentLabel="Custom Modal"
      >
        <div className="flex flex-col w-full h-full">  {/* Full modal width and height */}
        <ReloadOutlined onClick={() => gettingCities()} className='absolute left-2 top-2 text-gray-500 cursor-pointer' />
        <CloseOutlined onClick={() => handleCancel(7)} className='absolute right-2 top-2 text-gray-500 cursor-pointer' />
          <div className="flex-grow overflow-hidden"> {/* Upper section with content, hidden overflow */}
            <h1 className="text-3xl font-bold text-center mb-2">Students From Everywhere</h1>
          </div>

          <div className='mt-4 border-4 border-[#0e686efa] hover:border-[#50b6b9fa] rounded-xl h-12'>
          <InputComponent
                        type="text"
                        placeholder="Search"
                        label=""
                        value={searchTerm}
                        onChange={(event) => {

                            const newValue = event.target.value;

                            // Capitalize the first letter of each word
                            const formattedValue = newValue.replace(/\b\w/g, (char) => char.toUpperCase());

                            // Update the state with the formatted name
                            setSearchTerm(formattedValue)
                            console.log(formattedValue)
                        }} />
          </div>




<div className="overflow-y-auto border-4 border-[#0e686efa] bg-[#e2f0f1fa] mx-auto mt-4 rounded-xl shadow-xl w-[80%] h-[70%]">
  <ul className="divide-y divide-gray-200 list-none">
    {/* Display loading message if searchTerm has a value and searchedCities are not yet available */}
    {searchTerm && !searchedCities && (
      <p className="text-center text-gray-500">Searching...</p>
    )}

    {/* Display searched cities if searchTerm has a value and searchedCities are available */}
    {searchTerm && searchedCities?.length > 0 && (
      searchedCities.map((city, index) => (
        <li key={index} className="py-2 pl-1 pr-6 flex items-center hover:bg-[#adc7c9fa]"> {/* Classic and subtle hover effect */}
                    <span className="flex-shrink-0 h-10 w-10 ml-[5px] rounded-md focus:bg-[#e2f0f1fa]  text-white bg-gray-900 flex items-center justify-center mr-4">
                      {/* Replace with your desired Ant Design icon */}
                      {/* <Icon name="icon-name" className="h-4 w-4" /> */}
                      <Image src={img} alt='Some'/>
                      {/* <Image src={img1} alt='Some' className='bg-current'/> */}
                    </span>
                    <span className="text-lg ml-3">{city._id}</span>
                    <span className="flex-shrink-0 h-6 w-6 rounded-md text-gray-900 border-2 border-[#0e686efa] flex items-center justify-center ml-auto mr-[-10px]">
                      {/* Replace with your desired Ant Design icon */}
                      {/* <Icon name="icon-name" className="h-4 w-4" /> */}
                          <EyeOutlined onClick={()=>{eyeOutlinedClick(city._id)}}/>
                      {/* <Image src={img1} alt='Some' className='bg-current'/> */}
                    </span>
                  </li>
      ))
    )}

    {/* Display message if searchTerm has a value but searchedCities is empty */}
    {searchTerm && searchedCities?.length === 0 && (
      <p className="text-center text-gray-500">No results found for your search.</p>
    )}

    {/* Display uniqueCities if searchTerm is empty or searchedCities are not yet available (or there's an error) */}
    {!searchTerm  && ( // Use optional chaining and error stat
      uniqueCities.map((city, index) => (
        <li key={index} className="py-2 pl-1 pr-6 flex items-center hover:bg-[#adc7c9fa]"> {/* Classic and subtle hover effect */}
                    <span className="flex-shrink-0 h-10 w-10 ml-[5px] rounded-md hover:bg-[#e2f0f1fa]  text-white bg-gray-900 flex items-center justify-center mr-4">
                      {/* Replace with your desired Ant Design icon */}
                      {/* <Icon name="icon-name" className="h-4 w-4" /> */}
                      <Image src={img} alt='Some'/>
                      {/* <Image src={img1} alt='Some' className='bg-current'/> */}
                    </span>
                    <span className="text-lg ml-3">{city._id}</span>
                    <span className="flex-shrink-0 h-6 w-6 rounded-md text-gray-900 border-2 border-[#0e686efa] flex items-center justify-center ml-auto mr-[-10px]">
                      {/* Replace with your desired Ant Design icon */}
                      {/* <Icon name="icon-name" className="h-4 w-4" /> */}
                          <EyeOutlined onClick={()=>{eyeOutlinedClick(city._id)}}/>
                      {/* <Image src={img1} alt='Some' className='bg-current'/> */}
                    </span>
                  </li>
      ))
    )}
  </ul>
</div>

        </div>
      </ReactModal>


<BatchModal isOpen={isModalVisible4} onClose={()=>{handleCancel(4)}} user={currentUser}/>
<AdmissionModal isOpen={isModalVisible5} onClose={()=>{handleCancel(5)}} user={currentUser}/>
<DeleteModal isOpen={isModalVisible6} onClose={()=>{handleCancel(6)}} user={currentUser}/>

    </Layout>
  );
};

export default SideNavbarComponent;


