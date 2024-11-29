import { Button } from "antd";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { Bounce, toast } from "react-toastify";

const IdCardModal = ({ isOpen, onClose, user }) => {
    const idCardRef = useRef(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [downloaded, setDownloaded] = useState(false);
    const [image, setImage] = useState("");

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
            padding: '15px',
            maxWidth: '90%',
            width: '500px',
            height: "160px",
            maxHeight: '70vh',
            overflow: 'auto',
        }
    };

    useEffect(() => {
        const fetchImage = async () => {
            if (isOpen) {
                setDownloaded(false);
                const base64Image = await getBase64Image(user.imageUrl);
                console.log("Base64 image:", base64Image);
                setImage(base64Image);
            }
        };

        fetchImage();
    }, [isOpen]);

    const getBase64Image = async (imageUrl) => {
        console.log("Function Running!");
        if (typeof window !== 'undefined') {
            try {
                const response = await fetch(imageUrl);
                const blob = await response.blob();
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result);
                    reader.onerror = reject;
                    reader.readAsDataURL(blob);
                });
            } catch (error) {
                console.error('Error fetching image for base64 conversion:', error);
                return null;
            }
        } else {
            console.warn('getBase64Image function is being executed in a non-browser context.');
            return null;
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
            setDownloaded(true);
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
            onClose();
        } catch (e) {
            console.error("Error generating PDF:", e);
            setIsGenerating(false);
            setDownloaded(true);
            toast.error('Error, Go to Download Page!', {
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
        <ReactModal
            isOpen={isOpen}
            onRequestClose={downloaded ? onClose : null}
            style={customStyles}
            contentLabel="Custom Modal"
        >
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
        src={image}
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
          {user?.fullName}
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
          {user?.course}
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
          {user?.batch}
        </p>
      </div>

      {/* User Roll Number */}
      <div className="absolute top-0 left-0 w-[20%] h-[10%] mt-[53.8%] ml-[19.5%] flex justify-center items-center">
        <p
          style={{
            color: "white",
            fontSize: "7px",
            fontWeight: "bold",
            letterSpacing: "1.5px",
            fontStyle: "italic",
          }}
          className="break-words"
        >
          {user?.rollNo}
        </p>
      </div>
    </div> 
    </div>

  </div>
</div>
            <p className="mt-0 font-boldest text-1xl text-gray-700 ml-0 mr-0 lg:ml-[9%] md:ml-[9%] sm:ml-[9%] lg:mr-[9%] md:mr-[9%] sm:mr-[9%] lg:text-center md:text-center sm:text-center" style={{fontWeight: "bold",}}>For your Registration Details, Download ID Card!</p>
            <div className="flex justify-end mt-0">
            <button
                            className="btn mt-8 text-white text-md bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] h-12 rounded-lg mx-auto block px-8 tracking-wider border-none"
                            onClick={handleDownload}
                    disabled={isGenerating}
                        >
                                                {isGenerating ? "Generating..." : "Download ID Card"}

                        </button>
                {/* <Button
                    type="primary"
                    style={{ backgroundColor: "#0d5667" }}
                    onClick={handleDownload}
                    disabled={isGenerating}
                >
                    {isGenerating ? "Generating..." : "Download ID Card"}
                </Button> */}
            </div>
        </ReactModal>
    );
};

export default IdCardModal;