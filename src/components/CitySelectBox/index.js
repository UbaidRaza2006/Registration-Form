"use client";

import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

const CitySelectBox = () => {
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  return (
    <Select
      showSearch
      style={{ width: 120 }}
      placeholder="Karachi"
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      <Option value="karachi">Karachi</Option>
      <Option value="lahore">Lahore</Option>
      <Option value="quetta">Quetta</Option>
    </Select>
  );
};

export default CitySelectBox;