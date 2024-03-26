import React, { useEffect, useState } from 'react';
import { Button,  Input,  InputNumber, Layout, Menu, Modal, Switch } from 'antd';
import {ClassroomOutlined} from '@ant-design/icons';
import {
  UserOutlined,
  LaptopOutlined,
  BlockOutlined,
  LockOutlined,
  StopOutlined,
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

    const [admissionsOpen, setAdmissionsOpen] = useState(true);
    
    const [admin,setAdmin] = useState(null)
    const [admissions,setAdmissions] = useState("")
    const [adminName,setAdminName] = useState("")
    const [adminPassword,setAdminPassword] = useState("")





const { password, setPassword,api,setApi,admission,setAdmission} = usePassword();

console.log(inputCondition)
console.log(inputPassword)

useEffect(()=>{
  console.log("admin",admin)

},[admin])


useEffect(()=>{
  setAdmissionsOpen(admissions)
  console.log("admission-->",admissions);
},[admissions])

useEffect(()=>{
  gettingAdmin();
},[])



const updateAdmin = async (adminId) => {


try{
  if(adminPassword){
  let data = await fetch(`http://localhost:3000/api/admins/${adminId}`, {
    method: "PUT",
    body: JSON.stringify({ _id: adminId, adminPassword}), headers: {
      "Content-Type": "application/json"
    }
  })
  data = await data.json()
  console.log(data,`http://localhost:3000/api/admins/${adminId}`)
  // console.log("info-->",data);
  if (data.success) {
    alert("Passowrd has been Updated!.. into  ",data.result.adminPassword)
    // setOpen(false);
  }
  else {
    console.log(data);
  }}
}
catch(error){
  console.log("error-->",error)
}
}


const handleSwitchChange = () => {
  setAdmissionsOpen(!admissionsOpen);
  setAdmission(!admission)
  // handleAdmissionsChange(!admissionsOpen);
};


const handlePassword = () => {


  if(inputCondition === "verify"){
    if(inputPassword===admin.adminPassword){
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
      updateAdmin("66032b8c2c0200b18d1d8a4c")
      setInputPassword("")
      setInputCondition("verify")

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
//     else if(par===3){
//  console.log("showModal", par)
//  setIsModalVisible3(true)
    // }
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
    // else if(par===3){
    // console.log("closeModal", par)
    // setIsModalVisible3(false)
    // }
  };

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
      <div style={{ marginBottom: '20px' }}>
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
            backgroundColor: admissionsOpen ? '#1890ff' : '#f5222d',
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
              transform: admissionsOpen ? 'translateX(58px)' : 'translateX(2px)',
              transition: 'transform 0.3s',
            }}
          />
        </div>
        <p style={{ fontSize: '18px', marginTop: '20px', color: '#333' }}>{admissionsOpen ? 'Open' : 'Closed'}</p>
        <Button type="primary" style={{ width: '60%', backgroundColor: '#0056b3', color: 'white', border: 'none', marginTop: '20px' }} onClick={() => {handleCancel(2)}}>Back</Button>
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

