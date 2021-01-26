import React from 'react';
import { Tabs, Input, Button } from 'antd';
import icon from '../../assets/image/logo192.png';
import './index.less';

const { TabPane } = Tabs;

const Login: React.FC = () => {
  const onTabChange = () => {
    console.log(11111);
  }

  return (
    <div className='login'>
      <div className='login-info'>
        <div className='logo'>
          <div className='logoImg'>
            <img className='icon' src={icon} alt="" />
          </div>
          <div className='logoText'>FRONTEND</div>
        </div>
        <div className='userInfo'>
          <Tabs defaultActiveKey="1" onChange={onTabChange} className='loginTabs' animated>
            <TabPane tab={<div className='account'>账号登录</div>} key="1">
              <div className='act'>
                <Input placeholder='请输入账号' className='actInp' />
              </div>
              <div className='act'>
                <Input placeholder='请输入密码' className='actInp' />
              </div>
            </TabPane>
            <TabPane tab={<div className='account'>手机快捷登录</div>} key="2">
              <div className='act'>
                <Input placeholder='请输入手机号' className='actInp' />
              </div>
              <div className='act'>
                <Input placeholder='请输入验证码' className='actInp' />
              </div>
            </TabPane>
          </Tabs>
        </div>
        <Button className='loginSubmit'>登录</Button>
      </div>
    </div >
  )
}

export default Login;