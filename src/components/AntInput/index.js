"use client"


// AntInputComponent.js
import React from 'react';
import { Input } from 'antd';

const AntInputComponent = ({placeholder,value,onChange,style}) => {
  // const styles = {
  //   placeholder: {
  //     fontSize: "16px",  // Adjust the font size for the placeholder
  //   },
  // };

  return (
    <Input
    value={value}
    onChange={onChange}
      placeholder={placeholder || "Enter Name"}
      // inputStyle={styles.placeholder}
      style={style}
    //   onChange={onChange}
    //   value={value}
    />
  );
};

export default AntInputComponent;