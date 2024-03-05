"use client";

import React from 'react';
import { Layout, Menu } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
  SettingOutlined,
  SoundOutlined,
  MusicOutlined,
  HistoryOutlined,
  SaveOutlined,
  EditOutlined,
} from '@ant-design/icons';
// import ImageUser from '/public/images/Rizwan.png'

const { Sider } = Layout;

const SideNavbar = () => {
  return (
    <Layout style={{ minHeight: '100vh', position : 'fixed', }}>
      
      <Sider
       style={{backgroundColor:" #0E4C92" , paddingTop: '10px',}}
       width={80} theme="dark">

        <Menu mode="vertical"
        className='space-y-5'
         style={{backgroundColor:"#0E4C92" , }} theme="dark" defaultSelectedKeys={['1']}>
          
          <Menu.Item key="i1" style={{ }}
           icon= {
           <img style={{borderRadius: "20px", marginLeft: '-25%', width:"100%" }}
            src='/images/BhattiSahab.jpg' alt='User' />} />
          
          <Menu.Item key="1" icon={<EditOutlined />} />  {/* Edit icon */}
          <Menu.Item key="2" icon={<UserOutlined />} />
          <Menu.Item key="3" icon={<LaptopOutlined />} />
          <Menu.Item key="4" icon={<SaveOutlined />} /> {/* Save icon */}
          <Menu.Item key="5" icon={<NotificationOutlined />} />
          <Menu.Item key="6" icon={<SettingOutlined />} /> {/* Settings icon */}
          <Menu.Item key="7" icon={<SoundOutlined />} /> {/* Sound icon */}
          <Menu.Item key="8" icon={<HistoryOutlined />} /> {/* History icon */}
          {/* <Menu.Item key="6" icon={<MusicOutlined />} />  */}
        </Menu>
      </Sider>
    </Layout>
  );
};

export default SideNavbar;
