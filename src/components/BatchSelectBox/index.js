"use client";

import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const BatchSelectBox = () => {
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  return (
    <Select
      showSearch
      style={{ width: 120 }}
      placeholder="Select Batch"
      optionFilterProp="children"
      onChange={handleChange}
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
  );
};

export default BatchSelectBox;