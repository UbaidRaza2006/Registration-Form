import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import { usePassword } from '../../context';
import { Bounce, toast } from 'react-toastify';
import DownloadButton from '../DownlaodButton';

const AdmissionModal = ({ isOpen, onClose, user }) => {
  const [isAdmission, setIsAdmission] = useState("Wait..");

  const { coursesToLoad, setCoursesToLoad } = usePassword();


useEffect(()=>{
  console.log(user)
  if(user){

    setIsAdmission(user.admission)
  }
},[user])

const admissionOfCourse = async (courseId, newStatus) => {


  try {
    // if(admissionsOpen){
    let data = await fetch(`/api/courses/${courseId}`, {
      method: "PUT",
      body: JSON.stringify({ _id: courseId, admission: newStatus}), headers: {
        "Content-Type": "application/json"
      }
    })
    data = await data.json()
    console.log(data, `/api/courses/${courseId}`)
    console.log("info-->",data);
    if (data.success) {
      // alert(`Admission Status of course: ${data.result.course} has been Updated!.. into  ${data.result.admission}`)
      setCoursesToLoad(true)
      toast.success(`Admissions are ${data.result.admission}`, {
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
      onClose()
    }
    else {
      console.log(data);
      toast.error('Try again!', {
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
    })
  }
}

const handleSwitchChange = () => {
  const newStatus = isAdmission === "Opened"?"Closed": "Opened";
  setIsAdmission(newStatus);
  admissionOfCourse(user._id, newStatus); // Update admission status
};




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
      maxWidth: '400px',
      width: '90%',
      height: '200px',
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
      <div className="text-center">
        <CloseOutlined onClick={onClose} className='absolute right-2 top-2 text-gray-500 cursor-pointer' />
        <h2 className="text-1.75xl font-semibold text-gray-900 mt-6 mb-8">Do you want to {
            user && user.admission === "Opened"? "close" : "open"
        } the admissions of {
            user? user.course : null
        }?</h2>
        {
          isAdmission !== "Wait.."?
          (<div 
          onClick={handleSwitchChange}
          className="flex items-center justify-center mx-auto"
          style={{
            width: '60px',
            height: '30px',
            border: '2px solid #ccc',
            borderRadius: '15px',
            backgroundColor: isAdmission === "Opened" ? '#1890ff' : '#f5222d',
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
              transform: isAdmission === "Opened"? 'translateX(16px)' : 'translateX(-16px)',
              transition: 'transform 0.3s',
            }}
          />
        </div>):"Wait...."
        }
       
       <DownloadButton/>



      </div>
    </ReactModal>
  );
};

export default AdmissionModal;
