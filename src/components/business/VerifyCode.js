import React from 'react';
import {StyleSheet, Button, Keyboard} from 'react-native';
import {View, List, InputItem} from '@ant-design/react-native';
import PropTypes from 'prop-types';
import CountDown from '#/components/base/CountDown';
import HTTP from '#/api';
import apiPaths from '#/api/path';
class VerificationCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smsFlowNo: '',
      otp: '',
      btnOtpDisabled: true,
      firstOnPress: true,
    };
  }
  static propTypes = {
    httpData: PropTypes.shape({
      ActionMethod: PropTypes.string,
      PageLanguage: PropTypes.string,
      funcName: PropTypes.string,
    }),
  };
  static defaultProps = {
    httpData: {
      ActionMethod: 'sendOtp',
      PageLanguage: 'zh_CN',
      funcName: 'app.mb.core.resetTxnPwd',
    },
  };
  onPressOTPSend = async () => {
    //點擊發送或者重發
    if (this.state.firstOnPress) {
      const res = await HTTP.api({
        url: apiPaths.JSONURL,
        method: 'POST',
        data: this.props.httpData,
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
      url: apiPaths.JSONURL,
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

  submitVerifyCode = async () => {
    let {smsFlowNo, otp} = this.state;
    await HTTP.api({
      url: apiPaths.JSONURL,
      method: 'POST',
      data: {
        ActionMethod: 'checkOtp',
        smsFlowNo: smsFlowNo,
        otp: otp,
      },
    });
    this.props.submitVerifyCode({smsFlowNo, otp});
  };

  render() {
    const {btnOtpDisabled} = this.state;
    return (
      <>
        <List>
          <InputItem value={'853****4197'}>電話號碼</InputItem>
          <InputItem
            value={this.state.otp}
            onChange={(value) => {
              this.setState({
                otp: value,
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
        </List>
        <View style={styles.wrapper}>
          {/* <View style={styles.item}>
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
          </View> */}
          <Button
            onPress={() => {
              Keyboard.dismiss();
              this.submitVerifyCode();
            }}
            disabled={btnOtpDisabled}
            title="完成"
          />
        </View>
      </>
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
export default VerificationCode;
