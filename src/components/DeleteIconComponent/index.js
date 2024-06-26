"use client"

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Router } from "@mui/icons-material";
import { Button } from "antd";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Bounce, toast } from "react-toastify";

export default function DeleteIconComponent({id}){
  const router = useRouter();
    
  const [isHovered, setIsHovered] = useState(false);

const deleteUser =async ()=>{

  console.log("id-->",id)
let response = await fetch(`/api/students/${id}`,{
  method:"delete"
})
response= await response.json()
if(response.success){
  toast.success('Student Removed!', {
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
  // router.replace("/registration")

}

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
      onClick={deleteUser}
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
</>
)
};
