import React, { useEffect, useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";
// import 'antd/dist/antd.css';

const EyeViewDrawerApp = ({id}) => {
  const [open, setOpen] = useState(false);
  const [idForUser, setIdForUser] = useState({});
  const [viewData,setViewData] = useState({})




  // useEffect(()=>{
  //   getUserData();
  // },[])

  const getUserData =async(userId)=> {
    console.log("idForUser-->",userId);
    let userData = await fetch(`http://localhost:3000/api/students/${userId}`)
    userData= await userData.json()
    console.log(userData);
    if(userData.success){
        let result = userData.result
        setViewData(result)
        console.log(viewData);
        // handleDownload();
    }


}


const showDrawer = () => {
  console.log("idForUser-->", id); // Access the id here
  setIdForUser(id);
  getUserData(id); // Pass the id to getUserData function
  setOpen(true);
};


  const onClose = () => {
    setOpen(false);
  setIdForUser(null)

  };

  const [isHovered, setIsHovered] = useState(false);

 
  return (
    <>
      <Button
      style={{
        border: "none",
        marginBottom: '5px',
        position: 'relative', // Ensure position is set to relative for proper icon positioning
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={showDrawer}
    >
      <EyeOutlined
        style={{
          cursor: "pointer",
          fontSize: isHovered ? '20px' : '16px', // Set the desired sizes
          position: 'absolute', // Position the icon absolutely within the button
          top: '50%', // Center the icon vertically
          left: '50%', // Center the icon horizontally
          transform: 'translate(-50%, -50%)', // Center the icon perfectly
        }}
      />
    </Button>

      <Drawer
        title="Student Information"
        width={720}
        onClose={onClose}
        visible={open}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onClose} type="primary">
              Submit
            </Button>
          </Space>
        }
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            backgroundColor: "#fff",
            border: "1px solid #ddd",
            padding: "20px",
          }}
        >
          <div>
          <img
            src={viewData.imageUrl}
            alt="Student"
            style={{
              width: "20%",
              height: "auto",
              marginBottom: "10px",
              borderRadius: "50%",
            }}
          />
          </div>
          
          <div className="space-y-3">
            <p>Name: {viewData.fullName}</p>
            <p>Fathers Name: {viewData.fatherName}</p>
            <p>CNIC: {viewData.cnic}</p>
            <p>Course: {viewData.course}</p>
            <p>Gender: {viewData.gender}</p>
            <p>Batch: {viewData.batch}</p>
            <p>Email: {viewData.email}</p>
            <p>City: {viewData.city}</p>
            <p>Date of Birth: {viewData.dateOfBirth}</p>
            <p>Qualification: {viewData.qualification}</p>
            <p>Address: {viewData.address}</p>
          </div>

        </div>
      </Drawer>

    </>
  );
};

export default EyeViewDrawerApp;
