import React from 'react';
import BasePage from '../../../BasePage';
import {View, StyleSheet, Button, Keyboard,Text} from 'react-native';
import {Toast, List, InputItem} from '@ant-design/react-native';
import CountDown from '../../../../components/base/CountDown';
class ChangePin extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '修改登入密碼',
    });
    this.state = {
      oldPassword:"",
      newPassword:"",
      confirmPassword:"",
      smsFlowNo:"",
      otp:"",
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
  onSubmit = async () =>{
    let {oldPassword, newPin2,newPin2Confirm} = this.state;
    console.log(oldPin2,newPin2,newPin2Confirm);
    await HTTP.api({
      url: 'changePinSrv.do',
      method: 'POST',
      data: {
        ActionMethod: 'changePinConfirm',
        oldPassword:oldPassword,
        newPassword:newPassword
      },
    });
    await HTTP.api({
      url: 'changePinSrv.do',
      method: 'POST',
      data: {
        ActionMethod: 'changePinAck',
        nPin:encodeURIComponent(res.nPin),
        oPin:encodeURIComponent(res.oPin),
        otp:this.state.otp.trim(),
        exceedResendFlag:res.exceedResendFlag,
        exceedResend:res.exceedResend
      },
    });
    // this.props.submitVerifyCode({smsFlowNo, otp});
  }
  // renderContainer() {
  //   return (<List> <InputItem value={'XUWENMING'}>登入ID</InputItem></List>)
  // }
  renderContainer() {
    return (
      <>
      <List>
          <InputItem value={this.state.oldPassword} onChange={(value) => {
              this.setState({
                oldPassword: value,
              });
            }} placeholder={'請輸入密碼'}>原密碼</InputItem>
          <InputItem value={this.state.newPassword} onChange={(value) => {
              this.setState({
                newPassword: value,
              });
            }} placeholder={'請輸入新密碼'}>新密碼</InputItem>
          <InputItem value={this.state.confirmPassword} onChange={(value) => {
              this.setState({
                confirmPassword: value,
              });
            }} placeholder={'請重複新密碼'}>重複密碼</InputItem>
          </List>
          <View>
            <Text>8-20位數字及英文組合，區分大小寫，不能輸入空格及符號</Text>
            <InputItem
            value={this.state.smsFlowNo}
            onChange={(value) => {
              this.setState({
                smsFlowNo: value,
              });
            }}
            extra={
              <CountDown
                enable={true}
                timerCount={60}
                onClick={() => {
                  this.onPressOTPSend();
                }}
              />
            }
            placeholder="请输入短訊驗證碼">
            短訊驗證碼
          </InputItem>
          <Button
            onPress={() => {
              Keyboard.dismiss();
              this.validateInput();
            }}
            title="完成"
          />
        </View>
          </>
      )
  }
}
export default ChangePin;
