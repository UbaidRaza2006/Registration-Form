"use client"

import React, { useState } from "react";
import { EyeOutlined } from "@ant-design/icons";
import { Button, Drawer, Space } from "antd";
import Image from "next/image";

const EyeViewDrawerApp = ({ userData }) => {
  const [open, setOpen] = useState(false);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Utility function to format date and time
const formatDateTime = (dateString) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true, // To display in 12-hour format with AM/PM
  };
  const date = new Date(dateString);
  return date.toLocaleString('en-US', options);
};

  const [isHovered, setIsHovered] = useState(false);

  return (
    <>
      {/* <Button
        style={{
          border: "none",
          marginBottom: "10px",
          position: "relative",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          backgroundColor: "#1890ff",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={showDrawer}
      >
        <EyeOutlined
          style={{
            color: "#fff",
            fontSize: isHovered ? "24px" : "20px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </Button> */}

      <Button
        style={{
          border: "none",
          marginBottom: '5px',
          position: 'relative', // Ensure position is set to relative for proper icon positioning
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={showDrawer}
      >
        <EyeOutlined
          style={{
            cursor: "pointer",
            fontSize: isHovered ? '20px' : '16px', // Set the desired sizes
            position: 'absolute', // Position the icon absolutely within the button
            top: '50%', // Center the icon vertically
            left: '50%', // Center the icon horizontally
            transform: 'translate(-50%, -50%)', // Center the icon perfectly
          }}
        />
      </Button>

      <Drawer
  title={<div className="text-xl font-bold">Student Information</div>}
  width={400}
  onClose={onClose}
  visible={open}
  placement="right"
  footer={
    <Space>
      <Button onClick={onClose}>Close</Button>
    </Space>
  }
>
  <div className="p-6 text-[#393838]">
    <div className="flex justify-center mb-6">
      <Image
        src={userData.imageUrl}
        alt="Student"
        style={{
          width: "120px",
          height: "120px",
          borderRadius: "50%",
          border: "4px solid #1890ff",
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.1)",
        }}
        width={600} height={400}
      />
    </div>


          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">

            <div className="font-semibold">rollNo:</div>
              <div className="text-blue-500 font-bold text-1xl">
                {userData.rollNo}
              </div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Name:</div>
              <div className="text-blue-500 font-semibold">
                {userData.fullName}
              </div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Father&apos;s Name:</div>
              <div>{userData.fatherName}</div>
              <div className="border-b border-gray-300 col-span-2"></div>


              <div className="font-semibold">CNIC:</div>
              <div>{userData.cnic}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Course:</div>
              <div>{userData.course}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Gender:</div>
              <div>{userData.gender}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Batch:</div>
              <div>{userData.batch}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Email:</div>
              <div>{userData.email}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">City:</div>
              <div>{userData.city}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Date of Birth:</div>
              <div>{userData.dateOfBirth}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Qualification:</div>
              <div>{userData.qualification}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Address:</div>
              <div>{userData.address}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Payment:</div>
              <div>{userData.payment}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Status:</div>
              <div>{userData.status}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Other-Status:</div>
              <div>{userData.otherStatus}</div>
              <div className="border-b border-gray-300 col-span-2"></div>

              <div className="font-semibold">Registered:</div>
              <div>{formatDateTime(userData.createdAt)}</div>
              <div className="border-b border-gray-300 col-span-2"></div>


            </div>
          </div>


    {/* Payment image */}
    <div className="mt-4">
    <div className="mt-4">
      {userData.paymentImg && userData.paymentImg !== "Not-Done" ? (
        // If payment image exists, display it
        <div className="flex justify-center mb-6">
          <Image
            src={userData.paymentImg}
            alt="Payment"
            className="w-[100%] h-40 rounded-xl shadow-md"
            width={600} height={400}

          />
        </div>
      ) : (
        // If payment image does not exist, display text
        <div className="flex justify-center items-center h-32 border border-gray-300 rounded-md">
          <span className="text-lg font-semibold">
            Payment Not Done
          </span>
        </div>
      )}
    </div>
      <div className="text-center font-semibold mt-2">Payment Image</div>
    </div>
  </div>
</Drawer>

    </>
  );
};

export default EyeViewDrawerApp;


      