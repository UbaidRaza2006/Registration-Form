<<<<<<< HEAD
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
import VerificationButton from "../../components/VerificationButton";
const { Search } = Input;

const { Option } = Select;


export default function AdminPage() {

  const [isHovered, setIsHovered] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [allUsers, setAllUsers] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([])
  const [alternateUsers, setAlternateUsers] = useState([])
  const [alternateVerified, setAlternateVerified] = useState([])

  const [rollNumber, setRollNumber] = useState("")
  const [cnicNumber, setCnicNumber] = useState("")


  const formatCnicNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedCnic = input.replace(/\D/g, '').replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    return formattedCnic;
  };

  




  useEffect(() => {
    if (rollNumber.length === 5 && (cnicNumber.length > 15 || cnicNumber.length < 15)) {
      console.log("Updated rollNo:", rollNumber);
      // setRollNo(rollNumber)
      getUserRollNoData(rollNumber)
    }
    else if((rollNumber.length > 5 || rollNumber.length < 5) && cnicNumber.length === 15){

      console.log("Updated cnic:", cnicNumber);
      getUserCnicData(cnicNumber)

    }
    else if((rollNumber.length === 5) && (cnicNumber.length === 15)){

      console.log("Updated cnic:", cnicNumber);
      console.log("Updated rollNo:", rollNumber);
      getUserCnicAndRollNoData(cnicNumber, rollNumber)

    }

    else if((rollNumber.length > 5 || rollNumber.length < 5) && (cnicNumber.length > 15 || cnicNumber.length < 15)){
      // console.log(alternateUsers);
      setAllUsers(alternateUsers)
      setVerifiedUsers(alternateVerified)
      // gettingUsers()
    }
  }, [rollNumber,cnicNumber])


  const getUserRollNoData = async (rollNumber) => {
    console.log("rollNoForUser-->", rollNumber);
    if (rollNumber) {
      try {
        let userData = await fetch(`http://localhost:3000/api/students?rollNo=${rollNumber}`);
        userData = await userData.json();
        console.log(userData);
  
        if (userData.success) {
          let data = userData.data;
          console.log("data-->", data);
          
          // Convert single object to an array of length 1
          const users = Array.isArray(data) ? data : [data];
          const verified = users.filter(user => user.status === "verified");

          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          setAllUsers(users);
          // checkingVerifiedUsers(users);
        } else if (userData.message === "Student not found in the database") {
          alert("Student not found with this Roll No !");
        } else {
          alert("An error occurred !");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const getUserCnicData = async (cnicNumber) => {
    console.log("cnicForUser-->", cnicNumber);
    if (cnicNumber) {
      try {
        let userData = await fetch(`http://localhost:3000/api/students?cnic=${cnicNumber}`);
        userData = await userData.json();
        console.log(userData);
  
        if (userData.success) {
          let data = userData.data;
          console.log("data-->", data);
          
          // Convert single object to an array of length 1
          const users = Array.isArray(data) ? data : [data];
          const verified = users.filter(user => user.status === "verified");

          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          setAllUsers(users);
          // checkingVerifiedUsers(users);
        } else if (userData.message === "Student not found in the database") {
          alert("Student not found with this Roll No !");
        } else {
          alert("An error occurred !");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const getUserCnicAndRollNoData = async (rollNumber,cnicNumber) => {
    console.log("rollNoForUser-->", rollNumber);
    console.log("cnicForUser-->", cnicNumber);
    if (rollNumber && cnicNumber) {
      try {
        let queryData = await fetch(`http://localhost:3000/api/students?cnic=${cnicNumber}&rollNo=${rollNumber}`);
        queryData = await queryData.json();
        console.log(queryData);
  
        if (queryData.success) {
          let data = queryData.data;
          console.log("data-->", data);
          
          // Convert single object to an array of length 1
          const users = Array.isArray(data) ? data : [data];
          const verified = users.filter(user => user.status === "verified");

          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          setAllUsers(users);
          // checkingVerifiedUsers(users);
        } else if( queryData.message === "Student not found in the database") {
          alert("Student not found with this Roll No and Cnic !");
        } else {
          alert("An error occurred !");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    gettingUsers();


  }, [])

  const gettingUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/students", {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      
      // Convert single object to an array of length 1
      const users = Array.isArray(data.data) ? data.data : [data.data];
      const verified = users.filter(user => user.status === "verified");

          setVerifiedUsers(verified)
          setAlternateVerified(verified)
      
      // Set all users into state
      setAllUsers(users);
      setAlternateUsers(users)
      // checkingVerifiedUsers(users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  console.log("All Users:", allUsers.length, "-->", allUsers);
  console.log("Verified Users:", verifiedUsers.length, "-->", verifiedUsers);


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
      key: "status",
      render: (text, record) => (


<VerificationButton id={record._id} userStatus={record.status} />

      ),
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

          <EditDrawerApp userData={record} />

          <DeleteIconComponent id={record._id} />

          {/* <EyeOutlined style={{ cursor: "pointer" }} /> */}

<EyeViewDrawerApp userData={record} />
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
        <SideNavbar />
      </div>

      {/* <AntCardComponent/> */}



      {/* Card Component */}
      <div
        className="space-x-[150px] mx-auto"
        style={{ display: "flex", marginLeft: "220px" }} >

        <Card title="Total Students" style={{ width: 250 }}>
          <p style={{ fontSize: "30px", fontWeight: 1000 }}>{allUsers.length}</p>
        </Card>

        <Card title="Verified Students" style={{ width: 250 }}>
          <p style={{ fontSize: "30px", fontWeight: 1000 }}>{verifiedUsers.length}</p>
        </Card>

        <Card title="Unverified Students" style={{ width: 250 }}>
          <p style={{ fontSize: "30px", fontWeight: 1000 }}>{allUsers.length - verifiedUsers.length}</p>
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
          style={{ backgroundColor: "green", marginLeft: "62%", borderRadius: "10px" }}
        >
          <ButtonComponent
          // onClick=""
          />
        </div>


        {/* Search */}
        <div className="max-auto absolute mt-[-2.4%] rounded-md "
          style={{ marginLeft: "73%", borderRadius: "10px" }}>


<Search
            style={{ width: 200, backgroundColor: "blue", borderRadius: "10px" }}
            placeholder="Search Cnic-No" value={cnicNumber}
            onChange={(event) => {
                const inputValue=event.target.value
            
                if (inputValue.length <= 15) {
                    const formattedCnic = formatCnicNumber(inputValue);
            
            
                setCnicNumber(formattedCnic)
                console.log(formattedCnic)
            }
            }} enterButton />


          <Search
            style={{ width: 150, backgroundColor: "blue", borderRadius: "10px" }}
            placeholder="Search Roll-No" value={rollNumber}
            onChange={(event) => {
              // setRollNumber(event.target.value)
              console.log(event.target.value)
              setRollNumber(event.target.value)

            }} enterButton />

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
          dataSource={allUsers}
          columns={columns}
        />
      </div>

    </div>
  );
}
=======
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
>>>>>>> 6ca6e3e391264a7f96eea448841ead264b5783dd
