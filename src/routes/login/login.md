```tsx
import React, { Component } from 'react';
import {
  Button, Input, Form, Tabs,
} from 'antd';

import styles from './index.less';

const { TabPane } = Tabs;

const timerTime = 60;
interface Iprop {
  siteConfig: any;
}
/* eslint-disable react/no-unsafe */
class LoginPage extends Component<Iprop> {
  private authKeyRef: React.RefObject<Input>;

  private passwordxRef: React.RefObject<Input>;

  private phoneRef: React.RefObject<Input>;

  private verfiCodeRef: React.RefObject<Input>;

  constructor(props: Iprop) {
    super(props);
    this.state = {
      encrypt: true, // 密码加密状态
      loading: false,
      timer: null,
      timerText: timerTime,
      accountList: [],
      ticket: '',
      visibleAccount: false,
      loadingAccount: false,
    };
    this.authKeyRef = React.createRef();
    this.passwordxRef = React.createRef();
    this.phoneRef = React.createRef();
    this.verfiCodeRef = React.createRef();
    this.loginCallback = this.loginCallback.bind(this);
  }

  // 保存
  submit = () => {
    if (this.state.loading) {
      return false;
    }
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const options = {
          type: this.state.loginType,
          authKey: values.authKey,
          passwordx: values.passwordx,
          mobile: values.phone,
          veriCode: values.veriCode,
        };
        await this.setState({ loading: true });
        const result = await authController.login(options);
        await this.setState({ loading: false });
        if (result.showAccountList) {
          this.setState({
            accountList: result.accountList,
            ticket: result.ticket,
            visibleAccount: true,
          });
        } else if (!result.success) {
          MTools.Tips('error', result.msg);
        } else {
          location.href = '/';
        }
      }
    });
  }

  getVeriCode() {
    if (this.state.timer) return;
    if (this.state.loading) return;
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        const options = {
          mobile: values.phone,
        };
        const result = await authController.getLoginCode(options);
        if (!result.success) {
          MTools.Tips('error', result.msg);
        } else {
          MTools.Tips('success', '发送成功');
          let numbers = this.state.timerText;
          const circleTimer = () => {
            const timer = setTimeout(() => {
              numbers = numbers! - 1 || 0;
              this.setState({
                timerText: numbers,
              });
              if (!numbers) {
                this.setState({
                  timer: null,
                  timerText: timerTime,
                });
              }
              if (numbers) {
                circleTimer();
              }
            }, 1000);
            this.setState({
              timer,
            });
          };
          circleTimer();
        }
      }
    });
  }

  componentWillUnmount() {
    const { timer } = this.state;
    if (timer) {
      clearTimeout(timer);
    }
  }

  // 切换是否显示密码
  changeEncrypt = () => {
    this.setState({
      encrypt: !this.state.encrypt,
    });
  }

  // 回车的处理
  handlePressEnter = () => {
    // 如果账号没值 则定位到账号上
    // 如果密码没值 则定位到密码上
    // 如果都有值 则执行提交操作
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // 账号密码登录
        if (this.state.loginType === SITE.loginType.password) {
          if ((values.authKey || '').trim() === '') {
            this.authKeyRef!.current!.focus();
            return false;
          } else if ((values.passwordx || '').trim() === '') {
            this.passwordxRef!.current!.focus();
            return false;
          } else {
            this.submit();
          }
          // 手机验证码登录
        } else if (this.state.loginType === SITE.loginType.mobile) {
          if ((values.phone || '').trim() === '') {
            this.phoneRef!.current!.focus();
            return false;
          } else if ((values.veriCode || '').trim() === '') {
            this.verfiCodeRef!.current!.focus();
            return false;
          } else {
            this.submit();
          }
        }
      }
    });
  }

  loginCallback(val: any) {
    this.setState({
      loginType: val,
    });
  }

  closeAccountModal = () => {
    this.setState({
      visibleAccount: false,
    });
  }

  selectAccount = async (account: any) => {
    await this.setState({ loadingAccount: true, loading: true });
    const result = await authController.loginByUserId(account.userIdString, this.state.ticket);
    await this.setState({ loading: false, loadingAccount: false });
    if (!result.success) {
      MTools.Tips('error', result.msg);
    } else {
      await this.setState({ visibleAccount: false });
      location.href = '/';
    }
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { siteConfig } = this.props;
    const { visibleAccount, accountList, loadingAccount } = this.state;
    let containerStyle = siteConfig?.loginBgUrl || SITE.loginBgUrl;
    if (containerStyle.indexOf(',') < 0) {
      containerStyle = { backgroundImage: `url(${containerStyle})` };
    }
    return (
      <div className={styles.container} id="wdwdwd" style={containerStyle}>
        <div className={styles.main}>
          <div className={styles.header}>
            {/* <h1>{login.name}</h1> */}
            {/* <p className={styles.subTitle}>{login.desc}</p> */}
            <img src={siteConfig?.logoUrl || SITE.logoUrl} />
          </div>
          <div className={styles.formWarp}>
            <Tabs
              defaultActiveKey={this.state.loginType}
              onChange={this.loginCallback}
              tabBarGutter={0}
            >
              <TabPane tab="账号登录" key={SITE.loginType.password}>
                <div className={styles.form}>
                  <div className={styles.formItem}>
                    {getFieldDecorator('authKey', {
                    })(
                      <Input className={styles.formItemSub} ref={this.authKeyRef} placeholder="请输入账号" onPressEnter={this.handlePressEnter} />,
                    )}
                  </div>
                  <div className={classnames(styles.formItem, styles.password)}>
                    {getFieldDecorator('passwordx', {
                    })(
                      <Input
                        className={styles.formItemSub}
                        ref={this.passwordxRef}
                        type={this.state.encrypt ? 'password' : 'text'}
                        placeholder="请输入密码"
                        onPressEnter={this.handlePressEnter}
                      />,
                    )}
                    <Icon className={styles.encrypt} type={this.state.encrypt ? 'eye-invisible' : 'eye'} onClick={this.changeEncrypt} />
                  </div>
                </div>
              </TabPane>
              <TabPane tab="手机快捷登录" key={SITE.loginType.mobile}>
                <div className={styles.form}>
                  <div className={styles.formItem}>
                    {getFieldDecorator('phone', {
                    })(
                      <Input className={styles.formItemSub} ref={this.phoneRef} placeholder="请输入手机号" onPressEnter={this.handlePressEnter} />,
                    )}
                  </div>
                  <div className={classnames(styles.formItem, styles.password)}>
                    {getFieldDecorator('veriCode', {
                    })(
                      <Input
                        className={styles.formItemSub}
                        ref={this.verfiCodeRef}
                        type="text"
                        placeholder="请输入验证码"
                        onPressEnter={this.handlePressEnter}
                        maxLength={10}
                      // addonAfter="获取验证码"
                      />,
                    )}
                    <div className={styles.veriCode} onClick={this.getVeriCode.bind(this)}>{this.state.timer && `${this.state.timerText}s` || '获取验证码'}</div>
                  </div>
                </div>
              </TabPane>
            </Tabs>
          </div>
          <Button className={styles.btn} type="primary" onClick={this.submit} loading={this.state.loading}>
            登录
          </Button>
        </div>
        {
          visibleAccount && (
            <AccountModal
              accountList={accountList}
              visible={visibleAccount}
              loading={loadingAccount}
              onCancel={this.closeAccountModal}
              onSelect={this.selectAccount}
            />
          )
        }
      </div>
    );
  }
}
export default connect(({ auth }: GlobalState) => {
  console.log(auth.power);
  return {
    siteConfig: auth.power.site_config,
  };
})(Form.create()(LoginPage));
```

```less
.container {
  height: 100%;
  width: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
  overflow-y: scroll;
  user-select: none;
  &:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    width: 720px;
    background-image: linear-gradient(90deg,rgba(241,242,244, 0.75),rgba(255,255,255, 0));
  }
  .main {
    position: absolute;
    text-align: left;
    display: inline-block;
    top: 150px;
    left: 217px;
    padding-bottom: 32px;
    width: 377px;
    .header {
      position: relative;
      margin-bottom: 80px;
      text-align: center;
      img {
        width: auto;
        max-height: 138px;
      }
    }
    .formWarp{
      width: 100%;
    }
    :global(.ant-tabs-nav) {
      width: 100%;
      :global(.ant-tabs-tab) {
        width: 50%;
        text-align: center;
        font-size: 16px;
        color: rgba(0, 0, 0, 0.85);
      }
      :global(.ant-tabs-ink-bar) {
        height: 4px;
        background-color: #0C47A9;
      }
    }
    :global(.ant-tabs-bar) {
      border-color: #d7dfeb;
    }
    .form {
      width: 100%;
      text-align: left;
      margin-bottom: 40px;
      .formItem {
        height: 72px;
        padding-top: 26px;

        .formItemSub{
          border: none;
          background-color: transparent;
          border-bottom: 1px solid #d7dfeb;
          &:focus {
            box-shadow: none;
          }
        }
        :global(.ant-input) {
          height: 46px;
          border-radius: 0;
          border: 0;
          border-bottom: 1px solid #d7dfeb;
          font-size: 18px;
          padding: 4px 0;
        }

        &.password {
          position: relative;

          :global(.ant-input) {
            padding: 4px 38px 4px 0;
          }

          .encrypt {
            position: absolute;
            right: 11px;
            bottom: 15px;
            font-size: 16px;
            width: 16px;
            height: 16px;
            cursor: pointer;
          }
          .veriCode{
              position: absolute;
              font-size: 16px;
              color: #1890ff;
              right: 11px;
              bottom: 15px;
              cursor: pointer;
          }
        }
        input:focus{
          border-bottom: 1px solid #0C47A9;
        }
        .ant-input-group-addon{
          background-color: transparent !important;
        }
      }
    }

    .btn {
      width: 377px;
      height: 56px;
      line-height: 56px;
      font-family: PingFangSC-Regular;
      color: #fff;
      font-size: 22px;
      background-image: linear-gradient(90deg,#0C47A9,#4D8DF7);
      border: none;
    }
  }
}

@media only screen and (max-width: 1024px) {
  .container  {
      text-align: center;
      .main {
        position: static;
        padding-top: 200px;
      }
  }
}
```