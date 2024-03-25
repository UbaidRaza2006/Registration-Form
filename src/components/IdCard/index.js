"use client"

import { Button } from "antd";
import  html2pdf  from "html2pdf.js";
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
        
            const options = {
              filename: "id_card.pdf",
              html2canvas: { scale: 1 },
              jsPDF: { orientation: "portrait" },
            };
        
            html2pdf().from(input).save();

          };
  


  return (
    
<div>
<Button style={{ backgroundColor: "#248ba5" }} onClick={()=>{handleDownload()}}>
                Download
              </Button>



    <div  className="hidden">
    <div ref={idCardRef} className='bg-white h-[1000px]'>

<div   className="id-card flex border border-gray-200 rounded-md bg-white bg-cover bg-center bg-no-repeat mx-auto h-[350px] w-[230px]" style={{ backgroundImage: 'url("/images/id.PNG")' }}>
  <div className="card-content flex overflow-hidden ">
    {/* <div className="bg-[/images/Capture.png]"> */}
      {/* <img src="/images/Capture.png" alt="" /> */}
      <img className='w-[40%] h-[80px] mt-[80px] ml-[30%] ' src={user.imageUrl} />
      <div className='mt-[160px] ml-[-68%] ml-[-55%] w-[150px] overflow-hidden'>
      
<p className='text-xs mb-1 mx-auto'><strong>{user.rollNo}</strong></p>

<p className="break-words text-xs">
  <strong> Name: </strong>
  {user.fullName} {user.fatherName}
</p>
<p className="break-words text-xs">
  <strong> Course: </strong>
  {user.course}
</p>
<p className="break-words text-xs">
  <strong> Batch: </strong>
  {user.batch}
</p>
<p className="break-words text-xs">
  <strong> Cnic/B-form: </strong>
  {user.cnic}
</p>
<p className="break-words text-xs">
  <strong> City: </strong>
  {user.city}
</p>
</div>
      {/* Add more fields and styling as needed */}
    {/* </div> */}
  </div>
      
</div>


</div>
</div>

    </div>

  )
}

export default IdCard