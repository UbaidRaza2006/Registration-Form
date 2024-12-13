import { Button } from "antd";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ReactModal from "react-modal";
import { Bounce, toast } from "react-toastify";

const IdCardModal = ({ isOpen, onClose, user, contentImage }) => {
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
                setImage(base64Image);
            }
        };

        fetchImage();
    }, [isOpen]);

    const getBase64Image = async (imageUrl) => {
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
                scale: 15, // Reduced scale to lower size
                letterRendering: true,
            });

            const imageData = canvas.toDataURL("image/jpeg", 0.5); // Using JPEG format and reduced quality to 0.5

            const pdf = new jsPDF({
                orientation: "portrait",
                unit: "px",
                format: "a4",
            });

            const width = pdf.internal.pageSize.getWidth();
            const height = (canvas.height * width) / canvas.width;

            pdf.addImage(imageData, "JPEG", 0, 0, width, height);
            pdf.save(`Student_${user.rollNo}.pdf`);

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
  <div ref={idCardRef} className="relative pt-1 w-[300px] h-[450px]">
   {/* Top Heading */}
   <h1 className="text-center text-xs font-serif font-semibold text-[#007076] mb-1">YOUR ID CARD</h1>
 
   {/* ID Card Section */}
   <div className="mx-auto w-[180px] h-[120px] relative">
             <div className="absolute w-[177px] h-[116px] border border-gray-900">
               <Image
                 src="/images/Green Minimalist School ID Card (5).svg"
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
                 className="absolute top-0 left-0 w-[24.8%] h-[44.7%] mt-[24%] ml-[6.3%]"
                 alt="User-Image"
                 src={image}
                 width={600}
                 height={400}
               />
 
               {/* User Details */}
               <div className="absolute top-0 left-0 w-[37%] h-[35%] mt-[34.5%] ml-[53%] overflow-hidden">
                 <p className=" id-card-text font-poppins font-semibold">{user?.fullName}</p>
                 <p className=" id-card-text font-poppins font-semibold">{user?.course}</p>
                 <p className="id-card-text font-poppins font-semibold">{user?.batch}</p>
               </div>
 
               {/* User Roll Number */}
               <div className="absolute top-0 left-0 w-[20%] h-[10%] mt-[56%] ml-[18.5%] flex justify-center items-center">
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
                   {user?.rollNo}
                 </p>
               </div>
             </div>
           </div>
 
   {/* Payment Information */}
   <div className="mt-2 py-1 px-3 text-xs text-gray-600">
     <p className="text-center text-sm font-semibold font-serif text-[#007076] mb-1">PAYMENT METHOD</p>
 
     <p className="text-[9px] font-semibold text-[#007076] mb-1 inline-block border-b border-[#007076] leading-tight">Bank Details:</p>
     <p className="text-[7px] text-gray-700 mb-[-5px]"><span className="font-semibold text-[#007076]">Bank Name: </span>MCB Islamic</p>
     <p className="text-[7px] text-gray-700 mb-[-5px]"><span className="font-semibold text-[#007076]">Account Title: </span>Muhammad Rizwan</p>
     <p className="text-[7px] text-gray-700"><span className="font-semibold text-[#007076]">Account Number: </span>1321004689390001</p>
 
     <p className="text-[9px] font-semibold text-[#007076] mt-2 mb-1 inline-block border-b border-[#007076] leading-tight">Only Via Easy Paisa:</p>
     <p className="text-[7px] text-gray-700 mb-[-5px]"><span className="font-semibold text-[#007076]">Account Title: </span>Muhammad Rizwan</p>
     <p className="text-[7px] text-gray-700"><span className="font-semibold text-[#007076]">Mobile Number: </span>0343-4192648</p>
 
     <p className="text-[9px] font-semibold text-[#007076] mt-2 mb-1 inline-block border-b border-[#007076] leading-tight">Payment Verification Link:</p><br/>
     <p className="text-[6px] text-blue-600 underline leading-tight inline-block">
   https://registration-form-kids.vercel.app/payment
 </p>
 
     <p className="text-[7px] text-gray-700 leading-tight mt-3">
       Payment submit kerny ke baad screenshot diye gaye link per upload karein aur 20-May se apni classes main shaamil ho jaein.</p><p className="text-[7px] text-gray-700 leading-tight mt-"> Mazeed details ke liye rabta karein 0343-4192648.
     </p>
 
     <p className="text-center text-sm font-semibold font-serif text-[#007076] mt-3">THANK YOU</p>
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
            </div>
        </ReactModal>
    );
};

export default IdCardModal;
