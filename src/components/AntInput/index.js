"use client"


// AntInputComponent.js
import React from 'react';
import { Input } from 'antd';

const AntInputComponent = ({placeholder,value,onChange,style,type, disabled, maxLength, className}) => {
  // const styles = {
  //   placeholder: {
  //     fontSize: "16px",  // Adjust the font size for the placeholder
  //   },
  // };

  return (
    <Input
    maxLength={maxLength}
    disabled={disabled}
    type={type}
    value={value}
    onChange={onChange}
      placeholder={placeholder || "Enter Name"}
      className={className}
      // inputStyle={styles.placeholder}
      style={style}
    //   onChange={onChange}
    //   value={value}
    />
  );
};

export default AntInputComponent;