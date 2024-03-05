"use client"

import { Button } from "antd";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useEffect, useRef, useState } from "react"




export default function DownloadWithCnic (props){

    const [idData,setIdData] = useState({})
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [downloaded, setDownloaded] = useState(false);


  const cardRef= useRef(null);
  
  
  useEffect(()=>{
      getIdData();
    },[])


    const getIdData =async()=> {
        let userId=props.params.idcard
        let userData = await fetch(`http://localhost:3000/api/students/${userId}`)
        userData= await userData.json()
        console.log(userData);
        if(userData.success){
            let result = userData.result
            setIdData(result)
            console.log(idData);
            // handleDownload();
        }


    }
    
    
//     useEffect(() => {
//     if (idData.imageUrl && !downloaded) {
//         const image = new Image();
//         image.src = idData.imageUrl;
//         image.onload = () => {
//             handleDownload();
//             setDownloaded(true);
//         };
//     }
// }, [idData.imageUrl, downloaded]);
    
      const handleDownload = async () => {
        const canvas = await html2canvas(cardRef.current, { scale: 2 });
        const pdf = new jsPDF({
          orientation: "portrait",
          unit: "mm",
          format: "a4",
        });
    
        // Calculate the scale factor for the image
        const scaleFactor = 210 / canvas.width;
    
        // Add image to PDF, adjusting width and height based on the scale factor
        pdf.addImage(
          canvas.toDataURL("image/png"),
          "PNG",
          0,
          0,
          210,
          canvas.height * scaleFactor,
          null,
          "FAST"
        );
    
        // Save the PDF
        pdf.save("id_card.pdf");
      };
    



return(
  <div>
  <div >
  <Button type='primary' style={{backgroundColor:"#0d5667"}} className='w-[400px] absolute mx-auto mt-[560px] h-10' onClick={handleDownload}>
  Download ID Card
  </Button>
  <div ref={cardRef} className='bg-white h-[1500px]'>
  
  <div   className="id-card flex shadow-md rounded-md bg-white bg-cover bg-center bg-no-repeat mx-auto h-[550px] w-[400px]" style={{ backgroundImage: 'url("/images/id.PNG")' }}>
      <div className="card-content flex overflow-hidden ">
        {/* <div className="bg-[/images/Capture.png]"> */}
          {/* <img src="/images/Capture.png" alt="" /> */}
          <img className='w-[40%] h-[160px] mt-[80px] ml-[30%] ' src={idData.imageUrl} />
          <div className='mt-[300px] ml-[-68%] ml-[-55%] w-[280px] overflow-hidden'>
          <p className='mx-auto'><strong>{idData.rollNo}</strong></p>
          <p className="break-words">
            <strong> Name: </strong>
            {idData.fullName} {idData.fatherName}
          </p>
          <p className="break-words">
            <strong> Course: </strong>
            {idData.course}
          </p>
          <p className="break-words">
            <strong> Batch: </strong>
            {idData.batch}
          </p>
          <p className="break-words">
            <strong> Cnic/B-form: </strong>
            {idData.cnic}
          </p>
          <p className="break-words">
            <strong> City: </strong>
            {idData.city}
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