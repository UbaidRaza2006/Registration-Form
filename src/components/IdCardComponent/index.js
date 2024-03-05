import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2pdfmake from 'html2pdfmake';
import { Button } from 'antd';

// import css from "../../app/globals.css"
import { useRouter } from 'next/navigation';


// const IdCardModal = ({ isOpen, userData,onClose }) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const [isDownloaded, setIsDownloaded] = useState(false);
  //   const cardRef = useRef(null);
  
  //   const handleDownload = async () => {
    //     await html2canvas(cardRef.current, { scale: 2 }).then((canvas) => {
//       const a = document.createElement('a');
//       document.body.appendChild(a);
//       a.href = canvas.toDataURL();
//       a.download = 'id_card.png';
//       a.click();
//       document.body.removeChild(a);

//       setIsDownloaded(true);
//       setIsModalOpen(true);
//     });
//   };

  
//   const closeModal = () => {
//     if(isDownloaded===true){
//     setIsModalOpen(false);
//     setIsDownloaded(false);
//     } // Reset the download state when the modal is closed
//   };
//   return (
//     <Modal
      // isOpen={isOpen && !isDownloaded}
//            onRequestClose={onClose}
//       contentLabel="ID Card Modal"
//    className="id-card-modal"
//    overlayClassName="id-card-modal-overl"
//    >
//     <div ref={cardRef} className="id-card">
//       {/* Your styled ID card content goes here */}
//       <div className="card-content flex bg-white overflow-hidden   w-[500px] h-[500px]  mt-[-500px]">
// <div className='bg-[/images/Capture.png]'>
// <img src="/images/Capture.png" alt=""/>
// <img src={userData.imageUrl}/>
//       <p className='break-words'> <strong> Name: </strong>{userData.fullName} {userData.fatherName}</p>
//         <p className='break-words'> <strong> Course: </strong>{userData.course}</p>
//         <p className='break-words'> <strong> Batch: </strong>{userData.batch}</p>
//         <p className='break-words'> <strong> City: </strong>{userData.city}</p>
//         {/* Add more fields and styling as needed */}
//         </div>
//       </div>

//       {/* Download button */}
//               <button onClick={() => handleDownload(userData)}>Download ID Card</button>
//     </div>
//     </Modal>
//   );
// };

// export default IdCardModal;








const IdCardModal = ({ isOpen, onClose }) => {
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef= useRef(null);
  const router= useRouter()

  // const handleDownload = async () => {
  //       await html2canvas(cardRef.current, { scale: 2 }).then((canvas) => {
  //         const a = document.createElement('a');
  //         document.body.appendChild(a);
  //         a.href = canvas.toDataURL();
  //         a.download = 'id_card.png';
  //         a.click();
  //         document.body.removeChild(a);
    
  //       });
  //     };


  

  

  return (
    <Modal
  isOpen={isOpen && !isDownloaded}
  onRequestClose={onClose}
  contentLabel="ID Card Modal"
  className="id-card-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-[150px] w-[500px] shadow-md rounded-md z-30"
  overlayClassName="id-card-overlay fixed inset-0 bg-black bg-opacity-50 z-20"
>

  <p>For your Registration Details, Download ID Card</p>
  
        <Button type='primary' style={{backgroundColor:"#0d5667"}} className=' absolute fixed lg:mx-[60%] md:mx-[60%] mx:mx-[60%] mx-auto mt-[8%] h-10' onClick={() => router.push("/id")}>
          ID Card
        </Button>
</Modal>
  );
};



// const handleDownload = (userData) => {
//   const content = `Name: ${userData.name}\nEmail: ${userData.email}\n`;

//   const blob = new Blob([content], { type: 'text/plain' });
//   const url = window.URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = 'id_card.txt';
//   document.body.appendChild(a);
//   a.click();
//   document.body.removeChild(a);
//   window.URL.revokeObjectURL(url);

//   return true// Set the state to indicate download


// };
// if(handleDownload=== true){
//     setIsDownloaded(true)
// }

export default IdCardModal;