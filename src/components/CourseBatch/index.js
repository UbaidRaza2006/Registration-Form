"use client"

import ReactModal from 'react-modal';
import React, { useState, useRef, useEffect } from 'react';
import Modal from 'react-modal';
import "../SideNavbarComponent/index.css"
import { usePassword } from '../../context';
import { Bounce, toast } from 'react-toastify';




const BatchModal = ({ isOpen, onClose, user }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAdmission, setIsAdmission] = useState("Wait..");

  const { coursesToLoad, setCoursesToLoad } = usePassword();



const editBatchOfTheCourse = async (batch, courseId) => {


  try {
    if (batch && courseId) {
      let data = await fetch(`/api/courses/${courseId}`, {
        method: "PUT",
        body: JSON.stringify({ _id: courseId, batch: batch }), headers: {
          "Content-Type": "application/json"
        }
      })
      data = await data.json()
      console.log(data, `/api/courses/${courseId}`)
      // console.log("info-->",data);
      if (data.success) {
        // alert(`New Batch No.${data.result.batch} has been Launched!}`)
        toast.success(`Batch ${data.result.batch} has been launched!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
        setIsAdding(false)
        setCoursesToLoad(true)
        onClose();
        
        // setOpen(false);
      }
      else {
        console.log(data);
        toast.error('Try again', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      }
    }
    else {
      console.log("batch wagerah aa hi nhi rahaa")
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
    })
  }
}




const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1001 // Set a higher z-index for overlay
  },
  content: {
    backgroundColor: "#d3d0d0",
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    border: 'none',
    borderRadius: '8px',
    padding: '20px',
    maxWidth: '500px',
    width: '90%',
    height: '270px',
    zIndex: 1002,
     // Set a higher z-index for modal content
    
  }
};

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Admission Modal"
    >
       <div className="p-8 w-[450px] h-[230px] border border-blue-900  mx-auto">
       <h2 className="text-2xl mb-6 mt-[-15px] text-center">
  Do You Want to Launch a New Batch {user ? (
    <span>
      No. <span className="text-2xl font-bold text-blue-600">{user.batch + 1}</span> of Course <span className="text-2xl font-bold text-blue-600">{user.course}</span>
    </span>
  ) : null} ?
</h2>
      <div className="flex justify-center mt-[15px] mb-[-20px]">
        <button
          className={`bg-blue-500 w-[25%] text-white px-6 py-3 mr-4 rounded-lg transition duration-300 ${isAdding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          onClick={() => {
            setIsAdding(true);

            editBatchOfTheCourse(user.batch+1,user._id)
            // Add logic here
            // setTimeout(() => {
            //   setIsAdding(false);
              
            // }, 1000);
          }}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : "Add"}
        </button>
        <button
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
    </ReactModal>
  );
};

export default BatchModal;