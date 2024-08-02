"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Router } from "@mui/icons-material";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";
import StudentDeleteModal from "../StudentDelete";

export default function DeleteIconComponent({user}){
  const router = useRouter();
    
  const [isHovered, setIsHovered] = useState(false);
  const [isModalVisible6,setIsModalVisible6] = useState(false)

  



const handleCancel= () => {
setIsModalVisible6(false)
}
  
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
      onClick={() => setIsModalVisible6(true)} // Change to this
    >
      <DeleteOutlined
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

<StudentDeleteModal isOpen={isModalVisible6} onClose={()=>{handleCancel()}} userToDelete={user}/>
</>
)
};
