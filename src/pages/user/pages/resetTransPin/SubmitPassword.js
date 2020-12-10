import React from 'react';
import {StyleSheet, TextInput, Button, Keyboard} from 'react-native';
import {View, Text} from '@ant-design/react-native';
import CountDown from './CountDown';
import HTTP from '../../../../api';
class SubmitPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      viewDepth: 1,
      smsFlowNo: '',
      btnOtpDisabled: true,
      firstOnPress: true,
      otp: '',
    };
  }
  onPressOTPSend = async () => {
    console.log('onPressOTPSend11');
    //點擊發送或者重發
    if (this.state.firstOnPress) {
      console.log('onPressOTPSend-首次发送');
      this.setState({
        smsFlowNo: '123454321',
        btnOtpDisabled: false,
        firstOnPress: false,
      });
      // const res = await HTTP.api({
      //   url: 'json.do',
      //   method: 'POST',
      //   data: {
      //     ActionMethod: 'sendOtp',
      //     funcName: 'app.mb.core.resetTxnPwd',
      //   },
      // });
      // this.setState({
      //   smsFlowNo: res.smsFlowNo,
      //   btnOtpDisabled: false,
      //   firstOnPress: false,
      // });
    } else {
      console.log('onPressOTPSend-重新发送');
      // this.resendOtp();
    }
  };

  render() {
    const {btnOtpDisabled} = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.item}>
          <Text style={styles.left}>提交密码</Text>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({});
export default SubmitPassword;
