import React from 'react';
import { Input } from 'antd';
const { Search } = Input;
const SearchBox = () => (
  <>
    {/* <Search placeholder="input search loading default" loading /> */}
    {/* <br /> */}
    {/* <br /> */}
    <Search 
          style={{ width: 150 , backgroundColor: "blue" , borderRadius:"10px" }}
    placeholder="Search ............." enterButton />
    {/* <br /> */}
    {/* <br /> */}
    {/* <Search placeholder="input search text" enterButton="Search" size="large" loading /> */}
  </>
);
export default SearchBox;