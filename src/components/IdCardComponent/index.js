import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2pdfmake from 'html2pdfmake';
import { Button } from 'antd';

import { useRouter } from 'next/navigation';







const IdCardModal = ({ isOpen, onClose }) => {
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  // const cardRef= useRef(null);
  const router= useRouter()


  const idCardRef = useRef(null);

  const handleDownload = () => {
    const input = idCardRef.current;

    if (!input) {
      console.error("Element with id 'id-card' not found");
      return;
    }

    const options = {
      filename: "id_card.pdf",
      html2canvas: { scale: 1 },
      jsPDF: { orientation: "portrait" },
    };

    html2pdf().set(options).from(input).save();
  };

  const userFromStorage = localStorage.getItem("user");
  const user = JSON.parse(userFromStorage);

  

  

  return (
    <Modal
  isOpen={isOpen && !isDownloaded}
  onRequestClose={onClose}
  contentLabel="ID Card Modal"
  className="id-card-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-[150px] w-[500px] shadow-md rounded-md z-30"
  overlayClassName="id-card-overlay fixed inset-0 bg-black bg-opacity-50 z-20"
>


      {/* <div className="flex flex-col items-center justify-center h-screen overflow-hidden w-full absolute"> */}
        {/* <div
          id="id-card"
          className="flex bg-no-repeat object-cover relative top-0 bottom-0 left-0 right-0"
          style={{
            backgroundImage: 'url("/images/id.PNG")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="h-full w-full">
            <div className="p-24 space-y-1">
              <h1 className="text-2xl font-bold mb-4">ID Card</h1>
              <p>
                <span className="font-bold">Full Name:</span> {user.fullName}
              </p>
              <p>
                <span className="font-bold">Father Name:</span>{" "}
                {user.fatherName}
              </p>
              <p>
                <span className="font-bold">Gender:</span> {user.gender}
              </p>
              <p>
                <span className="font-bold">Date of Birth:</span>{" "}
                {user.dateOfBirth}
              </p>
              <p>
                <span className="font-bold">Address:</span> {user.address}
              </p>
              <p>
                <span className="font-bold">City:</span> {user.city}
              </p>
              <p>
                <span className="font-bold">CNIC:</span> {user.cnic}
              </p>
              <p>
                <span className="font-bold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-bold">Course:</span> {user.course}
              </p>
              <p>
                <span className="font-bold">Batch:</span> {user.batch}
              </p>
              <p>
                <span className="font-bold">Qualification:</span>{" "}
                {user.qualification}
              </p>
              <p>
                <span className="font-bold">Roll No:</span> {user.rollNo}
              </p>
              <p>
                <span className="font-bold">Payment Status:</span>{" "}
                {user.payment}
              </p>
              <p>
                <span className="font-bold">Status:</span> {user.status}
              </p>
              <p>
                <span className="font-bold">Created At:</span> {user.createdAt}
              </p>
              <p>
                <span className="font-bold">Updated At:</span> {user.updatedAt}
              </p>
            </div>
          </div>
        </div> */}
        {/* <Button
          type="primary"
          style={{ backgroundColor: "#0d5667" }}
          className="w-auto mx-auto h-10 mt-8"
          onClick={handleDownload}
        >
          Download ID Card
        </Button> */}
      {/* </div> */}
      {/* card to download */}
      <div  className="hidden">
      <div ref={idCardRef} className='bg-white h-[1000px]'>

<div   className="id-card flex border border-gray-200 rounded-md bg-white bg-cover bg-center bg-no-repeat mx-auto h-[350px] w-[230px]" style={{ backgroundImage: 'url("/images/id.PNG")' }}>
    <div className="card-content flex overflow-hidden ">
      {/* <div className="bg-[/images/Capture.png]"> */}
        {/* <img src="/images/Capture.png" alt="" /> */}
        <img className='w-[40%] h-[80px] mt-[80px] ml-[30%] ' src={user.imageUrl} />
        <div className='mt-[160px] ml-[-68%] ml-[-55%] w-[150px] overflow-hidden'>
        
  <p className='text-xs mb-1 mx-auto'><strong>{user.rollNo}</strong></p>

  <p className="break-words text-xs">
    <strong> Name: </strong>
    {user.fullName} {user.fatherName}
  </p>
  <p className="break-words text-xs">
    <strong> Course: </strong>
    {user.course}
  </p>
  <p className="break-words text-xs">
    <strong> Batch: </strong>
    {user.batch}
  </p>
  <p className="break-words text-xs">
    <strong> Cnic/B-form: </strong>
    {user.cnic}
  </p>
  <p className="break-words text-xs">
    <strong> City: </strong>
    {user.city}
  </p>
</div>
        {/* Add more fields and styling as needed */}
      {/* </div> */}
    </div>
        
  </div>



</div>

      </div>

  <p>For your Registration Details, Download ID Card</p>
  
        <Button type='primary' style={{backgroundColor:"#0d5667"}} className=' absolute fixed lg:mx-[60%] md:mx-[60%] mx:mx-[60%] mx-auto mt-[8%] h-10' onClick={handleDownload}>
          Download ID Card
        </Button>
</Modal>
  );
};



export default IdCardModal;