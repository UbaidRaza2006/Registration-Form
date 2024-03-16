"use client";

import React, { useRef } from "react";
import { Button } from "antd";
import html2pdf from "html2pdf.js";

const IDCard = () => {
  const idCardRef = useRef(null);

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

    html2pdf().set(options).from(input).save();
  };

  const userFromStorage = localStorage.getItem("user");
  const user = JSON.parse(userFromStorage);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen overflow-hidden w-full absolute">
        <div
          id="id-card"
          className="flex bg-no-repeat object-cover relative top-0 bottom-0 left-0 right-0"
          style={{
            backgroundImage: 'url("/images/id.PNG")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="h-full w-full">
            <div className="p-24 space-y-1">
              <h1 className="text-2xl font-bold mb-4">ID Card</h1>
              <p>
                <span className="font-bold">Full Name:</span> {user.fullName}
              </p>
              <p>
                <span className="font-bold">Father Name:</span>{" "}
                {user.fatherName}
              </p>
              <p>
                <span className="font-bold">Gender:</span> {user.gender}
              </p>
              <p>
                <span className="font-bold">Date of Birth:</span>{" "}
                {user.dateOfBirth}
              </p>
              <p>
                <span className="font-bold">Address:</span> {user.address}
              </p>
              <p>
                <span className="font-bold">City:</span> {user.city}
              </p>
              <p>
                <span className="font-bold">CNIC:</span> {user.cnic}
              </p>
              <p>
                <span className="font-bold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-bold">Course:</span> {user.course}
              </p>
              <p>
                <span className="font-bold">Batch:</span> {user.batch}
              </p>
              <p>
                <span className="font-bold">Qualification:</span>{" "}
                {user.qualification}
              </p>
              <p>
                <span className="font-bold">Roll No:</span> {user.rollNo}
              </p>
              <p>
                <span className="font-bold">Payment Status:</span>{" "}
                {user.payment}
              </p>
              <p>
                <span className="font-bold">Status:</span> {user.status}
              </p>
              <p>
                <span className="font-bold">Created At:</span> {user.createdAt}
              </p>
              <p>
                <span className="font-bold">Updated At:</span> {user.updatedAt}
              </p>
            </div>
          </div>
        </div>
        <Button
          type="primary"
          style={{ backgroundColor: "#0d5667" }}
          className="w-auto mx-auto h-10 mt-8"
          onClick={handleDownload}
        >
          Download ID Card
        </Button>
      </div>
      {/* card to download */}
      <div className="w-screen h-screen hidden">
        <div
          id="id-card"
          ref={idCardRef}
          className="flex bg-no-repeat m-auto my-16 w-[488px] h-[711px]"
          style={{
            backgroundImage: 'url("/images/id.PNG")',
            backgroundPosition: "center",
            backgroundSize: "cover",
          }}
        >
          <div className="h-full w-full">
            <div className="p-24 space-y-1">
              <h1 className="text-2xl font-bold mb-4">ID Card</h1>
              <p>
                <span className="font-bold">Full Name:</span> {user.fullName}
              </p>
              <p>
                <span className="font-bold">Father Name:</span>{" "}
                {user.fatherName}
              </p>
              <p>
                <span className="font-bold">Gender:</span> {user.gender}
              </p>
              <p>
                <span className="font-bold">Date of Birth:</span>{" "}
                {user.dateOfBirth}
              </p>
              <p>
                <span className="font-bold">Address:</span> {user.address}
              </p>
              <p>
                <span className="font-bold">City:</span> {user.city}
              </p>
              <p>
                <span className="font-bold">CNIC:</span> {user.cnic}
              </p>
              <p>
                <span className="font-bold">Email:</span> {user.email}
              </p>
              <p>
                <span className="font-bold">Phone:</span> {user.phone}
              </p>
              <p>
                <span className="font-bold">Course:</span> {user.course}
              </p>
              <p>
                <span className="font-bold">Batch:</span> {user.batch}
              </p>
              <p>
                <span className="font-bold">Qualification:</span>{" "}
                {user.qualification}
              </p>
              <p>
                <span className="font-bold">Roll No:</span> {user.rollNo}
              </p>
              <p>
                <span className="font-bold">Payment Status:</span>{" "}
                {user.payment}
              </p>
              <p>
                <span className="font-bold">Status:</span> {user.status}
              </p>
              <p>
                <span className="font-bold">Created At:</span> {user.createdAt}
              </p>
              <p>
                <span className="font-bold">Updated At:</span> {user.updatedAt}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default IDCard;
