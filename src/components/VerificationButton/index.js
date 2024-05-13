"use client"

// import React, { useEffect, useState } from 'react';

// const VerificationButton = ({id}) => {
//   const [verified, setVerified] = useState(true); // Initial state is verified
//   const [buttonText, setButtonText] = useState('Pending');
//   const [buttonColor, setButtonColor] = useState('blue');




//   useEffect(()=>{
//     getUserData(id);

    
//   },[])

//   const getUserData = async (userId) => {
//     console.log("idForUser-->", userId);
//     let statusData = await fetch(`/api/students/${userId}`)
//     statusData = await statusData.json()
//     console.log(statusData);
//     if (statusData.success) {
//       let data = statusData.result


//     }


//   }


//   const updateUser = async (userId,newStatus) => {

//     // if (!mongoose.Types.ObjectId.isValid(userId)) {
//     //   console.log('Invalid userId format');
//     //   console.log(userId)
//     //   return NextResponse.json({
//     //     success: false,
//     //     error: 'Invalid userId format',
//     //   });

//     // }

//     // handleButtonClick()


//     let data = await fetch(`/api/students/${userId}`, {
//       method: "PUT",
//       body: JSON.stringify({ _id: userId, address, batch, city, cnic, course, dateOfBirth, email, fatherName, fullName, gender, imageUrl, payment,paymentImg, phone, qualification, rollNo, status:newStatus }), headers: {
//         "Content-Type": "application/json"
//       }
//     })
//     data = await data.json()
//     // console.log("info-->",data);
//     if (data.success) {
//       alert("User has been Updated!..")
//       // setOpen(false);
//     }
//     else {
//       console.log(data);
//     }
//   }




//   // Function to handle button click
//   const handleButtonClick = () => {
//     // Toggle the verification status and update button text and color accordingly
//     const newStatus = status === 'verified' ? 'un-verified' : 'verified';
//     setStatus(newStatus);
//     setButtonText(newStatus === 'verified' ? 'Verified' : 'Un-verified');
//     setButtonColor(newStatus === 'verified' ? 'green' : 'red');

//     // Call updateUser function to update user data
//     updateUser(id, newStatus);
//   };

//   return (
//     <button
//       style={{ opacity:'80%', backgroundColor: buttonColor,width:'100px',height:'30px' , color: 'white', padding: '5px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
//       onClick={handleButtonClick}
//     >
//       {buttonText}
//     </button>
//   );
// };

// export default VerificationButton;




import React, { useState, useEffect } from 'react';
import { Bounce, toast } from 'react-toastify';

const VerificationButton = ({ id, userStatus }) => {
  const [buttonText, setButtonText] = useState("Pending");
  const [buttonColor, setButtonColor] = useState("blue");
  const [status,setStatus] = useState(userStatus)

  useEffect(() => {

    setStatus(userStatus)
    if(userStatus === "Verified"){
      setButtonColor("green")
      setButtonText("Verified")
    }
    else{
      setButtonColor("red")
      setButtonText("Un-verified")
    }
 // setButtonText(status === 'verified' ? 'Verified' : 'Un-verified');
    // setButtonColor(status === 'verified' ? 'green' : 'red');
  }, [userStatus]);

  const updateUserStatus = async (id, newStatus) => {
    // const newStatus = status === 'verified' ? 'un-verified' : 'verified';
    try {
      const response = await fetch(`/api/students/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status:newStatus }),
      });
      const data = await response.json();
      if (data.success) {
        // setStatus(newStatus);
        toast.success(data.result.status, {
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
    const newStatus = status === 'Verified' ? 'Un-Verified' : 'Verified';
    console.log("status-->",status)
    setStatus(newStatus);
    setButtonText(newStatus === 'Verified' ? 'Verified' : 'Un-Verified');
    setButtonColor(newStatus === 'Verified' ? 'green' : 'red');

    // Call updateUser function to update user data
    updateUserStatus(id, newStatus);
  };

  return (
    <button
      style={{ opacity: '80%', backgroundColor: buttonColor, width: '100px', height: '30px', color: 'white', padding: '5px', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
      onClick={handleButtonClick}
    >
      {buttonText}
    </button>
  );
};

export default VerificationButton;