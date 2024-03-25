import React, { useState } from 'react';
import { Button, Input, Layout, Menu, Modal } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  LockOutlined,
  NotificationOutlined,
  SettingOutlined,
  SoundOutlined,
  MusicOutlined,
  HistoryOutlined,
  SaveOutlined,
  EditOutlined,
  EyeOutlined,
  ReloadOutlined,
  EyeInvisibleOutlined,
} from '@ant-design/icons';
import { usePassword } from '../../context';

const { Sider } = Layout;

const SideNavbar = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(null);
  const [inputPassword, setInputPassword] = useState('');
  const [recheckPassword, setRecheckPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inputCondition, setInputCondition] = useState("verify");



const { password, setPassword,api,setApi} = usePassword();

console.log(inputCondition)
console.log(inputPassword)


const handlePassword = () => {


  if(inputCondition === "verify"){
    if(inputPassword===password){
setInputCondition("update")
setInputPassword("")
    }
    else{
      alert("First , enter correct current Password")
    }
  }
  else if(inputCondition === "update"){
    setRecheckPassword(inputPassword)
    setInputPassword("")
setInputCondition("recheck")
  }
  else if(inputCondition === "recheck"){
    if(inputPassword === recheckPassword){
      setPassword(inputPassword)
      setInputPassword("")
      setInputCondition("verify")
      alert(`Pssword changed into "${inputPassword}" `)
    }
    else {
      alert("Type Again!")
    }
  }
  // setPassword(inputPassword);
  // setInputPassword('');
};


  const showModal = () => {
    // setSelectedIcon(icon);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Layout style={{ minHeight: '100vh', position: 'fixed', marginTop: '-20px' }}>
      <Sider style={{ backgroundColor: "#0E4C92", paddingTop: '10px' }} width={80} theme="dark">
        <Menu mode="vertical" className='space-y-5' style={{ backgroundColor: "#0E4C92" }} theme="dark" defaultSelectedKeys={['1']}>
          <Menu.Item key="i1" icon={<img style={{ borderRadius: "20px", marginLeft: '-25%', width: "100%" }} src='/images/BhattiSahab.jpg' alt='User' />} onClick={() => showModal('user')} />
          <Menu.Item key="1" icon={<LockOutlined />} onClick={() => showModal()} />
           <Menu.Item key="2" icon={api? ( <div className="flex space-x-4">
    <div className="loader-dot w-1 h-1 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out' }}></div>
    <div className="loader-dot w-1 h-1 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.3s' }}></div>
    <div className="loader-dot w-1 h-1 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.6s' }}></div>
    <div className="loader-dot w-1 h-1 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '0.9s' }}></div>
    <div className="loader-dot w-1 h-1 bg-gray-800 rounded-full animate-pulse" style={{ animationDuration: '1.5s', animationIterationCount: 'infinite', animationTimingFunction: 'ease-in-out', animationDelay: '1.2s' }}></div>
  </div>):(<ReloadOutlined />)} onClick={() => {setApi(true)}} />
         {/* <Menu.Item key="3" icon={<LaptopOutlined />} onClick={() => showModal()} />
          <Menu.Item key="4" icon={<SaveOutlined />} onClick={() => showModal()} />
          <Menu.Item key="5" icon={<NotificationOutlined />} onClick={() => showModal()} />
          <Menu.Item key="6" icon={<SettingOutlined />} onClick={() => showModal()} />
          <Menu.Item key="7" icon={<SoundOutlined />} onClick={() => showModal()} />
          <Menu.Item key="8" icon={<HistoryOutlined />} onClick={() => showModal()} /> */}
          {/* <Menu.Item key="6" icon={<MusicOutlined />} /> */}
        </Menu>
      </Sider>
      <Modal
      visible={isModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
    >
      <div style={{ marginBottom: '20px' }}>
        <p>{inputCondition === "verify"? "First Verify It is You?!" : inputCondition === "update" ? "Enter The Passowrd to be updated!": "Type again to Confirm"} </p>
        <Input.Password
          value={inputPassword}
          onChange={(e) => setInputPassword(e.target.value)}
          placeholder={inputCondition === "verify"? "Enter Current Password" : inputCondition === "update" ? "Enter New Password": "Confirm Password"}
          addonAfter={
            showPassword ? (
              <EyeInvisibleOutlined onClick={togglePasswordVisibility} />
            ) : (
              <EyeOutlined onClick={togglePasswordVisibility} />
            )
          }
        />
      </div>
      <Button type="primary" style={{backgroundColor:"#0056b3"}} onClick={handlePassword}>{inputCondition === "verify"? "Next" : inputCondition === "update" ? "Save Password": "Confirm"}</Button>
    </Modal>

    
    </Layout>
  );
};

export default SideNavbar;
