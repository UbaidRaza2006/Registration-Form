import React from 'react';
import { Button, Flex } from 'antd';
const ButtonComponent= (onClick) => (
  <Flex gap="small" wrap="wrap">
    <Button 
    onClick={onClick}
    style={{backgroundColor: 'blue'}}
     type="primary">Enter</Button>
    {/* <Button>Default Button</Button>
    <Button type="dashed">Dashed Button</Button>
    <Button type="text">Text Button</Button>
    <Button type="link">Link Button</Button> */}
  </Flex>
);
export default ButtonComponent;