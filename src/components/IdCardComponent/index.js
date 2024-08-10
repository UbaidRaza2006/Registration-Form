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
            width: '400px',
            height: "170px",
            maxHeight: '30vh',
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
                <div ref={idCardRef} className="relative">
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
                            src={image}
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
