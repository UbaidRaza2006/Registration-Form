// import React, { useState, useRef } from 'react';
// import Modal from 'react-modal';
// import html2pdf from 'html2pdf.js';
// import { Button } from 'antd';
// import Image from 'next/image';

// const IdCardModal = ({ isOpen, onClose, user }) => {
//   const [isDownloaded, setIsDownloaded] = useState(false);
//   const idCardRef = useRef(null);

//   const handleDownload = () => {
//     const input = idCardRef.current;
//     if (!input) {
//       console.error("Element with id 'id-card' not found");
//       return;
//     }

//     const filename = `Student_${user?.rollNo}.idCard.pdf`;
//     const options = {
//       filename: filename,
//       html2canvas: {
//         scale: 9,
//         letterRendering: true,
//         useCORS: true,
//       },
//       jsPDF: {
//         unit: "mm",
//         format: "a4",
//         orientation: "portrait",
//         compression: true,
//         precision: 16,
//       },
//     };

//     html2pdf().set(options).from(input).save();
//     setIsDownloaded(true);
//     onClose();
//   };

//   return (
//     <Modal
//       isOpen={isOpen && !isDownloaded}
//       onRequestClose={onClose}
//       contentLabel="ID Card Modal"
//       className="id-card-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-[150px] w-[500px] shadow-md rounded-md z-30"
//       overlayClassName="id-card-overlay fixed inset-0 bg-black bg-opacity-50 z-20"
//     >
//       <div className="hidden">
//         <div ref={idCardRef} className="bg-white h-[1000px] relative">
//           <Image
//             src="/images/Green Minimalist School ID Card (1).svg"
//             width={600}
//             height={400}
//             alt="image"
//             className="absolute ml-[28%] h-[230px] w-[350px] object-cover z-0"
//           />
//           <div className="id-card flex mx-auto mt-8 h-[230px] w-[350px] relative z-10">
//             <Image
//               className="absolute w-[25.6%] h-[88px] mt-[88px] ml-[7.8%]"
//               alt="image"
//               src={user?.imageUrl}
//               width={600}
//               height={400}
//             />
//             <div className="absolute mt-[115px] ml-[210px] w-[230px] h-[100px] overflow-hidden">
//               <p
//                 style={{
//                   color: "#018394",
//                   fontSize: "10px",
//                   fontWeight: "bold",
//                 }}
//                 className="break-words"
//               >
//                 {user?.fullName}
//               </p>
//               <p
//                 style={{
//                   color: "#018394",
//                   fontSize: "10px",
//                   fontWeight: "bold",
//                   marginTop: "2px",
//                 }}
//                 className="break-words"
//               >
//                 {user?.course}
//               </p>
//               <p
//                 style={{
//                   color: "#018394",
//                   fontSize: "10px",
//                   fontWeight: "bold",
//                   marginTop: "2px",
//                 }}
//                 className="break-words"
//               >
//                 {user?.batch}
//               </p>
//             </div>
//             <div className="absolute mt-[184.5px] ml-[75px] w-[100px] h-[35px] overflow-hidden">
//               <p
//                 style={{
//                   color: "white",
//                   fontSize: "13px",
//                   fontWeight: "bold",
//                   letterSpacing: "2px",
//                   fontStyle: "italic",
//                 }}
//                 className="break-words"
//               >
//                 {user?.rollNo}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <p>For your Registration Details, Download ID Card</p>
//       <Button
//         type="primary"
//         style={{ backgroundColor: "#0d5667" }}
//         className="absolute fixed lg:mx-[60%] md:mx-[60%] mx:mx-[60%] mx-auto mt-[8%] h-10"
//         onClick={handleDownload}
//       >
//         Download ID Card
//       </Button>
//     </Modal>
//   );
// };

// export default IdCardModal;
