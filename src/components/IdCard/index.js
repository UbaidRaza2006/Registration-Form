"use client"

import { Button } from "antd";
// import  html2pdf  from "html2pdf.js";
import Image from "next/image";
import { useRef } from "react";
import { PDFDocument, rgb } from '@pdf-lib/core';



function IdCard({user}) {

    console.log(user);
    const idCardRef = useRef(null)
    console.log("idCardRef-->",idCardRef);
    

    const handleDownload = async () => {
      const input = idCardRef.current;
    
      if (!input) {
        console.error("Element with id 'id-card' not found");
        return;
      }
    
      const userFromStorage = localStorage.getItem("user");
      const user = JSON.parse(userFromStorage);
    
      const rollNumber = user.rollNo; // Assuming user.rollNo contains the roll number
      const filename = `Student_${rollNumber}.idCard.pdf`;
    
      try {
        const { width, height } = input.getBoundingClientRect();
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage([width, height]);
        const svgString = new XMLSerializer().serializeToString(input);
        const svg = await SVGtoPDF(page, svgString, 0, 0, { assumePt: true });
        const pdfBytes = await pdfDoc.save();
    
        // Create a blob from the PDF bytes
        const blob = new Blob([pdfBytes], { type: 'application/pdf' });
    
        // Create a temporary anchor element to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
    
        // Append the anchor to the body and click it programmatically
        document.body.appendChild(link);
        link.click();
    
        // Clean up
        document.body.removeChild(link);
        URL.revokeObjectURL(link.href);
      } catch (error) {
        console.error('Error generating PDF:', error);
      }
    };
    

  return (
    
<div>
<Button style={{ backgroundColor: "#248ba5" }} onClick={()=>{handleDownload()}}>
                Download
              </Button>


              <div className="hidden">
  <div ref={idCardRef} className="bg-white h-[1000px] relative">

    {/* Background Image */}
    <Image src="/images/Green Minimalist School ID Card (1).svg" className="absolute ml-[28%] h-[230px] w-[350px] object-cover z-0" width={600} height={400}/>

    {/* ID Card Content */}
    <div className="id-card flex mx-auto mt-8 h-[230px] w-[350px] relative z-10">
      {/* Content goes here */}
      <Image className="absolute w-[25.6%] h-[88px] mt-[88px] ml-[7.8%]" src={user.imageUrl} width={600} height={400}/>
      <div className="absolute mt-[115px] ml-[210px] w-[230px] h-[100px] overflow-hidden">
        <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold" }} className="break-words">{user.fullName}</p>
        <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold", marginTop: "2px" }} className="break-words">{user.course}</p>
        <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold", marginTop: "2px" }} className="break-words">{user.batch}</p>
      </div>
      <div className="absolute mt-[184.5px] ml-[75px] w-[100px] h-[35px] overflow-hidden">
        <p style={{ color: "white", fontSize: "13px", fontWeight: "bold", letterSpacing: "2px", fontStyle: "italic" }} className="break-words">{user.rollNo}</p>
      </div>
    </div>

  </div>
</div>




    </div>

  )
}

export default IdCard