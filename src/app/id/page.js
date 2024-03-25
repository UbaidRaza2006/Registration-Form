// import React, { useState, useRef } from 'react';
'use client'
import Modal from 'react-modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import html2pdf from 'html2pdf.js';
import html2pdfmake from 'html2pdfmake';
import { Button } from 'antd';

import css from "../../app/globals.css"
import { useRouter } from 'next/navigation';
import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalContext } from '../../context';
// import { GlobalContext } from '../../context';
// import { GlobalCon } from '../../context';





export default function Id () {

    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef= useRef(null);
  const router= useRouter()
  // const { user } = useContext(GlobalContext);

// console.log('User for ID Card is -->',user)
const userFromStorage=localStorage.getItem("user")
const user = JSON.parse(userFromStorage)
console.log('User from Local Storage is -->',user);

const handleDownload = async () => {
  try {
      const canvas = await html2canvas(cardRef.current, { scale: 2 });
      const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
      });

      const scaleFactor = 210 / canvas.width;

      pdf.addImage(
          canvas.toDataURL('image/png'),
          'PNG',
          0,
          0,
          210,
          canvas.height * scaleFactor,
          null,
          'FAST'
      );

      pdf.save('id_card.pdf');
  } catch (error) {
      console.error('Error generating PDF:', error);
  }
};
// useEffect(() => {
//   // Call handleDownload when the component mounts
//   handleDownload();
// }, []); // Empty dependency array ensures this runs only on mount




return(
  <div>
<div >
<Button type='primary' style={{backgroundColor:"#0d5667"}} className='w-[400px] absolute fixed mx-auto mt-[570px] h-10' onClick={handleDownload}>
Download ID Card
</Button>
<div ref={cardRef} className='bg-white h-[1500px]'>

<div   className="id-card flex shadow-md rounded-md bg-white bg-cover bg-center bg-no-repeat mx-auto h-[550px] w-[400px]" style={{ backgroundImage: 'url("/images/id.PNG")' }}>
    <div className="card-content flex overflow-hidden ">
      {/* <div className="bg-[/images/Capture.png]"> */}
        {/* <img src="/images/Capture.png" alt="" /> */}
        <img className='w-[40%] h-[160px] mt-[80px] ml-[30%] ' src={user.imageUrl} />
        <div className='mt-[300px] ml-[-68%] ml-[-55%] w-[280px] overflow-hidden'>
        <p className='mx-auto'><strong>{user.rollNo}</strong></p>
        <p className="break-words">
          <strong> Name: </strong>
          {user.fullName} {user.fatherName}
        </p>
        <p className="break-words">
          <strong> Course: </strong>
          {user.course}
        </p>
        <p className="break-words">
          <strong> Batch: </strong>
          {user.batch}
        </p>
        <p className="break-words">
          <strong> Cnic/B-form: </strong>
          {user.cnic}
        </p>
        <p className="break-words">
          <strong> City: </strong>
          {user.city}
        </p></div>
        {/* Add more fields and styling as needed */}
      {/* </div> */}
    </div>
        
  </div>



</div>

</div>
</div>
)



}