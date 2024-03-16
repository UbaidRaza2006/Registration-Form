import React, { useState } from 'react';
import { Drawer, Button } from 'antd';
import { EyeOutlined } from '@ant-design/icons';

const StudentDrawer = ({ student, visible, onClose }) => (
  <Drawer
    title="Student Information"
    placement="right"
    closable={true}
    onClose={onClose}
    style={{backgroundColor: "#a6c6d8	" }}
    visible={visible}
    width={300}
  >
    <p>Name: {student.name}</p>
    <p>Roll Number: {student.rollNumber}</p>
    {/* Add more data fields as needed */}
  </Drawer>
);


const EyeViewDrawerComponent = () => {
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Mock student data
  const mockStudent = {
    name: 'John Doe',
    rollNumber: '12345',
    // Add more data fields as needed
  };

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <div>
      <Button style={{border:" 1px solid black"}} onClick={showDrawer}>
      <EyeOutlined style={{ cursor: "pointer" }} onClick={showDrawer}/>
      </Button>
      <StudentDrawer
        student={mockStudent}
        visible={drawerVisible}
        onClose={closeDrawer}
      />
    </div>
  );
};

export default EyeViewDrawerComponent;
