"use client"
import React, { useState } from 'react';
// import 'antd/dist/antd.css';
import { EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, DatePicker, Drawer, Form, Input, Row, Select, Space } from 'antd';
import InputComponent from '../InputComponent';
import { batchOptions, courseOptions } from '../../utils';
import SelectComponent from '../SelectComponent';
import mongoose from 'mongoose';
import { NextResponse } from 'next/server';
const { Option } = Select;
const EditDrawerApp = ({ id }) => {
  
  const [open, setOpen] = useState(false);
  const [viewData, setViewData] = useState({})

  const [fullName, setFullName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [email, setEmail] = useState('');
  const [course, setCourse] = useState('');
  const [batch, setBatch] = useState('');
  const [status, setStatus] = useState('');
  const [city, setCity] = useState('');
  const [cnic, setCnic] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('');
  const [rollNo, setRollNo] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('');
  const [qualification, setQualification] = useState('');
  const [address, setAddress] = useState('');
  const [imageUrl, setImageUrl] = useState('');



  const getUserData = async (userId) => {
    console.log("idForUser-->", userId);
    let userData = await fetch(`http://localhost:3000/api/students/${userId}`)
    userData = await userData.json()
    console.log(userData);
    if (userData.success) {
      let result = userData.result
      setViewData(result)
      // console.log(viewData);
      setFullName(result.fullName);
      setFatherName(result.fatherName);
      setEmail(result.email);
      setCourse(result.course);
      setBatch(result.batch);
      setStatus(result.status);
      setCity(result.city);
      setCnic(result.cnic);
      setPhone(result.phone);
      setDateOfBirth(result.dateOfBirth);
      setGender(result.gender);
      setQualification(result.qualification);
      setAddress(result.address);
      setImageUrl(result.imageUrl);
      setRollNo(result.rollNo);
      setPayment(result.payment);
    }


  }


  const updateUser = async (userId) => {

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      console.log('Invalid userId format');
      console.log(userId)
      return NextResponse.json({
        success: false,
        error: 'Invalid userId format',
      });

    }


    let data = await fetch(`http://localhost:3000/api/students/${userId}`, {
      method: "PUT",
      body: JSON.stringify({ _id: userId, address, batch, city, cnic, course, dateOfBirth, email, fatherName, fullName, gender, imageUrl, payment, phone, qualification, rollNo, status }), headers: {
        "Content-Type": "application/json"
      }
    })
    data = await data.json()
    // console.log("info-->",data);
    if (data.success) {
      alert("User has been Updated!..")
      // setOpen(false);
    }
    else {
      console.log(data);
    }
  }


  const showDrawer = () => {
    setOpen(true);
    getUserData(id); // Pass the id to getUserData function

    // console.log(id);

  };
  const onClose = () => {
    setOpen(false);
  };

  const formatCnicNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedCnic = input.replace(/\D/g, '').replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    return formattedCnic;
  };

  const formatPhoneNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedNumber = input.replace(/\D/g, '').replace(/(\d{4})(\d{7})/, '$1-$2');
    return formattedNumber;
  };



  const [isHovered, setIsHovered] = useState(false);
  return (
    <>
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
        <EditOutlined
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
        style={{}}
        title="Hey Admin!, here you can Edit a Student."
        width={720}
        onClose={onClose}
        open={open}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        extra={
          <Space>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={() => updateUser(id)} type="primary">
              Submit
            </Button>

          </Space>
        }
      >

        <div style={{ boxShadow: '1px 5px 5px 8px rgba(0.2, 0.2, 0.2, 0.2)' }} className="mx-auto w-full  flex flex-col items-start justify-start p-10 bg-white shadow-2xl rounded-xl relative">
          <div className="w-full mr-0 mb-0 ml-0 space-y-4 lg:space-y-1 md:space-y-1 mx:space-y-1
                lg:grid grid-cols-2 gap-6 md:grid grid-cols-2 gap-6 mx:grid grid-cols-2 gap-6
                 ">

            <InputComponent
              type="text"
              placeholder="Full Name"
              label="Edit Full Name"
              value={fullName}
              onChange={(event) => {

                const newName = event.target.value;

                // Capitalize the first letter of each word
                const formattedName = newName.replace(/\b\w/g, (char) => char.toUpperCase());

                // Update the state with the formatted name
                setFullName(formattedName);
              }}
            />
            <InputComponent
              type="text"
              placeholder="Father Name"
              label="Edit Father Name"

              value={fatherName}
              onChange={(event) => {
                const newFatherName = event.target.value;

                // Capitalize the first letter of each word
                const formattedFatherName = newFatherName.replace(/\b\w/g, (char) => char.toUpperCase());

                // Update the state with the formatted name
                setFatherName(formattedFatherName)
              }}
            />
            <InputComponent
              id="emailInput"
              type="text"
              placeholder="Email"
              label="Edit Email"
              value={email}
              onChange={(event) => {

                setEmail(event.target.value)


              }}
            />

            <InputComponent
              id="cnicInput"
              type="text"
              maxLength="15"
              inputMode="numeric"
              placeholder="00000-0000000-0"
              label="Edit Cnic/B-form"

              value={cnic}
              onChange={(event) => {



                const inputValue = event.target.value

                if (inputValue.length <= 15) {
                  const formattedCnic = formatCnicNumber(inputValue);


                  setCnic(formattedCnic)

                }


              }}
            />
            <InputComponent
              type="text"
              id="phoneInput"
              maxLength="12"
              inputMode="numeric"
              placeholder="0000-0000000"
              label="Edit Phone"
              value={phone}
              onChange={(event) => {

                const inputValue = event.target.value

                if (inputValue.length <= 12) {
                  const formattedPhone = formatPhoneNumber(inputValue);


                  setPhone(formattedPhone)
                }
              }}
            />
            <InputComponent
              type="text"
              placeholder="City"
              label="Edit City"
              value={city}
              onChange={(event) => {
                const newCity = event.target.value;

                // Capitalize the first letter of each word
                const formattedCity = newCity.replace(/\b\w/g, (char) => char.toUpperCase());

                // Update the state with the formatted name
                setCity(formattedCity)
              }}
            />
            <InputComponent
              type="date"
              placeholder="Date Of Birth"
              label="Edit D/O/B"

              value={dateOfBirth}
              onChange={(event) => {
                setDateOfBirth(event.target.value)
              }}
            />


            <SelectComponent
              label="Edit Gender"
              options={[
                { id: "male", label: "Male" },
                { id: "female", label: "Female" },
              ]}
              value={gender}
              onChange={(event) => {
                setGender(event.target.value)
              }}
            />






            <SelectComponent
              label="Edit Course"
              options={courseOptions}
              value={course}
              onChange={(event) => {
                setCourse(event.target.value)
              }}
            />

            <SelectComponent
              label="Edit Batch"
              options={batchOptions}
              value={batch}
              onChange={(event) => {
                setBatch(event.target.value)
              }}
            />


            <div style={{ marginTop: "20px" }}>

              <InputComponent
                type="text"
                placeholder="Qualification"
                label="Edit Qualification"
                value={qualification}
                onChange={(event) => {
                  setQualification(event.target.value)
                }}
              /></div>
            <div style={{ marginTop: "20px" }}>
              <InputComponent
                type="text"
                placeholder="Address"
                label="Edit Address"
                value={address}
                onChange={(event) => {
                  setAddress(event.target.value)
                }}
              />
            </div>
          </div>






        </div>


        {/* <Form layout="vertical" hideRequiredMark>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name" 
                label="Name"
                rules={[
                  {
                    required: true,
                    message: 'Please enter user name',
                  },
                ]}
              >
                <Input placeholder="Please enter user name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="url"
                label="Url"
                rules={[
                  {
                    required: true,
                    message: 'Please enter url',
                  },
                ]}
              >
                <Input
                  style={{
                    width: '100%',
                  }}
                  addonBefore="http://"
                  addonAfter=".com"
                  placeholder="Please enter url"
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="owner"
                label="Owner"
                rules={[
                  {
                    required: true,
                    message: 'Please select an owner',
                  },
                ]}
              >
                <Select placeholder="Please select an owner">
                  <Option value="xiao">Xiaoxiao Fu</Option>
                  <Option value="mao">Maomao Zhou</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Type"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the type',
                  },
                ]}
              >
                <Select placeholder="Please choose the type">
                  <Option value="private">Private</Option>
                  <Option value="public">Public</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="approver"
                label="Approver"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the approver',
                  },
                ]}
              >
                <Select placeholder="Please choose the approver">
                  <Option value="jack">Jack Ma</Option>
                  <Option value="tom">Tom Liu</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="dateTime"
                label="DateTime"
                rules={[
                  {
                    required: true,
                    message: 'Please choose the dateTime',
                  },
                ]}
              >
                <DatePicker.RangePicker
                  style={{
                    width: '100%',
                  }}
                  getPopupContainer={(trigger) => trigger.parentElement}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                name="description"
                label="Description"
                rules={[
                  {
                    required: true,
                    message: 'please enter url description',
                  },
                ]}
              >
                <Input.TextArea rows={4} placeholder="please enter url description" />
              </Form.Item>
            </Col>
          </Row>
        </Form> */}
      </Drawer>
    </>
  );
};
export default EditDrawerApp;