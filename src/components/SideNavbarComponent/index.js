import React, { useEffect, useState } from 'react';
import { Button,  Input,  InputNumber, Layout, Menu, Modal } from 'antd';
import "./index.css"
import {ClassroomOutlined} from '@ant-design/icons';
import {
  UserOutlined,
  LaptopOutlined,
  BlockOutlined,
  LockOutlined,
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
  ReloadOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';

import { usePassword } from '../../context';
import { backdropClasses } from '@mui/material';
const { Sider } = Layout;




function SideNavbarComponent () {
  const [isModalVisible1, setIsModalVisible1] = useState(false);
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [isModalVisible3, setIsModalVisible3] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [inputPassword, setInputPassword] = useState('');
  const [recheckPassword, setRecheckPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inputCondition, setInputCondition] = useState("verify");

    const [admissionsOpen, setAdmissionsOpen] = useState("");
    
    const [admin,setAdmin] = useState(null)
    const [admissions,setAdmissions] = useState("")
    const [adminName,setAdminName] = useState("")
    const [adminPassword,setAdminPassword] = useState("")
    const [message,setMessage] = useState("")


  const [allCourses,setAllCourses] = useState([])
  const [batchValues, setBatchValues] = useState(Array(allCourses.length).fill(0));


const { api,setApi,allowAdmission,setAllowAdmission} = usePassword();

console.log(inputCondition)
console.log(inputPassword)

useEffect(()=>{
  console.log("admin",admin)
  if(admin){
    setAdmissionsOpen(admin.admissions)
  }

},[admin])


// useEffect(()=>{
//   setAdmissionsOpen(admissions)
//   console.log("admission-->",admissions);
// },[admissions])

useEffect(()=>{
  gettingCourses();
},[isModalVisible3])

useEffect(()=>{
  gettingAdmin();
},[isModalVisible2])

const updateMesssage = async (adminId) => {


  try{
    if(message){
    let data = await fetch(`http://localhost:3000/api/admins/${adminId}`, {
      method: "PUT",
      body: JSON.stringify({ _id: adminId, textAdmission:message}), headers: {
        "Content-Type": "application/json"
      }
    })
    data = await data.json()
    console.log(data,`http://localhost:3000/api/admins/${adminId}`)
    // console.log("info-->",data);
    if (data.success) {
      alert(`Message has been sent.....  ${data.result.textAdmission}`)
      setMessage("")
    }
    else {
      console.log(data);
    }}
    else{
      console.log("Message nhi araha")
    }
  }
  catch(error){
    console.log("error-->",error)
  }
  }

const updateAdminPassword = async (adminId) => {


try{
  if(inputPassword){
  let data = await fetch(`http://localhost:3000/api/admins/${adminId}`, {
    method: "PUT",
    body: JSON.stringify({ _id: adminId, adminPassword:inputPassword}), headers: {
      "Content-Type": "application/json"
    }
  })
  data = await data.json()
  console.log(data,`http://localhost:3000/api/admins/${adminId}`)
  // console.log("info-->",data);
  if (data.success) {
    alert(`Passowrd has been Updated!.. into  ${data.result.adminPassword}`)
    setInputCondition("verify")
    // setOpen(false);
  }
  else {
    console.log(data);
  }}
  else{
    console.log("adminPassword nhi araha")
  }
}
catch(error){
  console.log("error-->",error)
}
}

const updateAdmissions = async (adminId, newStatus) => {


  try{
    // if(admissionsOpen){
    let data = await fetch(`http://localhost:3000/api/admins/${adminId}`, {
      method: "PUT",
      body: JSON.stringify({ _id: adminId, admissions:newStatus ,textAdmission: "" }), headers: {
        "Content-Type": "application/json"
      }
    })
    data = await data.json()
    console.log(data,`http://localhost:3000/api/admins/${adminId}`)
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
  catch(error){
    console.log("error-->",error)
  }
  }


  const handleSwitchChange = () => {
    const newStatus = admissionsOpen === "Open" ? "Close" : "Open";
    setAdmissionsOpen(newStatus);
    updateAdmissions(admin._id, newStatus); // Update admission status
  };

// setAdmission(!admission)
// handleAdmissionsChange(!admissionsOpen);


const handlePassword = () => {


  if(inputCondition === "verify"){
    if(inputPassword===admin.adminPassword){
      console.log(admin.adminPassword)
setInputCondition("update")
setInputPassword("")
    }
    else{
      alert("First , enter correct current Password")
    }
  }
  else if(inputCondition === "update"){
    if(inputPassword){
    setRecheckPassword(inputPassword)
    setInputPassword("")
setInputCondition("recheck")
    }
  }
  else if(inputCondition === "recheck"){
    if(inputPassword === recheckPassword){
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


  const showModal = (par) => {
    if(par===1){
 console.log("showModal", par)
 setIsModalVisible1(true)
    }
    else if(par===2){
 console.log("showModal", par)
 setIsModalVisible2(true)
    }
    else if(par===3){
 console.log("showModal", par)
 setIsModalVisible3(true)
    }
  };

  const handleCancel = (par) => {
    if(par===1){
    console.log("closeModal", par)
    setIsModalVisible1(false)
    }
    else if(par===2){
    console.log("closeModal", par)
    setIsModalVisible2(false)
    }
    else if(par===3){
    console.log("closeModal", par)
    setIsModalVisible3(false)
    }
  };
  
  const back = () => {
    if(inputCondition==="update"){
      setInputCondition("verify")
    }
    else if(inputCondition==="recheck"){
      setInputCondition("update")
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const gettingAdmin = async () => {
    console.log("gettingAdmin")
    try {
      const res = await fetch("http://localhost:3000/api/admins", {
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
      const res = await fetch("http://localhost:3000/api/courses", {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      // console.log(data)
  
      if (data.success) {
        const courses = Array.isArray(data.data) ? data.data : [data.data]; // Use data.data directly
        console.log("allCourses-->",courses)
        setAllCourses(courses);
      } else {
        setAllCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };


  const handleBatchChange = (index, value) => {
    const newBatchValues = [...batchValues];
    newBatchValues[index] += value;
    setBatchValues(newBatchValues);
  };


  return (
    <Layout style={{ minHeight: '100vh', position: 'fixed', marginTop: '-20px' }}>
      <Sider style={{ backgroundColor: "#0E4C92", paddingTop: '10px' }} width={80} theme="dark">
        <Menu mode="vertical" className='space-y-5' style={{ backgroundColor: "#0E4C92" }} theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="i1" icon={<img style={{ borderRadius: "20px", marginLeft: '-25%', width: "100%" }} src='/images/BhattiSahab.jpg' alt='User' />}  />
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
      {inputCondition=== "done"?(<div className="flex justify-center items-center h-[140px]">
      <div className="flex  space-x-4">
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}></div>
      </div>
    </div>):(<><div style={{ marginBottom: '20px' }}>
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
      <Button type="primary" style={{backgroundColor:"#0056b3"}} onClick={handlePassword}>{inputCondition === "verify"? "Next" : inputCondition === "update" ? "Save Password": "Confirm"}</Button>
      <Button type="primary" style={{backgroundColor:"#0056b3", marginLeft:"250px"}} onClick={()=>{back()}}>Back</Button>
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
              transform: admissionsOpen === "Open"? 'translateX(58px)' : 'translateX(2px)',
              transition: 'transform 0.3s',
            }}
          />
        </div>
        {admissionsOpen === "Close"?(<><p style={{ fontSize: '18px', marginTop: '20px', color: '#333' }}>Enter The Message for Users, while courses are Closed</p> <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter Message"
          
        />
        <Button type="primary" style={{ width: '60%', backgroundColor: '#0056b3', color: 'white', border: 'none', marginTop: '20px' }} onClick={() => {updateMesssage(admin._id)}}>Message Done</Button></>):null}
       
       
        <Button type="primary" style={{ width: '60%', backgroundColor: '#0056b3', color: 'white', border: 'none', marginTop: '20px' }} onClick={() => {handleCancel(2)}}>Back</Button>
      </div>
    </Modal>
  

   


    <Modal
// style={{ width: "700px !important" }} 
// id="modal3" 
  visible={isModalVisible3}
  onCancel={() => handleCancel(3)}
  footer={null}
  centered
>
  <div style={{width:"500px"}} className="p-8 bg-white-900 rounded-lg w-[750px] h-[450px] shadow-lg ">  {/* Added overflow-auto for scrollbar */}
    <h2 className="text-3xl font-serif text-dark-brown mb-6">Add Course</h2>
    <div className="mb-6 flex items-center">
      <Input
        type="text"
        placeholder="Enter Course"
        className="border border-gray-300 rounded-md px-3 py-2 w-80 mr-2"
      />
      <Button style={{backgroundColor:"dark-blue"}} className="bg-blue-900 h-10 text-white  text-antique-white rounded-md justify-between items-center  text-center">Add Course</Button>
    </div>
<div className= "w-[100%] h-[250px] overflow-auto">
    <table className="w-full  mb-6">
      <thead >
        <tr className="bg-gray-400  text-white text-1xl font-medium">
          <th className="px-6 py-3 border border-gray-900 w-[300px]">Course</th>
          <th className="px-3 py-3 border border-gray-900 text-center">Batch</th>
          <th className="px-3 py-3 border border-gray-900 text-center">Admission</th>
          <th className="px-3 py-3 border border-gray-900 text-center">Delete</th>
        </tr>
      </thead>
      <tbody>
        {allCourses.map((item, index) => (
          <tr key={index} className="border-b border-gray-300"> {/* Added bottom border to each row */}
            <td className="px-6 py-3">{item.course}</td>
            <td className="px-3 py-3">
              <div className="flex items-center justify-center">
                <span className="cursor-pointer mr-1" onClick={() => handleBatchChange(index, -1)}>-</span>
                <div
                  // type="text"
                  className="border border-gray-300 bg-gray-500 text-white rounded-md px-2 py-1 w-12 text-center"
                  // value="5"
                  // readOnly
                >{item.batch + batchValues[index]}</div>
                <span className="cursor-pointer ml-1"onClick={() => handleBatchChange(index, +1)}>+</span>
              </div>
            </td>
            <td className="px-3 py-3">
              <div
                onClick={handleSwitchChange}
                className="flex items-center justify-center"
                style={{
                  width: '60px',
                  height: '30px',
                  border: '2px solid #ccc',
                  borderRadius: '15px',
                  backgroundColor: item.admission === "Open" ? '#1890ff' : '#f5222d',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s',
                }}
              >
                <div
                  style={{
                    width: '26px',
                    height: '26px',
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.2)',
                    transform: item.admission === "Open" ? 'translateX(16px)' : 'translateX(-16px)',
                    transition: 'transform 0.3s',
                  }}
                />
              </div>
            </td>
            <td>
            <Button style={{backgroundColor:"dark-blue"}} className="bg-blue-900 h-10 text-white  text-antique-white rounded-md justify-between items-center  text-center"><EditOutlined/></Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  
    <Button style={{backgroundColor:"dark-blue"}} className="bg-blue-900 h-8 text-white text-antique-white  rounded-md justify-content-center justify-between items-center  text-center" onClick={() => handleCancel(3)} >Close</Button>
  </div>
</Modal>




    
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

