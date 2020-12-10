import React from 'react';
import {StyleSheet, TextInput, Button, Keyboard} from 'react-native';
import {View, Text} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
import CountDown from './CountDown';
import HTTP from '../../../../api';
class AboutUS extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '重置交易密碼',
    });
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
  resendOtp = async () => {
    let smsFlowNo = this.state.smsFlowNo;
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

  onPressFirst = async () => {
    let {smsFlowNo, otp} = this.state;
    await HTTP.api({
      url: 'json.do',
      method: 'POST',
      data: {
        ActionMethod: 'checkOtp',
        smsFlowNo: smsFlowNo,
        otp: otp,
      },
    });
  };

  renderContainer() {
    const {btnOtpDisabled} = this.state;
    return (
      <View style={styles.wrapper}>
        <View style={styles.item}>
          <Text style={styles.left}>電話號碼</Text>
          <Text style={styles.right}>853****4197</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.left}>短訊驗證碼</Text>
          <TextInput
            onChangeText={(text) => this.setState({otp: text})}
            style={styles.input}
            placeholder="請輸入"
          />
          <CountDown
            enable={true}
            timerCount={60}
            onClick={() => {
              this.onPressOTPSend();
            }}
          />
        </View>
        <Button
          onPress={() => {
            Keyboard.dismiss();
            this.onPressFirst();
          }}
          disabled={btnOtpDisabled}
          title="完成"
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    height: 150,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  left: {
    width: 100,
  },
  btn: {
    flex: 1,
    textAlign: 'right',
    color: '#edc31e',
  },
  input: {
    flex: 1,
  },
});
export default AboutUS;
