import ReactModal from 'react-modal';
import { useEffect, useState } from 'react';
import { CloseOutlined } from '@mui/icons-material';
import { usePassword } from '../../context';
import { Bounce, toast } from 'react-toastify';
import DownloadButton from '../DownlaodButton';

const DownloadModal = ({ isOpen, onClose }) => {

    const customStyles = {
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          zIndex: 1001 // Set a higher z-index for overlay
        },
        content: {
          backgroundColor: "#eefcfd",
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '400px',
          width: '90%',
          height: '200px',
          zIndex: 1002,
           // Set a higher z-index for modal content
          
        }
      };
  

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customStyles}
      contentLabel="Downlaod Modal"
    >
      <div className="text-center">
        <CloseOutlined onClick={onClose} className='absolute right-2 top-2 text-gray-500 cursor-pointer' />
        
       
       <DownloadButton/>



      </div>
    </ReactModal>
  );
};

export default DownloadModal;
