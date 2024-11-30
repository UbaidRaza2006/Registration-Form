"use client";
import dynamic from "next/dynamic";


import React, { useEffect } from "react";
import { useState } from "react";
import { Button, Card, Input, Select, Space, Table } from "antd";
import EditDrawerApp from "../../components/EditDrawerComponent/antdrawer";
import DeleteIconComponent from "../../components/DeleteIconComponent";
import EyeViewDrawerApp from "../../components/EyeViewDrawerComponent/eyeantdrawer";
import SideNavbarComponent from "../../components/SideNavbarComponent"
// import { Input } from 'antd';
import VerificationButton from "../../components/VerificationButton";
import { usePassword } from "../../context";
import InputComponent from "../../components/InputComponent";
import { Bounce, toast } from "react-toastify";
import { useRadioGroup } from "@mui/material";
import OtherVerificationButton from "../../components/OtherVerificationButton";
import { useRouter } from "next/navigation";
// import { useRouter } from "next/router";
const { Search } = Input;

const { Option } = Select;
const DynamicModal = dynamic(() => import("antd").then((antd) => antd.Modal), {
  ssr: false,
});


export default function AdminPage() {

  const router = useRouter();


  const { api, setApi, coursesToLoad, setCoursesToLoad, sideNavbarCity, setSideNavbarCity } = usePassword();


  const [admin, setAdmin] = useState(null)
  const [adminName, setAdminName] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [isLoading, setIsLoading] = useState(false);



  useEffect(() => {
    checkLocalStorage(); // Check local storage on component mount
    const intervalId = setInterval(checkLocalStorage, 60000); // Check local storage every minute
    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    if (admin) {
      setIsFormValid(adminName === admin.adminName && adminPassword === admin.adminPassword);
    }
  }, [admin, adminName, adminPassword]);

  const handleAdminLogin = () => {
    if (isFormValid) {
      const expirationTime = Date.now() + 3600000; // 1 hour in milliseconds
      localStorage.setItem("adminName", adminName);
      localStorage.setItem("adminPassword", adminPassword);
      localStorage.setItem("expirationTime", expirationTime);
      setModalOpen(false);
    } else {
      // alert("Invalid admin credentials");
      toast.error("Invalid admin credentials", {
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

  const checkLocalStorage = () => {
    const storedAdminName = localStorage.getItem("adminName");
    const storedAdminPassword = localStorage.getItem("adminPassword");
    const expirationTime = localStorage.getItem("expirationTime");

    if (storedAdminName && storedAdminPassword && expirationTime) {
      const currentTime = Date.now();
      if (currentTime < parseInt(expirationTime, 10)) {
        // Valid session
        setAdminName(storedAdminName);
        setAdminPassword(storedAdminPassword);
        setModalOpen(false);
      } else {
        // Expired session
        clearLocalStorage();
      }
    } else {
      // No session data
      clearLocalStorage();
    }
  };




  const clearLocalStorage = () => {
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminPassword");
    localStorage.removeItem("expirationTime");
    // Clear form fields and ensure modal opens
    setAdminName("");
    setAdminPassword("");
    setModalOpen(true);
  };


  // Reset form fields when modal opens
  useEffect(() => {
    if (modalOpen) {
      setAdminName(""); // Reset input fields
      setAdminPassword(""); // Reset input fields
    }
  }, [modalOpen]);
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
  const [batch, setBatch] = useState(null)
  const [course, setCourse] = useState("")
  const [city, setCity] = useState("")
  const [status, setStatus] = useState("")
  const [otherStatus, setOtherStatus] = useState("")
  const [payment, setPayment] = useState("")

  const [genderDone, setGenderDone] = useState("")
  const [batchDone, setBatchDone] = useState(null)
  const [courseDone, setCourseDone] = useState("")
  const [cityDone, setCityDone] = useState("")
  const [statusDone, setStatusDone] = useState("")
  const [otherStatusDone, setOtherStatusDone] = useState("")
  const [paymentDone, setPaymentDone] = useState("")
  const [rollNumberDone, setRollNumberDone] = useState("")
  const [cnicNumberDone, setCnicNumberDone] = useState("")

  const [allCourses, setAllCourses] = useState([])
  const [city123, setCity123] = useState("")






  const formatCnicNumber = (input) => {
    // Your formatting logic here (e.g., adding hyphens)
    // This is just a basic example, you may need to adjust it based on your requirements
    const formattedCnic = input.replace(/\D/g, '').replace(/^(\d{5})(\d{7})(\d{1})$/, '$1-$2-$3');
    return formattedCnic;
  };






  useEffect(() => {
    if (rollNumber.length === 5 && cnicNumber.length !== 15) {
      setCnicNumberDone("")
      console.log("Updated rollNo:", rollNumber);
      if (rollNumber !== rollNumberDone) {
        getUserRollNoData(rollNumber)
        // setAllUsers(rollNoUsers)
        // setVerifiedUsers(verifiedRollNo)
      }
    }
    else if (rollNumber.length === 5 && cnicNumber.length === 15) {
      console.log("Updated cnic:", cnicNumber);
      console.log("Updated rollNo:", rollNumber);
      if (rollNumber !== rollNumberDone || cnicNumber !== cnicNumberDone) {
        getUserCnicAndRollNoData(cnicNumber, rollNumber)
        //   setAllUsers(cnicAndRollNoUsers)
        //   setVerifiedUsers(verifiedrollNoAndCnic)
      }
    }
    else if (rollNumber.length !== 5 && cnicNumber.length === 15) {
      console.log("Updated cnic:", cnicNumber);
      if (cnicNumber !== cnicNumberDone || rollNumber.length < rollNumberDone.length) {
        setRollNumberDone("")
        getUserCnicData(cnicNumber)
        // setAllUsers(cnicUsers)
        // setVerifiedUsers(verifiedCnic)
      }
    }
    else if (rollNumber.length !== 5 && cnicNumber.length !== 15) {
      setRollNumberDone("")
      setCnicNumberDone("")
      if (city || course || batch || gender || status || otherStatus || payment) {
        console.log("Condition met! Other state has value.", status, otherStatus, city, batch, course, gender, payment);
        if (city !== cityDone || course !== courseDone || batch !== batchDone || gender !== genderDone || status !== statusDone || otherStatus !== otherStatusDone || payment !== paymentDone) {
          getUsersFromFilter(status, otherStatus, batch, gender, city, course, payment);
          // console.log("filterUsers-->",filterUsers)
          // setAllUsers(filterUsers)
          // setVerifiedUsers(filterVerified)
        }
      }
      else if (!city && !course && !batch && !gender && !status && !otherStatus && !payment) {
        setAllUsers(alternateUsers)
        setVerifiedUsers(alternateVerified)
      }
    }
  }, [rollNumber, cnicNumber, city, status, otherStatus, course, batch, gender, payment]);





  const getUsersFromFilter = async (status, otherStatus, batch, gender, city, course, payment) => {
    // setIsLoading(true); // Set loading state to true

    console.log("Filter Query Values-->", status, otherStatus, batch, gender, city, course, payment);

    let queryParams = '';

    if (status) {
      queryParams += `${queryParams ? '&' : ''}status=${status}`;
    }

    if (otherStatus) {
      queryParams += `${queryParams ? '&' : ''}otherStatus=${otherStatus}`;
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
      let userData = await fetch(`/api/students${queryParams ? '?' + queryParams : ''}`);
      userData = await userData.json();
      console.log(userData, "url-->", `/api/students${queryParams ? '?' + queryParams : ''}`);

      if (userData.success) {
        let data = userData.data;
        console.log("data-->", data, "url-->", `/api/students${queryParams ? '?' + queryParams : ''}`);

        // Convert single object to an array of length 1
        const users = Array.isArray(data) ? data : [data];
        const decodedUsers = users.map(user => ({
          createdAt: user.createdAt,
          rollNo: user.rollNo,
          batch: user.batch,
          _id: user._id,
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
          imageUrl: decodeURIComponent(user.imageUrl) // Decoding the image URL
        }));

        const verified = decodedUsers.filter(user => user.status === "verified");


        setStatusDone(status)
        setOtherStatusDone(otherStatus)
        setBatchDone(batch)
        setGenderDone(gender)
        setCityDone(city)
        setCourseDone(course)
        setPaymentDone(payment)
        setAllUsers(decodedUsers);
        setVerifiedUsers(verified);
      } else if (userData.success === false) {
        setAllUsers([]);
        setVerifiedUsers([]);
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
        // Consider a more informative message for the user here (e.g., "No students match your filter criteria")
      } else {
        alert("An error occurred!"); // Handle other potential errors more gracefully
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      toast.error(error, {
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
        let userData = await fetch(`/api/students?rollNo=${rollNumber}`);
        userData = await userData.json();
        console.log(userData);

        if (userData.success) {
          let data = userData.data;
          console.log("data-->", data);

          // Convert single object to an array of length 1
          const users = Array.isArray(data) ? data : [data];
          const decodedUsers = users.map(user => ({
            createdAt: user.createdAt,
            rollNo: user.rollNo,
            batch: user.batch,
            _id: user._id,
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
            imageUrl: decodeURIComponent(user.imageUrl) // Decoding the image URL
          }));

          const verified = decodedUsers.filter(user => user.status === "verified");

          setRollNumberDone(rollNumber)
          setAllUsers(decodedUsers);
          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          // checkingVerifiedUsers(users);
        } else if (userData.message === "No students found!") {
          toast.error('No students found!', {
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
          setAllUsers([])
          // setAlternateUsers(allUsers)
          setVerifiedUsers([]);
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
        toast.error(error, {
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
    }
  };

  const getUserCnicData = async (cnicNumber) => {
    console.log("cnicForUser-->", cnicNumber);
    if (cnicNumber) {
      try {
        let userData = await fetch(`/api/students?cnic=${cnicNumber}`);
        userData = await userData.json();
        console.log(userData);

        if (userData.success) {
          let data = userData.data;
          console.log("data-->", data);

          // Convert single object to an array of length 1
          const users = Array.isArray(data) ? data : [data];
          const decodedUsers = users.map(user => ({
            createdAt: user.createdAt,
            rollNo: user.rollNo,
            batch: user.batch,
            _id: user._id,
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
            imageUrl: decodeURIComponent(user.imageUrl) // Decoding the image URL
          }));

          const verified = decodedUsers.filter(user => user.status === "verified");

          setCnicNumberDone(cnicNumber)
          setAllUsers(decodedUsers);
          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          // checkingVerifiedUsers(users);
        } else if (userData.message === "No students found!") {
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
          setAllUsers([]);
          setVerifiedUsers([])
          // setAlternateUsers(allUsers)
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
        console.log(error)
        toast.error(error, {
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
    }
  };

  const getUserCnicAndRollNoData = async (cnicNumber, rollNumber) => {
    console.log("rollNoForUser-->", rollNumber);
    console.log("cnicForUser-->", cnicNumber);
    if (rollNumber && cnicNumber) {
      try {
        let queryData = await fetch(`/api/students?cnic=${cnicNumber}&rollNo=${rollNumber}`);
        queryData = await queryData.json();
        console.log(queryData);

        if (queryData.success) {
          let data = queryData.data;
          console.log("data-->", data);

          // Convert single object to an array of length 1
          const users = Array.isArray(data) ? data : [data];
          const decodedUsers = users.map(user => ({
            createdAt: user.createdAt,
            rollNo: user.rollNo,
            batch: user.batch,
            _id: user._id,
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
            imageUrl: decodeURIComponent(user.imageUrl) // Decoding the image URL
          }));

          // const verified = decodedUsers.filter(user => user.status === "verified");
          const verified1 = decodedUsers.filter(user => user.status === "verified");
          const verified = Array.isArray(verified1) ? verified1 : [verified1];
          const theUser = decodedUsers
          const finalUser = Array.isArray(theUser) ? theUser : [theUser];




          setRollNumberDone(rollNumber)
          setCnicNumberDone(cnicNumber)
          setAllUsers(finalUser);
          setVerifiedUsers(verified)
          // setAlternateUsers(allUsers)
          // checkingVerifiedUsers(users);
        } else if (queryData.message === "No students found!") {
          toast.error(queryData.message, {
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
          setAllUsers([]);
          setVerifiedUsers([])
        } else {
          toast.error(queryData.message, {
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
        toast.error(error, {
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
    }
  };

  useEffect(() => {
    // /api/students
    gettingAdmin();
  }, []);
  useEffect(() => {
    console.log("admin", admin)
    if (admin) {
      // gettingUsers(page)
      setHasMore(true)
    }

  }, [admin])

  useEffect(() => {
    console.log("coursesToLoad-->", coursesToLoad)

    if (coursesToLoad) {
      console.log("gettingCourses()")
      gettingCourses();
    }
  }, [coursesToLoad])

  useEffect(() => {
    if (sideNavbarCity.length > 0) {
      console.log("sideNavbarCity from /registration -->", sideNavbarCity);
      setCity(sideNavbarCity);
      setSideNavbarCity("")
    }
  }, [sideNavbarCity]);

  // useEffect(() => {
  //   if(allUsers.length>0 && admin){
  //     setCoursesToLoad(true)
  //     console.log("coursesToLoad-->",coursesToLoad)
  //   }
  // }, [allUsers,admin]);

  useEffect(() => {
    // const fetchData = async () => {
    //   if (api === true) {
    //     console.log("Reload hoja bhai");

    //     try {
    //       const res = await fetch("/api/students", {
    //         method: "GET",
    //         cache: "no-cache", // Set cache control policy to 'no-cache'
    //       });
    //       const data = await res.json();
    //       console.log("reload ka data", data)

    //       // Convert single object to an array of length 1
    //       const users = Array.isArray(data.data) ? data.data : [data.data];

    //       const decodedUsers = users.map(user => ({
    //         ...user,
    //         address: decodeURIComponent(user.address),
    //         qualification: decodeURIComponent(user.qualification),
    //       }));

    //       const verified = decodedUsers.filter(user => user.status === "verified");



    //       setVerifiedUsers(verified);
    //       setAlternateVerified(verified);

    //       // Set all users into state
    //       setAllUsers(decodedUsers);
    //       setAlternateUsers(decodedUsers);
    //       // checkingVerifiedUsers(users);
    //     } catch (error) {
    //       console.error("Error fetching users:", error);
    //     }
    //     setApi(false);
    //   }
    // };

    // fetchData();
    if (api) {
      setAllUsers([])
      setVerifiedUsers([])
      setHasMore(true)
    }
  }, [api]); // api ko dependency list mein include kiya hai

  useEffect(() => {
    console.log("hasMore----", hasMore, "---page---", page, "---allUsers---", allUsers)
    if (hasMore) {
      gettingUsers(page, api);
    }
    else if (!hasMore) {
      settingVerified()
    }
  }, [page, hasMore]);

  // const fetchUsers = async (page) => {
  //   setIsLoading(true);
  //   try {
  //     const response = await fetch(`/api/users?page=${page}`);
  //     const data = await response.json();
  //     if (data.length === 0) {
  //       setHasMore(false);
  //     } else {
  //       setUsers((prevUsers) => [...prevUsers, ...data]);
  //       setPage((prevPage) => prevPage + 1);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching users:', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const gettingUsers = async (page, api) => {
    console.log("gettingUsers");
    setIsLoading(true);
    try {
      console.log("try chal raha he");
      const res = await fetch(`/api/students?page=${page}`, {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      console.log("allUsers ka data-->", data)

      if (data.success) {
        // Convert single object to an array of length 1

        if (page == 1) {
          toast.info(`You have ${data.totalUsers} Students`, {
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

        const users = Array.isArray(data.data) ? data.data : [data.data];

        // Decode address and qualification fields
        const decodedUsers = users.map(user => ({
          createdAt: user.createdAt,
          rollNo: user.rollNo,
          batch: user.batch,
          _id: user._id,
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
          imageUrl: decodeURIComponent(user.imageUrl) // Decoding the image URL
        }));

        // const verified = decodedUsers.filter(user => user.status === "verified");

        // Update state with new users
        setAllUsers((prevUsers) => [...prevUsers, ...decodedUsers]);
        // setVerifiedUsers((prevUsers) => [...prevUsers, ...verified]);
        // setAlternateVerified((prevUsers) => [...prevUsers, ...verified]);
        // setAlternateUsers((prevUsers) => [...prevUsers, ...decodedUsers]);

        // Check if more users are available to fetch
        if (data.more === false) {
          setHasMore(false);
          setPage(1)
          setCoursesToLoad(true);
          if (api) {
            setApi(false)
          }
          toast.info(`Fetching Students Done ${data.totalUsers}`, {
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
        else if (data.more === true) {
          setHasMore(true)
          setPage((prevPage) => prevPage + 1);
        }


        // proper fetch karna he no students found kiu likha ata he or is k ialawah wo jo 2 se kum ho agar to sethasmore ko false lr raha he us ka bhi masla he k agar 2 hi hui le gth or wo akhri they to , or is k ilawah dtaa slow he kahin or functions to nhi chal rahay saath saath or is k ilawah kia admin ko fetch karnay ki zarurat he? or is k ilawah verified set krnay hein ahi se , or is k ilawah baaki fetch mein bhi pagination lagani he agar refreesh mein pagination se kaam nhi hota to phir alag route banaa paray ga



      } else if (data.message === "No students found!") {
        setHasMore(false);
        console.log("No students found!");
        toast.error(data.message, {
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
        handleAPIError(data.message);
      }
    } catch (error) {
      handleAPIError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAPIError = (message) => {
    console.error("Error fetching users:", message);
    toast.error(message, {
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
  };

  const settingVerified = () => {

    console.log("verifed set kr raha hu..", allUsers)
    const verified = allUsers.filter(user => user.status === "Verified");

    setAlternateUsers(allUsers)
    setVerifiedUsers(verified);
    setAlternateVerified(verified);
  }



  const gettingAdmin = async () => {
    console.log("gettingAdmin")
    try {
      const res = await fetch("/api/admins", {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      if (data.success) {
        setAdmin(data.data[0])
      }
      else if (data.success === false) {
        toast.error(data.message, {
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
      console.error("Error fetching admin:", error);
      toast.error(error, {
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

  const gettingCourses = async () => {
    console.log("gettingCourses");
    try {
      const res = await fetch("/api/courses", {
        method: "GET",
        cache: "no-cache", // Set cache control policy to 'no-cache'
      });
      const data = await res.json();
      console.log("gettingCourses ka data-->", data)

      if (data.success) {
        const courses = Array.isArray(data.data) ? data.data : [data.data]; // Use data.data directly
        console.log("allCourses-->", courses)

        const sortedCourses = courses.slice().sort((a, b) => {
          const courseA = a.course.toLowerCase(); // Convert to lowercase for case-insensitive sorting
          const courseB = b.course.toLowerCase();

          // Natural sorting using localeCompare with options
          return courseA.localeCompare(courseB, undefined, { numeric: true });
        });



        setAllCourses(courses);
        setCoursesToLoad(false)
      } else {
        setAllCourses([]);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };


  console.log("All Users:", allUsers.length, "-->", allUsers);
  console.log("Verified Users:", verifiedUsers.length, "-->", verifiedUsers);
  console.log("All Courses:", allCourses.length, "-->", allCourses);


  // const handleUserDeleted = (deletedUserId) => {
  //   // Filter out the deleted user from the list of users
  //   const updatedUsers = allUsers.filter((user) => user._id !== deletedUserId);
  //   setAllUsers(updatedUsers);
  // };

  const resetSelectInputs = () => {
    setCity("");
    setCourse("");
    setBatch(null);
    setStatus("");
    setOtherStatus("");
    setPayment("");
    setGender("");
    // setRollNumber("");
    // setCnicNumber("");
  };

  const handleClearQueries = () => {
    resetSelectInputs();
  };

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
      title: "Other-Status",
      key: "otherStatus",
      render: (text, record) => (


        <OtherVerificationButton id={record._id} userOtherStatus={record.otherStatus} />

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

          <DeleteIconComponent user={record} />


          {/* <EyeOutlined style={{ cursor: "pointer" }} /> */}

          {/* 
          <Button  style={{border:" none"}}>
            <DownloadOutlined style={{ cursor: "pointer" }} />
          </Button> */}

        </Space>
      ),
    },
  ];

  const handleKeyDown = (event) => {
    console.log(event.key); // Access event.key directly within the function
    if (event.key === "Enter") {
      // Capitalize the first letter of each word
      const formattedValue = event.target.value.replace(/\b\w/g, (char) => char.toUpperCase());
      setCity(formattedValue);
    }
  };


  const [loading, setLoading] = useState(true);


useEffect(() => {
  // Simulate page load completion
  const timer = setTimeout(() => {
    setLoading(false);
  }, 300); // Adjust the timeout as needed
  return () => clearTimeout(timer);
}, []);


  return (
    <div className = "pt-4 bg-[#9ec6f1]">


      <DynamicModal
      className = 'bg-[#9ec6f1]'
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
        <form className="mx-auto space-y-[20px]" autoComplete="off">
          <Input
            className="w-[100%] h-[40px]"
            placeholder="Admin Name"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
            autoComplete="off"
            name={`adminName_${Math.random()}`} // Randomized name attribute
          />
          <Input.Password
            className="w-[100%] h-[40px]"
            placeholder="Admin Key"
            value={adminPassword}
            onChange={(e) => setAdminPassword(e.target.value)}
            autoComplete="new-password"
            name={`adminPassword_${Math.random()}`} // Randomized name attribute
          />
          <Button
            className="ml-[30%] w-[40%] h-[40px]"
            onClick={handleAdminLogin}
            // disabled={!isFormValid}
          >
            Login
          </Button>
        </form>
      </DynamicModal>



      {!modalOpen && !loading ? (
        <>
          <div
           className="bg-[#9ec6f1] mt-[-16px]"
          //  style={{ width: "15%", height: "400px", border: "2px solid red" , backgroundColor : "green", position: "fixed",}}
          >
            <SideNavbarComponent router={router} />
          </div>


          {/* Cards */}
          <div className="flex justify-between space-x-4 ml-28 mr-8 mt-6">
            {/* First card */}
            <div className="flex-1 bg-white rounded-lg p-4 shadow-md ">
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


          {/* Search Bar */}
          <div className="mx-auto flex space-x-2 items-center mt-3 ml-[8%]">

            <div className="flex space-x-2 items-center bg-blue-500 w-[65%] mt-4 p-4 rounded-md shadow-md">
              {/* City */}

              <Input
                style={{ height: "32px", width: "115px" }}
                className="placeholder-gray-300 text-md bg-white"
                type="text"
                placeholder="City"
                label=""
                value={city || undefined}
                onChange={(event) => event.target.value} // Update state for visual feedback
                onKeyDown={handleKeyDown}
              />


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
                {allCourses.map((course) => (
                  <Select.Option key={course._id} value={course.course}>
                    {course.course}
                  </Select.Option>
                ))}
              </Select>

              {/* Batch */}
              <Input
                style={{ height: "32px", width: "115px" }}
                className="placeholder-gray-300 text-md bg-white"
                type="number"
                placeholder="Batch"
                label=""
                value={batch || undefined}
                onChange={(event) => { setBatch(event.target.value) }}
              />



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


              {/* otherStatus */}
              <Select
                showSearch
                style={{ width: 95 }}
                value={otherStatus || undefined}
                placeholder="Other-Status"
                optionFilterProp="children"
                onChange={(value) => setOtherStatus(value)}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                <Select.Option value="Pending">Pending</Select.Option>
                <Select.Option value="Enrolled">Enrolled</Select.Option>
                <Select.Option value="Completed">Completed</Select.Option>
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
                <Select.Option value="Not-Done">Not-Done</Select.Option>
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
                    const inputValue = event.target.value
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

          {/* Table */}
          <div className="mt-8 ml-[-1.5%]">

            {/* <TableComponent /> */}
            {/* <MyAntTable/> */}
            {allUsers.length > 0 ? <Table
              style={{
                marginLeft: "9.5%",
                width: "88.5%",
              }}
              dataSource={allUsers}
              columns={columns}
            /> :
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
                  <div className="loader-dot w-7 h-7 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
                  <div className="loader-dot w-7 h-7 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
                  <div className="loader-dot w-7 h-7 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
                  <div className="loader-dot w-7 h-7 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
                  {/* <div className="loader-dot w-5 h-5 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}></div> */}
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
      ) :  loading ? (
        <div className="h-screen w-[100%] flex items-center space-x-3 justify-center bg-[#9ec6f1]">
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
                    <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
                    {/* <div className="loader-dot w-7 h-7 bg-[#1f596b] rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div> */}
                </div>
      ):(
        null
      ) }

    </div>
  );
}
