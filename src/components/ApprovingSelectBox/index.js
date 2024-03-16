"use client";

import React from "react";
import { Select } from "antd";

const { Option } = Select;

const ApprovingSelectBox = () => {
  function handleChange(value) {
    console.log(`Selected: ${value}`);
  }

  return (
    <Select
      showSearch
      style={{ width: 120 }}
      placeholder="Approved"
      optionFilterProp="children"
      onChange={handleChange}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }
    >
      {/* <Option value="select">Select</Option> */}
      <Option value="Approved">Approved</Option>
      <Option value="Pending">Pending</Option>
      <Option value="Complete">Complete</Option>
    </Select>
  );
};

export default ApprovingSelectBox;
