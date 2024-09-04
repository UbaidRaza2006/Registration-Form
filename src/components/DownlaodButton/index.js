import * as XLSX from 'xlsx';
    import axios from 'axios';
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';

const DownloadButton = () => {
    
    const [registering, setRegistering] = useState(false)
    
    const handleDownload = async () => {
      try {
        setRegistering(true)
        // Fetch data from your API
        const response = await axios.get('/api/studentsWithoutPagination'); // Adjust the endpoint as needed
        const data = response.data.data; // Adjust based on your API response
    
        if (data && data.length > 0) {
          // Create a worksheet from the data
          const worksheet = XLSX.utils.json_to_sheet(data);
    
          // Create a workbook and add the worksheet to it
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');
    
          // Generate buffer and save as file
          const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
          const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    
          // Create a link element and trigger download
          const link = document.createElement('a');
          link.href = URL.createObjectURL(blob);
          link.download = 'students.xlsx';
          link.click();
          setRegistering(false)
          toast.success('Data downloaded!', {
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
          
        } else {
          alert('No data available to download.');
          toast.error('No data available to download!', {
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
          setRegistering(false)
        }
      } catch (error) {
        console.error('Failed to download the data:', error);
        toast.error('Failed to download the data!', {
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
    // <button onClick={handleDownload} style={{ padding: '10px 20px', backgroundColor: 'blue', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
    //   Download Data
    // </button>
<>
{registering ? (
    <button className="btn mt-12 text-white text-lg bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] h-12 rounded-lg mx-auto my-auto block px-[100px] tracking-wider"
    // onClick={handleRegister}
    // disabled={!isFormValid()}    
    ><div className="flex items-center space-x-3 mx-auto">
            <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
            <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
            <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
            <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
        </div>
    </button>) : (

    <button className="btn mt-12 text-white text-lg bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] h-12 rounded-lg mx-auto my-auto block px-12 tracking-wider"
    onClick={handleDownload}
    // disabled={!isFormValid()}
    >Download Excel Sheet
    </button>
)}
</>
  );
};

export default DownloadButton;
