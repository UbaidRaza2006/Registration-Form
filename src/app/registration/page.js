"use client";


// import ButtonComponent from "@/components/AntButtonComponent";
// import AntCardComponent from "@/components/AntCard Component";
// import SearchBox from "@/components/AntSearchComponent";
// import TableComponent from "@/components/AntTableComponents";
// import MyAntTable from "@/components/AntTableComponents/index2";
// import ApprovingSelectBox from "@/components/ApprovingSelectBox";
// import BatchSelectBox from "@/components/BatchSelectBox";
// import CitySelectBox from "@/components/CitySelectBox";
// import CourseSelectBox from "@/components/CourseSelectBox";
// import DrawerApp from "@/components/EditDrawerComponent/antdrawer";
// import EditStudentDrawerComponent from "@/components/EditDrawerComponent/index2";
// import DrawerComponent from "@/components/EditDrawerComponent/index2";
// import EyeViewDrawerComponent from "@/components/EyeViewDrawerComponent";
// import SimpleDrawer from "@/components/EyeViewDrawerComponent";
// import GenderSelectBox from "@/components/GenderSelectbox";
// import EyeViewComponent from "@/components/SideModalsComponent/EyeViewModalComponent";
// import RightSideModal from "@/components/SideModalsComponent/ModalsComponent";
// import YourPageComponent from "@/components/SideModalsComponent/ModalsComponent/index2";
// import SideNavbar from "@/components/SideNavbarComponent";
import React, { useEffect } from "react";
import AntCardComponent from "../../components/AntCard Component";
import SideNavbar from "../../components/SideNavbarComponent";
import CitySelectBox from "../../components/CitySelectBox";
import CourseSelectBox from "../../components/CourseSelectBox";
import BatchSelectBox from "../../components/BatchSelectBox";
import ApprovingSelectBox from "../../components/ApprovingSelectBox";
import GenderSelectBox from "../../components/GenderSelectbox";
import ButtonComponent from "../../components/AntButtonComponent";
import SearchBox from "../../components/AntSearchComponent";
import MyAntTable from "../../components/AntTableComponents/index2";
import { getAllUsers } from "../../services/register";
import { useState } from "react";
import { Card, Select, Space, Table } from "antd";
import EditDrawerApp from "../../components/EditDrawerComponent/antdrawer";
import DeleteIconComponent from "../../components/DeleteIconComponent";
import EyeViewDrawerApp from "../../components/EyeViewDrawerComponent/eyeantdrawer";
// import ButtonComponent from "../../components/AntButtonComponent";
import { Input } from 'antd';
const { Search } = Input;

const { Option } = Select;


export default function AdminPage() {

  const [isHovered, setIsHovered] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [allUsers,setAllUsers] =useState([]);

  // useEffect(() => {
  //   getAllUsers()
  //     .then((users) => {
  //       setAllUsers(users);
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, []);


  useEffect(()=>{
    gettingUsers();

    
  },[])

  const gettingUsers=async()=>{

    const res = await fetch("http://localhost:3000/api/students", {
      method: "GET",
      cache: "no-cache", // Set cache control policy to 'no-cache'
    });
      const data = await res.json();
      const users= await data.data
console.log("data-->",users);
setAllUsers({data:users})
console.log(allUsers);

  }



  
  // const handleUserDeleted = (deletedUserId) => {
  //   // Filter out the deleted user from the list of users
  //   const updatedUsers = allUsers.filter((user) => user._id !== deletedUserId);
  //   setAllUsers(updatedUsers);
  // };



  const dataSource = [
    {
      key: "1",
      fullName: "Ubaid Raza",
      fatherName: "Tayyab",
      cnic: "430133344",
      phone: "03093322555",
      course: "Web & App",
      status: "Pending",
    },
    {
      key: "2",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "3",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "4",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "5",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "6",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "7",
     fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "8",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "9",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "10",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "11",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "12",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "13",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },
    {
      key: "14",
      fullName: "Rizwan",
      fatherName: "Bhatti",
      cnic: "4209872297",
      phone: "0334309303",
      course: "Web & App",
      status: "Approved",
    },

    // Add more data as needed
  ];

  const columns = [
    {
      title: "Student Name",
      dataIndex: "fullName",
      key: "studentName",
    },
    {
      title: "Father Name",
      dataIndex: "fatherName",
      key: "fatherName",
    },
    {
      title: "CNIC",
      dataIndex: "cnic",
      key: "cnic",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Course",
      dataIndex: "course",
      key: "course",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Actions",
      key: "actions",
      render: (text, record) => (
        <Space size="middle">
          {/* <Button type="primary" onClick={handleToggleDrawer}> 
         
            <EditOutlined style={{ cursor: "pointer" }} onClick={handleToggleDrawer}/>
            {drawerVisible && (
              <AddStudentDrawer
              visible={drawerVisible}
              onClose={handleToggleDrawer}
              onAddStudent={handleAddStudent}
              />
            )}
          </Button> */}

          <EditDrawerApp id={record._id}/>

         <DeleteIconComponent id={record._id} />

          {/* <EyeOutlined style={{ cursor: "pointer" }} /> */}
          <EyeViewDrawerApp id={record._id}/>
{/* 
          <Button  style={{border:" none"}}>
            <DownloadOutlined style={{ cursor: "pointer" }} />
          </Button> */}

        </Space>
      ),
    },
  ];





  return (
    <div style={{}}>

    <div
    //  style={{ width: "15%", height: "400px", border: "2px solid red" , backgroundColor : "green", position: "fixed",}}
    >
      <SideNavbar/>
    </div>

{/* <AntCardComponent/> */}



{/* Card Component */}
<div
    className="space-x-[150px] mx-auto"
     style={{display:"flex", marginLeft: "220px" }} >
      
      <Card title="Total Students" style={{ width: 250 }}>
        <p style={{ fontSize: "30px", fontWeight: 1000 }}>1200</p>
      </Card>

      <Card title="Verified Students" style={{ width: 250 }}>
        <p style={{ fontSize: "30px", fontWeight: 1000 }}>700</p>
      </Card>

      <Card title="Unverified Students" style={{ width: 250 }}>
        <p style={{ fontSize: "30px", fontWeight: 1000 }}>500</p>
      </Card>
    </div>
{/* Card Component */}


      <div
        className="space-x-11"
        style={{ marginTop: "2%", marginLeft: "12%", }}
      >
      {/* <RightSideModal/> */}
      {/* <YourPageComponent/> */}
{/* <EditStudentDrawerComponent/>
<EyeViewDrawerComponent/> */}

{/* City */}
<Select
      showSearch
      style={{ width: 120 }}
      placeholder="Karachi"
      optionFilterProp="children"
      // onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="karachi">Karachi</Option>
      <Option value="lahore">Lahore</Option>
      <Option value="quetta">Quetta</Option>
    </Select>
{/* City */}


{/* Course */}
<Select
      showSearch
      style={{ width: 120 }}
      placeholder="Web & App Development"
      optionFilterProp="children"
      // onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option style={{ width: 200 }} value="web">Web & App Development</Option>
      <Option style={{ width: 200 }} value="ai">AI</Option>
      <Option style={{ width: 200 }} value="graphic">Graphic Designing</Option>
      <Option style={{ width: 200 }} value="bs-manage">Businees Management</Option>
      <Option style={{ width: 200 }} value="dg-market">Digital Marketing</Option>
    </Select>
{/* Course */}

{/* Batch */}
<Select
      showSearch
      style={{ width: 120 }}
      placeholder="Select Batch"
      optionFilterProp="children"
      // onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="select">Select</Option>
      <Option value="7">7</Option>
      <Option value="8">8</Option>
      <Option value="9">9</Option>
      <Option value="10">10</Option>
    </Select>

{/* Batch */}

{/* Approved */}
<Select
      showSearch
      style={{ width: 120 }}
      placeholder="Approved"
      optionFilterProp="children"
      // onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {/* <Option value="select">Select</Option> */}
      <Option value="Approved">Approved</Option>
      <Option value="Pending">Pending</Option>
      <Option value="Complete">Complete</Option>
    </Select>
{/* Approved */}

{/* Gender */}
<Select
      showSearch
      style={{ width: 120 }}
      placeholder="Select Gender"
      optionFilterProp="children"
      // onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {/* <Option value="select">Select</Option> */}
      <Option value="male">Male</Option>
      <Option value="female">Female</Option>
      
    </Select>
{/* Gender */}




        <div
          className=" max-auto absolute mt-[-2.4%] rounded-md "
          style={{ backgroundColor: "green", marginLeft: "62%", borderRadius:"10px"}}
        >
          <ButtonComponent 
          // onClick=""
          />
        </div>


{/* Search */}
        <div className="max-auto absolute mt-[-2.4%] rounded-md "
          style={{  marginLeft: "73%", borderRadius:"10px"}}>

<Search 
          style={{ width: 150 , backgroundColor: "blue" , borderRadius:"10px" }}
    placeholder="Search ............." enterButton />

        </div>

      </div>



      <br />


      <div >
      
      {/* <TableComponent /> */}
      {/* <MyAntTable/> */}
      <Table
      style={{
        marginLeft: "8.5%",
        width: "90%",
        // backgroundColor:"yellow",
      }}
      dataSource={allUsers.data}
      columns={columns}
    />
      </div>

    </div>
  );
}
