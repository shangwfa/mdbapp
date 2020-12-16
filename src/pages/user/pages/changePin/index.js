import React from 'react';
import BasePage from '../../../BasePage';
import {View, StyleSheet, Button, Keyboard,Text} from 'react-native';
import {Toast, List, InputItem} from '@ant-design/react-native';
// import CountDown from '../base/CountDown';
class ChangePin extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '修改登入密碼',
    });
    this.state = {
      code: 1,
    };
  }
  submitVerifyCode = (smsFlowNo) => {
    this.props.navigation.navigate('ResetTransPin', smsFlowNo);
  };
  onPressOTPSend = async () => {
    //點擊發送或者重發
    if (this.state.firstOnPress) {
      const res = await HTTP.api({
        url: 'json.do',
        method: 'POST',
        params: {
          ActionMethod: 'sendOtp',
          PageLanguage: 'zh_CN',
          funcName: 'app.mb.core.resetTxnPwd',
        },
      });
      this.setState({
        smsFlowNo: res.smsFlowNo,
        btnOtpDisabled: false,
        firstOnPress: false,
      });
    } else {
      this.resendOtp();
    }
  };
  resendOtp = async () => {
    const {smsFlowNo} = this.state;
    await HTTP.api({
      url: 'json.do',
      method: 'POST',
      data: {
        ActionMethod: 'resendOtp',
        smsFlowNo: smsFlowNo,
      },
    });
    this.setState({
      btnOtpDisabled: false,
    });
  };
  // renderContainer() {
  //   return (<List> <InputItem value={'XUWENMING'}>登入ID</InputItem></List>)
  // }
  renderContainer() {
    return (
      <>
      <List>
          <InputItem>原密碼</InputItem>
          <InputItem>新密碼</InputItem>
          <InputItem>重複密碼</InputItem>
          </List>
          <View>
            <Text>8-20位數字及英文組合，區分大小寫，不能輸入空格及符號</Text>
            <InputItem
            value={this.state.otp}
            onChange={(value) => {
              this.setState({
                otp: value,
              });
            }}
            // extra={
            //   <CountDown
            //     enable={true}
            //     timerCount={60}
            //     onClick={() => {
            //       this.onPressOTPSend();
            //     }}
            //   />
            // }
            placeholder="请输入短訊驗證碼">
            短訊驗證碼
          </InputItem>
          </View>
          </>
      )
  }
}
export default ChangePin;
