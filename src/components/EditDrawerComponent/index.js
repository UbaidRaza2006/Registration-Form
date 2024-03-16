// import React from "react";
// import { Drawer, Input, Button } from "antd";
// import CitySelectBox from "../CitySelectBox";
// import CourseSelectBox from "../CourseSelectBox";
// import BatchSelectBox from "../BatchSelectBox";
// import ApprovingSelectBox from "../ApprovingSelectBox";
// import GenderSelectBox from "../GenderSelectbox";

// const AddStudentDrawer = ({ visible, onClose, onAddStudent }) => {
//   const handleAddStudent = () => {
//     // Implement your logic to add the student, e.g., make an API call
//     // For simplicity, let's assume you have an onAddStudent callback
//     onAddStudent();

//     // Close the drawer after adding the student
//     onClose();
//   };

//   return (
//     <Drawer
//       title="Edit Student"
//       visible={visible}
//       onClose={onClose}
//       width={300}
//       placement="right"
//       style={{ backgroundColor: "#bad277" }}
//     >
//       <div style={{marginTop:"-10px"}}>
//         <p>Student Name:</p>
//         <Input placeholder="Enter Student Name" type="text" />
//       </div>
//       <div style={{marginTop:"10px"}}>
//         <p>Father Name:</p>
//         <Input placeholder="Enter Father Name" type="text" />
//       </div>
//       <div style={{marginTop:"10px"}}>
//         <p>Roll No:</p>
//         <Input placeholder="Enter Roll Number" type="number" />
//       </div>
//       <div style={{marginTop:"10px"}}>
//         <p>Phone No:</p>
//         <Input placeholder="Enter Phone Number" type="number" />
//       </div>
//       <div style={{marginTop:"10px"}}>
//         <p>CNIC/B-form:</p>
//         <Input placeholder="Enter CNIC/B-Form Number" type="number" />
//       </div>

//       <div style={{ display: "flex", alignItems: "center",marginTop:"10px" }}>
//         <div style={{ marginRight: "10px" }}>
//           <p>City:</p>
//           <CitySelectBox />
//         </div>

//         <div>
//           <p>Course:</p>
//           <CourseSelectBox />
//         </div>
//       </div>

//       <div style={{ display: "flex", alignItems: "center",marginTop:"10px" }}>
//         <div style={{ marginRight: "10px" }}>
//           <p>Batch:</p>
//           <BatchSelectBox />
//         </div>

//         <div>
//           <p>Male:</p>
//           <GenderSelectBox />
//         </div>
//       </div>

//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           marginTop:"10px"
//           // height: "100vh",
//         }}
//       >
//         <div>
//           <p>Action:</p>
//           <ApprovingSelectBox />
//         </div>
//       </div>

//       {/* <div>
//         <label></label>
//         <Input placeholder="Enter grade" />
//       </div> */}
//       <br/>


//       <Button
//         style={{ backgroundColor: "blue",width:"100%", height:"8.5%",
//           justifyContent: "center",
//           alignItems: "center",
//           display: "flex",
//         }}
//         type="primary"
//         onClick={handleAddStudent}
//       >
//         Edit Student
//       </Button>

//     </Drawer>

//   );
// };

// export default AddStudentDrawer;
