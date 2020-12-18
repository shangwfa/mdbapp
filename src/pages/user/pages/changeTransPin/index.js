import React from 'react';
import BasePage from '../../../BasePage';
import {View, StyleSheet, Button, Keyboard,Text} from 'react-native';
import {Toast, List, InputItem} from '@ant-design/react-native';
import CountDown from '../../../../components/base/CountDown';
import HTTP from '../../../../api';
class changeTransPin extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '修改交易密碼',
    });
    this.state = {
      code: 1,
      btnOtpDisabled: false,
      oldPin2:"",
      newPin2:"",
      newPin2Confirm:""
    };
  }
  onSubmit = async () =>{
    let {oldPin2, newPin2,newPin2Confirm} = this.state;
    console.log(oldPin2,newPin2,newPin2Confirm);
    await HTTP.api({
      url: 'login.do',
      method: 'POST',
      data: {
        ActionMethod: 'updatePin2',
        oldPin2:oldPin2,
        newPin2:newPin2,
        newPin2Confirm:newPin2Confirm,
      },
    });
    // this.props.submitVerifyCode({smsFlowNo, otp});
  }
  renderContainer() {
    const {btnOtpDisabled} = this.state;
    return (
      <>
      <List>
          <InputItem value={this.state.oldPin2} onChange={(value) => {
              this.setState({
                oldPin2: value,
              });
            }}>原密碼</InputItem>
          <InputItem value={this.state.newPin2} onChange={(value) => {
              this.setState({
                newPin2: value,
              });
            }}>新密碼</InputItem>
          <InputItem value={this.state.newPin2Confirm} onChange={(value) => {
              this.setState({
                newPin2Confirm: value,
              });
            }}>重複密碼</InputItem>
          </List>
          <View>
          <Text>6位數字組合</Text>
            <Button
            onPress={() => {
              this.onSubmit();
            }}
            disabled={btnOtpDisabled}
            title="完成"
          /></View>
          </>
      )
  }
}
export default changeTransPin;
