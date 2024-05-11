import { Button, Modal } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Image from "next/image";
import { useRef, useState } from "react";
import ReactModal from "react-modal";

const IdCardModal = ({ isOpen, onClose, user }) => {
    const idCardRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);

    const customStyles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1000
        },
        content: {
            backgroundColor: 'rgba(211, 222, 223, 0.98)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            border: 'none',
            borderRadius: '8px',
            padding: '15px', // Adjust padding as needed
            maxWidth: '90%', // Adjust width as needed
            width: '400px',
            height:"170px", // Adjust width as needed
            maxHeight: '30vh',
            overflow: 'auto',
        }
    };

  
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
      } catch (e) {
        console.error("Error generating PDF:", e);
        setIsGenerating(false);
      }
    };
  

  return (
   <ReactModal // Create a Modal component
    //   isOpen={isOpen} // Set the modal's open state based on the prop
    //   onRequestClose={onClose} // Function to call when the modal is closed
    //   contentLabel="ID Card Modal" // Label for accessibility
    //   className="id-card-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-[500px] w-[800px] shadow-md rounded-md z-30" // Modal styling
    //   overlayClassName="id-card-overlay fixed inset-0 bg-black bg-opacity-50 z-20" // Modal overlay styling
    isOpen={isOpen}
        onRequestClose={onClose}
        style={customStyles}
        // className="id-card-modal fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white h-[500px] w-[800px] shadow-md rounded-md z-30" // Modal styling
        contentLabel="Custom Modal"
    >
      {/* Content to be captured for the PDF */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
      <div ref={idCardRef} className="relative"> {/* Removed absolute positioning */}
        <Image
          src="/images/Green Minimalist School ID Card (1).svg"
          alt="bg-img"
          className="absolute ml-[28%] h-[100px] w-[180px] object-cover z-0"
          width={600}
          height={400}
        />
        <div className="id-card flex mx-auto mt-8 h-[230px] w-[350px] relative z-10">
          <Image
            className="absolute w-[25.6%] h-[88px] mt-[88px] ml-[7.8%]"
            alt="User-Image"
            src={user?.imageUrl}
            width={600}
            height={400}
          />
          <div className="absolute mt-[115px] ml-[210px] w-[230px] h-[100px] overflow-hidden">
            <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold" }} className="break-words">
              {user?.fullName}
            </p>
            <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold", marginTop: "2px" }} className="break-words">
              {user?.course}
            </p>
            <p style={{ color: "#018394", fontSize: "10px", fontWeight: "bold", marginTop: "2px" }} className="break-words">
              {user?.batch}
            </p>
            </div>
            <div className="absolute mt-[184.5px] ml-[75px] w-[100px] h-[35px] overflow-hidden">
              <p style={{ color: "white", fontSize: "13px", fontWeight: "bold", letterSpacing: "2px", fontStyle: "italic" }} className="break-words">
                {user?.rollNo}
              </p>
            </div>
          </div>
        
          </div>
    </div>
    <p className="mt-4">For your Registration Details, Download ID Card</p>
    <div className="flex justify-end mt-10">
                <Button
                    type="primary"
                    style={{ backgroundColor: "#0d5667" }}
                    onClick={handleDownload}
                    disabled={isGenerating}
                >
                    {isGenerating ? "Generating..." : "Download ID Card"}
                </Button>
            </div>

        </ReactModal>
    );
};

export default IdCardModal;