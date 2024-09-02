"use client";

import { HomeOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { Input, Table } from "antd";
import IdCard from "../../components/IdCard";
import { Bounce, toast } from "react-toastify";
import Link from "next/link";

function DownloadIdCard() {
  const [res, setRes] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [cnic, setCnic] = useState(false);
  const [inputCnic, setInputCnic] = useState("");
  const [simpleCnic, setSimpleCnic] = useState("");
  const [usersWithCnic, setUsersWithCnic] = useState([]);

  useEffect(() => {
    if (inputCnic.length !== 15) {
      setUsersWithCnic([]);
    }
  }, [inputCnic]);

  const columns = [
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Batch",
      dataIndex: "batch",
      key: "batch",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <IdCard user={record} />,
    },
  ];

  const formatCnicNumber = (input) => {
    const cleanedInput = input.replace(/\D/g, "");
    return cleanedInput.replace(/^(\d{5})(\d{7})(\d{1})$/, "$1-$2-$3");
  };

  const isFormValid = () => inputCnic.length === 15;

  const getUserCnicData = async (cnicNumber) => {
    console.log("cnicForUser-->", cnicNumber);
    if (cnicNumber) {
      try {
        console.log("Fetching user data...");
        let userData = await fetch(`/api/students?cnic=${cnicNumber}`);
        userData = await userData.json();
        console.log(userData);

        if (userData.success) {
          const decodedUsers = userData.data.map((user) => ({
            ...user,
            fullName: decodeURIComponent(user.fullName),
            fatherName: decodeURIComponent(user.fatherName),
            email: decodeURIComponent(user.email),
            course: decodeURIComponent(user.course),
            payment: decodeURIComponent(user.payment),
            paymentImg: decodeURIComponent(user.paymentImg),
            status: decodeURIComponent(user.status),
            otherStatus: decodeURIComponent(user.otherStatus),
            city: decodeURIComponent(user.city),
            cnic: decodeURIComponent(user.cnic),
            phone: decodeURIComponent(user.phone),
            dateOfBirth: decodeURIComponent(user.dateOfBirth),
            gender: decodeURIComponent(user.gender),
            qualification: decodeURIComponent(user.qualification),
            address: decodeURIComponent(user.address),
            imageUrl: decodeURIComponent(user.imageUrl),
          }));

          setUsersWithCnic(decodedUsers);
        } else {
          toast.error(userData.message, {
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
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error, Try again later!", {
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
    } else {
      console.log("CNIC number is not provided!");
    }
  };

  return (
    <div className="min-h-screen bg-[#d4f6f9]">
      {/* Navbar */}
      <div className="flex justify-between items-center bg-gradient-to-r from-[#0e303e] to-[#18819b] text-white h-[60px] py-2 px-4">
        <Link href="/" passHref>
          <HomeOutlined className="text-2xl cursor-pointer" />
        </Link>
        <div className="text-center flex-grow text-3xl md:text-4xl font-bold">
          Download ID Card
        </div>
      </div>

      {/* Main Content */}
      <div className="w-full flex flex-col items-center py-8 px-4 md:px-0">
        {/* CNIC Input */}
        <div className="mb-4 w-full max-w-xs md:max-w-md lg:max-w-lg">
          <Input
            className="rounded-3xl border-2 border-gray-400 py-2 text-xl text-center w-full"
            style={{ backgroundColor: "white" }}
            id="cnicInput"
            type="text"
            maxLength="15"
            inputMode="numeric"
            placeholder="00000-0000000-0"
            value={inputCnic}
            onChange={(event) => {
              setSimpleCnic(event.target.value);
              const inputValue = event.target.value.replace(/\D/g, ""); // Remove non-digit characters
              if (inputValue.length <= 13) {
                const formattedCnic = formatCnicNumber(inputValue);
                setInputCnic(formattedCnic);
              }
            }}
          />
        </div>

        {/* Submit Button */}
        <button
          className="btn disabled:opacity-50 disabled:bg-gray-400 mt-0 bg-gradient-to-t from-[#0e303e] to-[#18819b] text-white disabled:text-white rounded-3xl font-semibold w-full max-w-xs md:max-w-md lg:max-w-lg"
          disabled={!isFormValid()}
          onClick={() => getUserCnicData(inputCnic)}
        >
          SUBMIT
        </button>

        {/* Users Table */}
        <div className="mt-6 rounded-lg w-full px-4 md:px-8 lg:px-16 max-w-2xl mx-auto">
          {usersWithCnic.length > 0 ? (
            <Table
              columns={columns}
              dataSource={usersWithCnic}
              className="rounded-lg"
              pagination={false}
              style={{ width: "100%" }}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default DownloadIdCard;
