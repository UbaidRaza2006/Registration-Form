import * as XLSX from 'xlsx';
import axios from 'axios';
import { useState } from 'react';
import { Bounce, toast } from 'react-toastify';

const DownloadButton = () => {
    const [registering, setRegistering] = useState(false);

    const handleDownload = async () => {
        try {
            setRegistering(true);
            const response = await axios.get('/api/studentsWithoutPagination'); 
            const data = response.data.data; 

            if (data && data.length > 0) {
                const worksheet = XLSX.utils.json_to_sheet(data);

                // Apply custom styles
                const headerStyle = {
                    font: { bold: true, color: { rgb: "FFFFFF" }, sz: 14 },
                    fill: { fgColor: { rgb: "4F81BD" } }, // Blue background for headers
                    border: {
                        top: { style: "thin", color: { rgb: "000000" } },
                        bottom: { style: "thin", color: { rgb: "000000" } },
                        left: { style: "thin", color: { rgb: "000000" } },
                        right: { style: "thin", color: { rgb: "000000" } }
                    }
                };

                const dataStyle = {
                    font: { sz: 12 },
                    border: {
                        top: { style: "thin", color: { rgb: "000000" } },
                        bottom: { style: "thin", color: { rgb: "000000" } },
                        left: { style: "thin", color: { rgb: "000000" } },
                        right: { style: "thin", color: { rgb: "000000" } }
                    }
                };

                // Apply styles to headers
                const range = XLSX.utils.decode_range(worksheet['!ref']);
                for (let col = range.s.c; col <= range.e.c; col++) {
                    const cellAddress = XLSX.utils.encode_col(col) + "1"; // Header row
                    if (!worksheet[cellAddress]) worksheet[cellAddress] = {}; // Ensure the cell object exists
                    worksheet[cellAddress].s = headerStyle;
                }

                // Apply styles to data cells
                for (let row = range.s.r + 1; row <= range.e.r; row++) {
                    for (let col = range.s.c; col <= range.e.c; col++) {
                        const cellAddress = XLSX.utils.encode_cell({ c: col, r: row });
                        if (!worksheet[cellAddress]) worksheet[cellAddress] = {}; // Ensure the cell object exists
                        worksheet[cellAddress].s = dataStyle;
                    }
                }

                // Auto width adjustment for each column
                const columnWidths = data.reduce((acc, row) => {
                    Object.keys(row).forEach((key, index) => {
                        const cellValue = row[key] ? row[key].toString() : '';
                        const colIndex = data[0][key] ? data[0][key].toString().length : 10;
                        acc[index] = Math.max(acc[index] || 10, cellValue.length);
                    });
                    return acc;
                }, []);
                worksheet['!cols'] = columnWidths.map(width => ({ wch: width }));

                // Create a new workbook and append the worksheet
                const workbook = XLSX.utils.book_new();
                XLSX.utils.book_append_sheet(workbook, worksheet, 'Students');

                // Write the workbook to a file
                const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
                const blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

                // Trigger download
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = 'students_styled.xlsx';
                link.click();

                setRegistering(false);
                toast.success("Student's Data downloaded!", {
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
                setRegistering(false);
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
        <>
            {registering ? (
                <button className="btn mt-12 text-white text-lg bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] h-12 rounded-lg mx-auto my-auto block px-[100px] tracking-wider">
                    <div className="flex items-center space-x-3 mx-auto">
                        <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse"></div>
                        <div className="loader-dot w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                </button>
            ) : (
                <button className="btn mt-12 text-white text-lg bg-gradient-to-t from-[#0e303e] to-[#18819b] hover:bg-[#0d4a5b] active:bg-[#092e3e] h-12 rounded-lg mx-auto my-auto block px-12 tracking-wider"
                    onClick={handleDownload}>
                    Download Excel Sheet
                </button>
            )}
        </>
    );
};

export default DownloadButton;
