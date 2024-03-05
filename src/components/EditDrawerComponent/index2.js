// import React, { useState } from 'react';
// import { Button } from 'antd';
// import AddStudentDrawer from './index'; // Update the path based on your project structure
// import { EditOutlined } from '@ant-design/icons';

// const EditStudentDrawerComponent = () => {
//   const [drawerVisible, setDrawerVisible] = useState(false);

//   const handleToggleDrawer = () => {
//     setDrawerVisible(!drawerVisible);
//   };

//   const handleAddStudent = () => {
//     // Implement your logic to handle adding the student
//     console.log('Adding student...');
//     // For simplicity, you can perform an action, such as making an API call
//   };

//   return (
//     <div>
//       {/* <h1>Your Page Content</h1>
//       <p>This is your main page content.</p> */}

//       <Button style={{border:" 1px solid green"}}  onClick={handleToggleDrawer}>
//       <EditOutlined style={{ cursor: "pointer" }}  onClick={handleToggleDrawer}/>
//       </Button>

//       <AddStudentDrawer
//         visible={drawerVisible}
//         onClose={handleToggleDrawer}
//         onAddStudent={handleAddStudent}
//       />
//     </div>
//   );
// };

// export default EditStudentDrawerComponent;
