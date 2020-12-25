import React from 'react';
import {StyleSheet, Keyboard} from 'react-native';
import {View, List, InputItem, Button, Toast} from '@ant-design/react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import CountDown from '#/components/base/CountDown';
import HTTP from '#/api';
import apiPaths from '#/api/path';
class VerificationCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      smsFlowNo: '',
      otp: '',
      firstOnPress: true,
    };
  }
  static propTypes = {
    httpUrl: PropTypes.string,
    httpData: PropTypes.shape({
      ActionMethod: PropTypes.string,
      PageLanguage: PropTypes.string,
      funcName: PropTypes.string,
    }),
    needCheckOtp: PropTypes.bool, //是否需要校驗短信驗證碼
    showPhoneNum: PropTypes.bool,
  };
  static defaultProps = {
    httpData: {
      funcName: 'app.mb.core.resetTxnPwd',
    },
    httpUrl: apiPaths.JSONURL,
    needCheckOtp: false,
    showPhoneNum: true,
  };
  onPressOTPSend = async () => {
    //點擊發送或者重發
    if (this.state.firstOnPress) {
      const res = await HTTP.api({
        url: this.props.httpUrl,
        method: 'POST',
        params: {
          ActionMethod: 'sendOtp',
          PageLanguage: 'zh_CN',
          ...this.props.httpData,
        },
      });
      if (res.ERR_DESC) {
        return Toast.info(res.ERR_DESC);
      }
      this.setState({
        smsFlowNo: res.smsFlowNo,
        firstOnPress: false,
      });
    } else {
      this.resendOtp();
    }
  };
  resendOtp = async () => {
    const {smsFlowNo} = this.state;
    const res = await HTTP.api({
      url: apiPaths.JSONURL,
      method: 'POST',
      data: {
        ActionMethod: 'resendOtp',
        smsFlowNo: smsFlowNo,
      },
    });
    if (res.ERR_DESC) {
      return Toast.info(res.ERR_DESC);
    }
  };

  submitVerifyCode = async () => {
    let {smsFlowNo, otp, firstOnPress} = this.state;
    const {needCheckOtp} = this.props;
    if (needCheckOtp) {
      await HTTP.api({
        url: apiPaths.JSONURL,
        method: 'POST',
        data: {
          ActionMethod: 'checkOtp',
          smsFlowNo: smsFlowNo,
          otp: otp,
        },
      });
    }
    this.props.submitVerifyCode({
      smsFlowNo,
      otp,
      firstOnPress,
    });
  };

  render() {
    const {firstOnPress, otp} = this.state;
    const {mobileNo, showPhoneNum} = this.props;
    return (
      <>
        <List>
          {showPhoneNum ? (
            <InputItem value={mobileNo}>電話號碼</InputItem>
          ) : null}
          <InputItem
            value={otp}
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
          <Button
            onPress={() => {
              Keyboard.dismiss();
              this.submitVerifyCode();
            }}
            disabled={firstOnPress || !otp}
            type="primary">
            完成
          </Button>
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
});

const mapStateToProps = (state) => ({
  mobileNo: state.user.userLoginInfo.mobileNo,
});

export default connect(mapStateToProps)(VerificationCode);
