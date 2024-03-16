"use client";

import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CourseSelectBox = () => {
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  return (
    <Select
      showSearch
      style={{ width: 120 }}
      placeholder="Web & App Development"
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option style={{ width: 200 }} value="web">Web & App Development</Option>
      <Option style={{ width: 200 }} value="ai">AI</Option>
      <Option style={{ width: 200 }} value="graphic">Graphic Designing</Option>
      <Option style={{ width: 200 }} value="bs-manage">Businees Management</Option>
      <Option style={{ width: 200 }} value="dg-market">Digital Marketing</Option>
    </Select>
  );
};

export default CourseSelectBox;