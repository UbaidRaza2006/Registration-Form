"use client"

import React, { useState, useRef } from 'react';
import Modal from 'react-modal';
import "../SideNavbarComponent/index.css"


import { useRouter } from 'next/navigation';

import {
    UserOutlined,
    LaptopOutlined,
    BlockOutlined,
    LockOutlined,
    StopOutlined,
    DeleteOutlined,
    NotificationOutlined,
    SettingOutlined,
    SoundOutlined,
    MusicOutlined,
    HistoryOutlined,
    SaveOutlined,
    EditOutlined,
    EyeOutlined,
    PlusOutlined,
    ReloadOutlined,
    EyeInvisibleOutlined,
  } from '@ant-design/icons';






const Batch = ({selectedItem }) => {
    const [isDownloaded, setIsDownloaded] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAdding, setIsAdding] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);



    const editBatchOfTheCourse = async (batch, courseId) => {


        try {
          if (batch && courseId) {
            let data = await fetch(`/api/courses/${courseId}`, {
              method: "PUT",
              body: JSON.stringify({ _id: courseId, batch: batch }), headers: {
                "Content-Type": "application/json"
              }
            })
            data = await data.json()
            console.log(data, `/api/courses/${courseId}`)
            // console.log("info-->",data);
            if (data.success) {
              alert(`New Batch No.${data.result.batch} has been Launched!}`)
              setIsAdding(false)
              closeModal();
              // setOpen(false);
            }
            else {
              console.log(data);
            }
          }
          else {
            console.log("batch wagerah aa hi nhi rahaa")
          }
        }
        catch (error) {
          console.log("error-->", error)
        }
      }
  
      const closeModal = () => {
        setIsModalVisible(false)
      }

  return (
<>
<span className="cursor-pointer ml-1" onClick={() => setIsModalVisible(true)}>
                          <PlusOutlined style={{ fontSize: '18px', color: 'gray', strokeWidth: '2px' }} />
                        </span>

    <Modal
    // style={{ width: "700px !important" }} 
    // id="modal3" 
    isOpen={isModalVisible}
  onRequestClose={closeModal}
    footer={null}
    centered
    className="batch-modal"

    // visible={isModalVisible3}
    // onCancel={() => handleCancel(3)}
    // footer={null}
    // centered
  >
    <div className="p-8">
      <h2 className="text-2xl mb-6">`Do You Want to Launch a New Batch No. ${selectedItem.batch + 1} of Course ${selectedItem.course}?`</h2>
      <div className="flex justify-center">
        <button
          className={`bg-blue-500 text-white px-6 py-3 mr-4 rounded-lg transition duration-300 ${isAdding ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
          onClick={() => {
            setIsAdding(true);

            editBatchOfTheCourse(selectedItem.batch+1,selectedItem._id)
            // Add logic here
            // setTimeout(() => {
            //   setIsAdding(false);
              
            // }, 1000);
          }}
          disabled={isAdding}
        >
          {isAdding ? 'Adding...' : "Add"}
        </button>
        <button
          className="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300"
          onClick={() => closeModal()}
        >
          Cancel
        </button>
      </div>
    </div>
  </Modal>
  </>
  );
};



export default Batch;