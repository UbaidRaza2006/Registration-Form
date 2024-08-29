"use client"



import React, { useState, useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';

const OtherVerificationButton = ({ id, userOtherStatus }) => {
  const [otherButtonText, setOtherButtonText] = useState("Pending");
  const [otherButtonColor, setOtherButtonColor] = useState("blue");
  const [otherStatus,setOtherStatus] = useState(userOtherStatus)

  useEffect(() => {

    setOtherStatus(userOtherStatus)
    if(userOtherStatus === "Pending"){
      setOtherButtonColor("blue")
      setOtherButtonText("Pending")
    }
    else if(userOtherStatus === "Enrolled"){
      setOtherButtonColor("yellow")
      setOtherButtonText("Enrolled")
    }
    else if(userOtherStatus === "Completed"){
        setOtherButtonColor("green")
        setOtherButtonText("Completed")
      }
 // setButtonText(status === 'verified' ? 'Verified' : 'Un-verified');
    // setButtonColor(status === 'verified' ? 'green' : 'red');
  }, [userOtherStatus]);

  const updateUserOtherStatus = async (id, newOtherStatus) => {
    // const newStatus = status === 'verified' ? 'un-verified' : 'verified';
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ otherStatus:newOtherStatus }),
      });
      const data = await response.json();
      if (data.success) {
        // setStatus(newStatus);
        toast.success(data.result.otherStatus, {
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
        console.log(data.result);
// setButtonText(newStatus === 'verified' ? 'Verified' : 'Un-verified');
// setButtonColor(newStatus === 'verified' ? 'green' : 'red');
        // Optionally, you can perform any additional actions upon successful status update
      } else {
        console.error('Error updating user status:', data.error);
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
        // Handle error if status update fails
      }
    } catch (error) {
      console.error('Error updating user status:', error);
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
      // Handle error if fetch request fails
    }
  };

 

  // Function to handle button click
  const handleButtonClick = () => {
    // Toggle the verification status and update button text and color accordingly
    const newOtherStatus = 
  otherStatus === 'Pending' ? 'Enrolled' : 
  otherStatus === 'Enrolled' ? 'Completed' : 
  'Pending';
    // console.log("status-->",status)
    setOtherStatus(newOtherStatus);
    setOtherButtonText(newOtherStatus === 'Pending' ? 'Pending' : 
        newOtherStatus === 'Enrolled' ? 'Enrolled' : 
        newOtherStatus === 'Completed' ? 'Completed' : '');
    setOtherButtonColor(newOtherStatus === 'Pending' ? 'blue' : 
        newOtherStatus === 'Enrolled' ? 'yellow' : 
        newOtherStatus === 'Completed' ? 'green' : 
        '');

    // Call updateUser function to update user data
    updateUserOtherStatus(id, newOtherStatus);
  };

  return (
    <button
      style={{ opacity: '80%', backgroundColor: otherButtonColor, width: '100px', height: '30px', color: 'white', padding: '5px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
      onClick={handleButtonClick}
    >
      {otherButtonText}
    </button>
  );
};

export default OtherVerificationButton;