"use client";
import dynamic from "next/dynamic";

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
import { Button, Card, Select, Space, Table } from "antd";
import EditDrawerApp from "../../components/EditDrawerComponent/antdrawer";
import DeleteIconComponent from "../../components/DeleteIconComponent";
import EyeViewDrawerApp from "../../components/EyeViewDrawerComponent/eyeantdrawer";
import SideNavbarComponent from "../../components/SideNavbarComponent"
// import ButtonComponent from "../../components/AntButtonComponent";
import { Input } from 'antd';
import VerificationButton from "../../components/VerificationButton";
import { usePassword } from "../../context";
const { Search } = Input;

const { Option } = Select;
const DynamicModal = dynamic(() => import("antd").then((antd) => antd.Modal), {
  ssr: false,
});


export default function AdminPage() {
 

  const {api,setApi} = usePassword();


  const [admin, setAdmin] = useState(null)
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    checkLocalStorage(); // Check local storage on component mount
    const intervalId = setInterval(checkLocalStorage, 60000); // Check local storage every minute
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if(admin){
    setIsFormValid(adminName === admin.adminName && adminPassword === admin.adminPassword);}
  }, [ admin, adminName, adminPassword,]);

  const handleAdminLogin = () => {
    if (isFormValid) {
      const expirationTime = Date.now() + 3600000; // 1 hour in milliseconds
      localStorage.setItem("adminName", adminName);
      localStorage.setItem("adminPassword", adminPassword);
      localStorage.setItem("expirationTime", expirationTime);
      setModalOpen(false);
    } else {
      alert("Invalid admin credentials");
    }
  };

  const checkLocalStorage = () => {
    const storedAdminName = localStorage.getItem("adminName");
    const storedAdminPassword = localStorage.getItem("adminPassword");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedAdminName && storedAdminPassword && expirationTime) {
      const currentTime = Date.now();
      if (currentTime < parseInt(expirationTime, 10)) {
        setAdminName(storedAdminName);
        setAdminPassword(storedAdminPassword);
        setModalOpen(false);
      } else {
        clearLocalStorage();
      }
    } else {
      setModalOpen(true);
    }
  };

  const clearLocalStorage = () => {
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminPassword");
    localStorage.removeItem("expirationTime");
    setAdminName(""); // Clear adminName state
    setAdminPassword(""); // Clear adminPassword state
    setModalOpen(true); // Reopen the modal for admin login
  };

  const [isHovered, setIsHovered] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false)
  // const [query, setQuery] = useState("")
  const [cnicUsers, setCnicUsers] = useState([]);
  const [rollNoUsers, setRollNoUsers] = useState([]);
  const [cnicAndRollNoUsers, setCnicAndRollNoUsers] = useState([]);
  const [filterUsers, setFilterUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [verifiedUsers, setVerifiedUsers] = useState([])
  const [verifiedRollNo, setVerifiedRollNo] = useState([])
  const [verifiedCnic, setVerifiedCnic] = useState([])
  const [verifiedrollNoAndCnic, setVerifiedRollNoAndCnic] = useState([])
  const [filterVerified, setFilterVerified] = useState([])
  const [alternateUsers, setAlternateUsers] = useState([])
  const [alternateVerified, setAlternateVerified] = useState([])


  const [rollNumber, setRollNumber] = useState("")
  const [cnicNumber, setCnicNumber] = useState("")
  const [gender, setGender] = useState("")
  const [batch, setBatch] = useState("")
  const [course, setCourse] = useState("")
  const [city, setCity] = useState("")
  const [status, setStatus] = useState("")
  const [payment, setPayment] = useState("")

  const [genderDone, setGenderDone] = useState("")
  const [batchDone, setBatchDone] = useState("")
  const [courseDone, setCourseDone] = useState("")
  const [cityDone, setCityDone] = useState("")
  const [statusDone, setStatusDone] = useState("")
  const [paymentDone, setPaymentDone] = useState("")
  const [rollNumberDone, setRollNumberDone] = useState("")
  const [cnicNumberDone, setCnicNumberDone] = useState("")




  const formatCnicNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedCnic = input.replace(/\D/g, '').replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    return formattedCnic;
  };

  




useEffect(() => {
    if (rollNumber.length === 5 && cnicNumber.length !== 15){
      setCnicNumberDone("")
      console.log("Updated rollNo:", rollNumber);
      if(rollNumber !== rollNumberDone){
      getUserRollNoData(rollNumber)
      // setAllUsers(rollNoUsers)
      // setVerifiedUsers(verifiedRollNo)
    }
    }
    else if(rollNumber.length === 5 && cnicNumber.length === 15){
      console.log("Updated cnic:", cnicNumber);
      console.log("Updated rollNo:", rollNumber);
      if(rollNumber !== rollNumberDone || cnicNumber !== cnicNumberDone){
      getUserCnicAndRollNoData(cnicNumber, rollNumber)
    //   setAllUsers(cnicAndRollNoUsers)
    //   setVerifiedUsers(verifiedrollNoAndCnic)
      }
    }
    else if(rollNumber.length !== 5 && cnicNumber.length === 15){
      console.log("Updated cnic:", cnicNumber);
      if(cnicNumber !== cnicNumberDone || rollNumber.length < rollNumberDone.length){
        setRollNumberDone("")
      getUserCnicData(cnicNumber)
      // setAllUsers(cnicUsers)
      // setVerifiedUsers(verifiedCnic)
      }
    }
    else if(rollNumber.length !== 5  && cnicNumber.length !== 15 ){
      setRollNumberDone("")
      setCnicNumberDone("")
      if (city || course || batch || gender || status || payment) {
        console.log("Condition met! Other state has value.", status, city, batch, course, gender,payment);
        if(city !== cityDone || course !== courseDone || batch !== batchDone || gender !== genderDone || status !== statusDone || payment !== paymentDone){
        getUsersFromFilter(status,batch,gender,city,course,payment);
        // console.log("filterUsers-->",filterUsers)
        // setAllUsers(filterUsers)
        // setVerifiedUsers(filterVerified)
      }
      }
      else if(!city && !course && !batch && !gender && !status && !payment){
        setAllUsers(alternateUsers)
        setVerifiedUsers(alternateVerified)
      }
    }
}, [rollNumber, cnicNumber, city, status, course, batch, gender, payment]);


  
const [isLoading, setIsLoading] = useState(false);

const getUsersFromFilter = async (status, batch, gender, city, course, payment) => {
  // setIsLoading(true); // Set loading state to true

  console.log("Filter Query Values-->", status, batch, gender, city, course, payment);

  let queryParams = '';

  if (status) {
    queryParams += `${queryParams ? '&' : ''}status=${status}`;
  }

  if (batch) {
    queryParams += `${queryParams ? '&' : ''}batch=${batch}`;
  }

  if (gender) {
    queryParams += `${queryParams ? '&' : ''}gender=${gender}`;
  }

  if (city) {
    queryParams += `${queryParams ? '&' : ''}city=${city}`;
  }

  if (course) {
    queryParams += `${queryParams ? '&' : ''}course=${course}`;
  }

  if (payment) {
    queryParams += `${queryParams ? '&' : ''}payment=${payment}`;
  }

  try {
    let userData = await fetch(`http://localhost:3000/api/students${queryParams ? '?' + queryParams : ''}`);
    userData = await userData.json();
    console.log(userData, "url-->", `http://localhost:3000/api/students${queryParams ? '?' + queryParams : ''}`);

    if (userData.success) {
      let data = userData.data;
      console.log("data-->", data, "url-->", `http://localhost:3000/api/students${queryParams ? '?' + queryParams : ''}`);

      // Convert single object to an array of length 1
      const users = Array.isArray(data) ? data : [data];
      const verified = users.filter(user => user.status === "verified");

      setStatusDone(status)
      setBatchDone(batch)
      setGenderDone(gender)
      setCityDone(city)
      setCourseDone(course)
      setPaymentDone(payment)
      setAllUsers(users);
      setVerifiedUsers(verified);
    } else if (userData.message === "No students found!") {
      setAllUsers([]);
      setVerifiedUsers([]);
      // Consider a more informative message for the user here (e.g., "No students match your filter criteria")
    } else {
      alert("An error occurred!"); // Handle other potential errors more gracefully
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
    // Handle network errors or other issues more gracefully (e.g., display an error message to the user)
  } 
  // finally {
  //   setIsLoading(false); // Set loading state to false after fetching is complete
  // }
};

  

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

          setRollNumberDone(rollNumber)
          setAllUsers(users);
          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          // checkingVerifiedUsers(users);
        } else if (userData.message === "No students found!") {
          alert("Student not found with this Roll No !");
          setAllUsers([])
          // setAlternateUsers(allUsers)
          setVerifiedUsers([]);
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

          setCnicNumberDone(cnicNumber)
          setAllUsers(users);
          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          // checkingVerifiedUsers(users);
        } else if (userData.message === "No students found!") {
          alert("Student not found with this Roll No !");
          setAllUsers([]);
          setVerifiedUsers([])
          // setAlternateUsers(allUsers)
        } else {
          alert("An error occurred !");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  const getUserCnicAndRollNoData = async (cnicNumber,rollNumber) => {
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

          setRollNumberDone(rollNumber)
          setCnicNumberDone(cnicNumber)
          setAllUsers(users);
          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          // checkingVerifiedUsers(users);
        } else if( queryData.message === "No students found!") {
          alert("Student not found with this Roll No and Cnic !");
          setAllUsers([]);
          setVerifiedUsers([])
        } else {
          alert("An error occurred !");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
  };

  useEffect(() => {
    http://localhost:3000/api/students
    gettingAdmin();
    gettingUsers();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      if (api === true) {
        console.log("Reload hoja bhai");
  
        try {
          const res = await fetch("http://localhost:3000/api/students", {
            method: "GET",
            cache: "no-cache", // Set cache control policy to 'no-cache'
          });
          const data = await res.json();
  
          // Convert single object to an array of length 1
          const users = Array.isArray(data.data) ? data.data : [data.data];
          const verified = users.filter((user) => user.status === "verified");
  
          setVerifiedUsers(verified);
          setAlternateVerified(verified);
  
          // Set all users into state
          setAllUsers(users);
          setAlternateUsers(users);
          // checkingVerifiedUsers(users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
        setApi(false);
      }
    };
  
    fetchData();
  }, [api]); // api ko dependency list mein include kiya hai

  const gettingUsers = async () => {
    console.log("gettingUsers")
    try {
      const res = await fetch(`http://localhost:3000/api/students?page=${allUsers.length/20}`, {
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

  const gettingAdmin = async () => {
    console.log("gettingAdmin")
    try {
      const res = await fetch("http://localhost:3000/api/admins", {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      setAdmin(data.data[0])
      
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

  const resetSelectInputs = () => {
    setCity("");
    setCourse("");
    setBatch("");
    setStatus("");
    setPayment("");
    setGender("");
    // setRollNumber("");
    // setCnicNumber("");
  };

  const handleClearQueries = () => {
    resetSelectInputs();
  };



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

<EyeViewDrawerApp userData={record} />

          <EditDrawerApp userData={record} />

          <DeleteIconComponent id={record._id} />


          {/* <EyeOutlined style={{ cursor: "pointer" }} /> */}

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

{/* Password */}


{/* <DynamicModal
  title="Admin Login"
  visible={modalOpen}
  footer={null}
  centered
  destroyOnClose
  // afterClose={() => {
  //   // Reset adminName and adminPassword when the modal is closed
  //   setAdminName("");
  //   setAdminPassword("");
  // }}
>
  <form className="mx-auto space-y-[20px]">
    <Input
      className="w-[100%] h-[40px]"
      placeholder="Admin Name"
      value={adminName}
      onChange={(e) => setAdminName(e.target.value)}
      autoComplete="off"
    />
    <Input.Password
      className="w-[100%] h-[40px]"
      placeholder="Admin Key"
      value={adminPassword}
      onChange={(e) => setAdminPassword(e.target.value)}
      autoComplete="off"
    />
    <Button
      className="mx-auto w-[20%] h-[40px] "
      onClick={handleAdminLogin}
      disabled={!isFormValid}
    >
      Login
    </Button>
  </form>
</DynamicModal> */}


{/* Password */}

<DynamicModal
        title="Admin Login"
        visible={modalOpen}
        footer={null}
        centered
        destroyOnClose
        afterClose={() => {
          // Reset adminName and adminPassword when the modal is closed
          setAdminName("");
          setAdminPassword("");
        }}
      >
        <form className="mx-auto space-y-[20px]">
          <Input
            className="w-[100%] h-[40px]"
            placeholder="Admin Name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            autoComplete="off"
          />
          <Input.Password
            className="w-[100%] h-[40px]"
            placeholder="Admin Key"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            autoComplete="off"
          />
          <Button
            className="mx-auto w-[20%] h-[40px] "
            onClick={handleAdminLogin}
            disabled={!isFormValid}
          >
            Login
          </Button>
        </form>
      </DynamicModal>
{/* {!modalOpen && ( */}
      
{!modalOpen && (
    <>
      <div
      //  style={{ width: "15%", height: "400px", border: "2px solid red" , backgroundColor : "green", position: "fixed",}}
      >
        <SideNavbarComponent/>
      </div>

      {/* <AntCardComponent/> */}



      {/* Card Component */}
      {/* <div
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
      </div> */}

<div className="flex justify-between space-x-4 ml-28 mr-8 mt-4">
      {/* First card */}
      <div className="flex-1 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Students</h2>
        <p className="text-4xl font-bold text-blue-600">{allUsers.length}</p>
      </div>

      {/* Second card */}
      <div className="flex-1 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Verified</h2>
        <p className="text-4xl font-bold text-blue-600">{verifiedUsers.length}</p>
      </div>

      {/* Third card */}
      <div className="flex-1 bg-white rounded-lg p-4 shadow-md">
        <h2 className="text-xl font-bold text-gray-800">Un-Verified</h2>
        <p className="text-4xl font-bold text-blue-600">{allUsers.length - verifiedUsers.length}</p>
      </div>
    </div>


      {/* Card Component */}
<div className="mx-auto flex space-x-2 items-center mt-7 ml-[8%]">

      <div className="flex space-x-2 items-center bg-blue-500 w-[65%] mt-4 p-4 rounded-md shadow-md">
      {/* City */}
      <Select
        showSearch
        value={city || undefined}
        style={{ width: 120 }}
        placeholder="City"
        optionFilterProp="children"
        onChange={(value) => setCity(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Select.Option value="Karachi">Karachi</Select.Option>
        <Select.Option value="Lahore">Lahore</Select.Option>
        <Select.Option value="Quetta">Quetta</Select.Option>
      </Select>

      {/* Course */}
      <Select
        showSearch
        style={{ width: 120 }}
        value={course || undefined}
        placeholder="Course"
        optionFilterProp="children"
        onChange={(value) => setCourse(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Select.Option value="Web and App Development">Web & App Development</Select.Option>
        <Select.Option value="Graphic Designing">Graphic Designing</Select.Option>
        <Select.Option value="Businees Management">Businees Management</Select.Option>
        <Select.Option value="Digital Marketing">Digital Marketing</Select.Option>
      </Select>

      {/* Batch */}
      <Select
        showSearch
        style={{ width: 120 }}
        value={batch || undefined}
        placeholder="Batch"
        optionFilterProp="children"
        onChange={(value) => setBatch(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Select.Option value="1">1</Select.Option>
        <Select.Option value="2">2</Select.Option>
        <Select.Option value="3">3</Select.Option>
        <Select.Option value="4">4</Select.Option>
      </Select>

      {/* Status */}
      <Select
        showSearch
        style={{ width: 120 }}
        value={status || undefined}
        placeholder="Status"
        optionFilterProp="children"
        onChange={(value) => setStatus(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Select.Option value="Verified">Verified</Select.Option>
        <Select.Option value="Un-Verified">Un-Verified</Select.Option>
      </Select>

      {/* Payment */}
      <Select
        showSearch
        style={{ width: 120 }}
        value={payment || undefined}
        placeholder="Payment"
        optionFilterProp="children"
        onChange={(value) => setPayment(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Select.Option value="Done">Done</Select.Option>
        <Select.Option value="Not-done">Not-Done</Select.Option>
      </Select>

      {/* Gender */}
      <Select
        showSearch
        style={{ width: 120 }}
        value={gender || undefined}
        placeholder="Gender"
        optionFilterProp="children"
        onChange={(value) => setGender(value)}
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        <Select.Option value="Male">Male</Select.Option>
        <Select.Option value="Female">Female</Select.Option>
      </Select>

      {/* Clear Button */}
      <Button onClick={handleClearQueries} style={{ backgroundColor: '#333', color: '#fff' }}>Clear</Button>
    </div>

        



    

    <div className="flex space-x-2 items-center bg-[#333] w-[32%] mt-4 p-4 rounded-md shadow-md">
  <div className="flex items-center space-x-2">
    {/* Search Cnic-No */}
    <Search
      style={{ width: 200, backgroundColor: "rgb(13, 109, 219)", borderRadius: "10px" }}
      placeholder="Search Cnic-No" 
      value={cnicNumber}
      onChange={(event) => {
        const inputValue=event.target.value
        if (inputValue.length <= 15) {
          const formattedCnic = formatCnicNumber(inputValue);
          setCnicNumber(formattedCnic);
          console.log(formattedCnic);
        }
      }} 
      enterButton 
    />
    
    {/* Search Roll-No */}
    <Search
      style={{ width: 150, backgroundColor: "rgb(13, 109, 219)", borderRadius: "10px" }}
      placeholder="Search Roll-No" 
      value={rollNumber}
      onChange={(event) => {
        console.log(event.target.value);
        setRollNumber(event.target.value);
      }} 
      enterButton 
    />
  </div>
</div>

      </div>


      <div className="mt-8 ml-[-1.5%]">

        {/* <TableComponent /> */}
        {/* <MyAntTable/> */}
        {allUsers.length>0?<Table
          style={{
            marginLeft: "8.5%",
            width: "90%",
            // backgroundColor:"yellow",
          }}
          dataSource={allUsers}
          columns={columns}
        />:
    //     <div className="flex justify-center items-center h-screen bg-gray-200 to-indigo-600">
    //   <div className="bg-white p-12 ml-20 mt-[-160px] rounded-lg shadow-2xl w-[90%]">
    //     <p className="text-6xl font-extrabold text-center text-gray-900">No Students Found!</p>
    //     <p className="text-xl text-center text-gray-800 mt-6">Thier might be a technical or network delay in fetching Students, or may be the student according to your queries does not exist</p>
    //     <div className="mt-12 flex justify-center">
    //       <button className="bg-indigo-600 text-white px-8 py-4 rounded-lg text-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">Clear Queries</button>
    //     </div>
    //   </div>
    // </div>





    <div className="flex justify-center items-center h-screen ml-24">
      <div className="flex mt-[-300px] space-x-4">
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
        <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}></div>
      </div>
    </div>


  //   <div className="flex justify-center items-center fixed top-0 left-0 w-full h-full bg-transparent z-50">
  //   <div className="flex space-x-4">
  //     <div className="loader-dot w-5 h-5 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
  //     <div className="loader-dot w-5 h-5 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
  //     <div className="loader-dot w-5 h-5 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
  //     <div className="loader-dot w-5 h-5 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
  //     <div className="loader-dot w-5 h-5 bg-blue-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}></div>
  //   </div>
  // </div>

        }
        
      </div>
      </>
)}
{/* )} */}

    </div>
  );
}
