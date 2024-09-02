"use client";

import { useState } from "react";
import { Button } from "antd";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import Image from "next/image";
import { useRef } from "react";
import { Bounce, toast } from "react-toastify";

function IdCard({ user }) {
  const idCardRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownload = async () => {
    setIsGenerating(true);


    const inputData = idCardRef.current;

    try {
      const canvas = await html2canvas(inputData, {
        scale: 9,
        letterRendering: true,
      });

      const imageData = canvas.toDataURL("image/png", 0.8);

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const width = pdf.internal.pageSize.getWidth();
      const height = (canvas.height * width) / canvas.width;

      pdf.addImage(imageData, "PNG", 0, 0, width, height, '', 'FAST');
      pdf.save(`Student:${user.rollNo}.pdf`);

      setIsGenerating(false);
      toast.success('Downloaded Successfully!', {
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
    } catch (e) {
      console.error("Error generating PDF:", e);
      setIsGenerating(false);
      toast.error('Error, Try again later!', {
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
    }
  };

  return (
    <div>
      <Button className="bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white " onClick={handleDownload} disabled={isGenerating}>
        {isGenerating ? "Generating..." : "Download"}
      </Button>

      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
  <div ref={idCardRef} className="relative pt-2 w-[350px] h-[230px] ">
    {/* First child div for the school image */}

<div className=" mx-auto w-[180px] h-[120px]">

<div className="absolute w-[177px] h-[116px] border border-gray-900">
      <Image
        src="/images/Green Minimalist School ID Card (1).svg"
        className="w-full h-full object-cover"
        width={600}
        height={400}
        alt="School Image"
      />
    </div>

    {/* Second child div for the rest of the ID card content */}
    <div className="absolute w-[177px] h-[116px] z-10 overflow-hidden">
      {/* User Image */}
      <Image
        className="absolute top-0 left-0  w-[26%] h-[38.5%] mt-[25%] ml-[6.8%]"
        alt="User-Image"
        src={user.imageUrl}
        width={600}
        height={400}
      />
      
      {/* User Details */}
      <div className="absolute top-0 left-0 w-[37%] h-[35%] mt-[34.2%] ml-[62%] space-y-[-1px] overflow-hidden">
        <p
          style={{ color: "#018394",
             fontSize: "6px", 
             fontWeight: "bold",
             }}
          className="break-words"
        >
          {user.fullName}
        </p>
        <p
          style={{
            color: "#018394",
            fontSize: "6px",
            fontWeight: "bold",
            // marginTop: "2px",
          }}
          className="break-words"
        >
          {user.course}
        </p>
        <p
          style={{
            color: "#018394",
            fontSize: "6px",
            fontWeight: "bold",
            // marginTop: "2px",
          }}
          className="break-words"
        >
          {user.batch}
        </p>
      </div>

      {/* User Roll Number */}
      <div className="absolute top-0 left-0 w-[20%] h-[10%] mt-[54.3%] ml-[19%] flex justify-center items-center">
        <p
          style={{
            color: "white",
            fontSize: "7px",
            fontWeight: "bold",
            letterSpacing: "2px",
            fontStyle: "italic",
          }}
          className="break-words"
        >
          {user.rollNo}
        </p>
      </div>
    </div> 
    </div>

  </div>
</div>

    </div>
  );
}

export default IdCard;
