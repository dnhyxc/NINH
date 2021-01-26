import React from 'react';
import { connect } from 'react-redux';
import MainLayout from './layout';
import Login from './login';
import './App.less';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';

interface IProps extends RouteComponentProps {
  children: any;
  userInfo: any;
  location: any;
  history: any;
  noWrapper?: boolean;
}

const App: React.FC<IProps> = ({ children, noWrapper, userInfo, location, history }) => {
  if (userInfo.userName && userInfo.passWord) {
    if (location.pathname !== '/app/login') {
      return <Redirect to='/app/login' />
    }
  }

  if (location.pathname === '/app/login') {
    return <Login />
  }

  return (
    <div className="App">
      <MainLayout>{children}</MainLayout>
    </div >
  );
}

export default connect(
  (state: any) => ({ userInfo: state.loginReducer })
)(withRouter(App));
