"use client";

import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const GenderSelectBox = () => {
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  return (
    <Select
      showSearch
      style={{ width: 120 }}
      placeholder="Select Gender"
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {/* <Option value="select">Select</Option> */}
      <Option value="male">Male</Option>
      <Option value="female">Female</Option>
      
    </Select>
  );
};

export default GenderSelectBox;