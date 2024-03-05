// AntInputComponent.js
import React from 'react';
import { Input } from 'antd';

const AntInputComponent = ({placeholder,value,onChange}) => {
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
      style={{
       //backgroundColor: "	#C0C0C0",
         backgroundColor: "white",
         width: "320px",
         height: "33px",
        //  borderRadius: "10px",
         fontSize: "15px",
      }}
    //   onChange={onChange}
    //   value={value}
    />
  );
};

export default AntInputComponent;