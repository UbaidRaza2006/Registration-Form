"use client"

import { Button } from "antd";
import  html2pdf  from "html2pdf.js";
import Image from "next/image";
// import { html2pdf } from "html2pdf.js";
import { useRef } from "react";



function IdCard({user}) {

    console.log(user);
    const idCardRef = useRef(null)
    console.log("idCardRef-->",idCardRef);
    
    const handleDownload = () => {
      const input = idCardRef.current;
  
      if (!input) {
        console.error("Element with id 'id-card' not found");
        return;
      }
  
      const rollNumber = user.rollNo; // Assuming user.rollNo contains the roll number
      const filename = `Student_${rollNumber}.idCard.pdf`;
  
      const options = {
        filename: filename,
        html2canvas: {
          scale: 5,
          letterRendering: true,
          useCORS: true,
        },
        jsPDF: {
          unit: "mm",
          format: "a4",
          orientation: "portrait",
          compression: true,
          precision: 16,
        },
      };
  
      html2pdf().set(options).from(input).save();
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