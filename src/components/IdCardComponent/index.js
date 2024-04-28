"use client"

import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import html2pdf from 'html2pdf.js';
import html2pdfmake from 'html2pdfmake';
import { Button } from 'antd';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const IdCardModal = ({ isOpen, onClose, user }) => {
  const [isDownloaded, setIsDownloaded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const cardRef= useRef(null);
  const router = useRouter()
  const idCardRef = useRef(null);

  const handleDownload = () => {
    //   const input = idCardRef.current;

    //   if (!input) {
    //     console.error("Element with id 'id-card' not found");
    //     return;
    //   }

    //   const userFromStorage = localStorage.getItem("user");
    //   const user = JSON.parse(userFromStorage);

    //   const rollNumber = user?.rollNo; // Assuming user?.rollNo contains the roll number
    //   const filename = `Student_${rollNumber}.idCard.pdf`;

    //   const options = {
    //     filename: filename,
    //     html2canvas: {
    //       scale: 5,
    //       letterRendering: true,
    //       useCORS: true,
    //     },
    //     jsPDF: {
    //       unit: "mm",
    //       format: "a4",
    //       orientation: "portrait",
    //       compression: true,
    //       precision: 16,
    //     },
    //   };

    //   html2pdf().set(options).from(input).save();

    //   onClose();
  };

  // const handleDownload = () => {
  //   const input = idCardRef.current;

  //   if (!input) {
  //     console.error("Element with id 'id-card' not found");
  //     return;
  //   }

  //   const userFromStorage = localStorage.getItem("user");
  //   const user = JSON.parse(userFromStorage);

  //   const filename = `Student_${user?.rollNo}.idCard.pdf`; // Customize filename

  //   const options = {
  //     filename: filename,
  //     html2canvas: {
  //       scale: 9, // Increased scale for higher resolution
  //       letterRendering: true,
  //       useCORS: true,
  //     },
  //     jsPDF: {
  //       unit: "mm",
  //       format: "a4",
  //       orientation: "portrait",
  //       compression: true,
  //       precision: 16,
  //     },
  //   };

  //   html2pdf().set(options).from(input).save();
  //   setIsDownloaded(true); // Set state to track download status


  //   // Close the modal after the download is completed
  //   onClose();
  // };

  // const userFromStorage = localStorage.getItem("user");
  // const user = JSON.parse(userFromStorage);

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
                <span className="font-bold">Full Name:</span> {user?.fullName}
              </p>
              <p>
                <span className="font-bold">Father Name:</span>{" "}
                {user?.fatherName}
              </p>
              <p>
                <span className="font-bold">Gender:</span> {user?.gender}
              </p>
              <p>
                <span className="font-bold">Date of Birth:</span>{" "}
                {user?.dateOfBirth}
              </p>
              <p>
                <span className="font-bold">Address:</span> {user?.address}
              </p>
              <p>
                <span className="font-bold">City:</span> {user?.city}
              </p>
              <p>
                <span className="font-bold">CNIC:</span> {user?.cnic}
              </p>
              <p>
                <span className="font-bold">Email:</span> {user?.email}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {user?.phone}
              </p>
              <p>
                <span className="font-bold">Course:</span> {user?.course}
              </p>
              <p>
                <span className="font-bold">Batch:</span> {user?.batch}
              </p>
              <p>
                <span className="font-bold">Qualification:</span>{" "}
                {user?.qualification}
              </p>
              <p>
                <span className="font-bold">Roll No:</span> {user?.rollNo}
              </p>
              <p>
                <span className="font-bold">Payment Status:</span>{" "}
                {user?.payment}
              </p>
              <p>
                <span className="font-bold">Status:</span> {user?.status}
              </p>
              <p>
                <span className="font-bold">Created At:</span> {user?.createdAt}
              </p>
              <p>
                <span className="font-bold">Updated At:</span> {user?.updatedAt}
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
      <div className="hidden">
        <div ref={idCardRef} className="bg-white h-[1000px] relative">

          {/* Background Image */}
          <Image src="/images/Green Minimalist School ID Card (1).svg" width={600} height={400} className="absolute ml-[28%] h-[230px] w-[350px] object-cover z-0" />

          {/* ID Card Content */}
          <div className="id-card flex mx-auto mt-8 h-[230px] w-[350px] relative z-10">
            {/* Content goes here */}
            <Image className="absolute w-[25.6%] h-[88px] mt-[88px] ml-[7.8%]" src={user?.imageUrl} width={600} height={400} />
            <div className="absolute mt-[115px] ml-[210px] w-[230px] h-[100px] overflow-hidden">
              <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold" }} className="break-words">{user?.fullName}</p>
              <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold", marginTop: "2px" }} className="break-words">{user?.course}</p>
              <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold", marginTop: "2px" }} className="break-words">{user?.batch}</p>
            </div>
            <div className="absolute mt-[184.5px] ml-[75px] w-[100px] h-[35px] overflow-hidden">
              <p style={{ color: "white", fontSize: "13px", fontWeight: "bold", letterSpacing: "2px", fontStyle: "italic" }} className="break-words">{user?.rollNo}</p>
            </div>
          </div>

        </div>
      </div>

      <p>For your Registration Details, Download ID Card</p>

      <Button type='primary' style={{ backgroundColor: "#0d5667" }} className=' absolute fixed lg:mx-[60%] md:mx-[60%] mx:mx-[60%] mx-auto mt-[8%] h-10' onClick={handleDownload}>
        Download ID Card
      </Button>
    </Modal>
  );

};

export default IdCardModal;