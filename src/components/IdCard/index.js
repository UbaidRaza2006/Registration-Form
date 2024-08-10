"use client";

import { useState } from "react";
import { Button } from "antd";
import html2canvas from "html2canvas";
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
        <div ref={idCardRef} className="relative">
          <Image
            src="/images/Green Minimalist School ID Card (1).svg"
            className="absolute ml-[28%] h-[100px] w-[180px] object-cover z-0"
            width={600}
            height={400}
          />
          <div className="id-card flex mx-auto mt-8 h-[230px] w-[350px] relative z-10">
            <Image
              className="absolute w-[25.6%] h-[88px] mt-[88px] ml-[7.8%]"
              alt="User-Image"
              src={user.imageUrl}
              width={600}
              height={400}
            />
            <div className="absolute mt-[115px] ml-[210px] w-[230px] h-[100px] overflow-hidden">
              <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold" }} className="break-words">
                {user.fullName}
              </p>
              <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold", marginTop: "2px" }} className="break-words">
                {user.course}
              </p>
              <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold", marginTop: "2px" }} className="break-words">
                {user.batch}
              </p>
            </div>
            <div className="absolute mt-[184.5px] ml-[75px] w-[100px] h-[35px] overflow-hidden">
              <p style={{ color: "white", fontSize: "13px", fontWeight: "bold", letterSpacing: "2px", fontStyle: "italic" }} className="break-words">
                {user.rollNo}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default IdCard;
