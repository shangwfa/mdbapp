import React from 'react';
import BasePage from '../../../BasePage';
import {View,  Button, Keyboard,Text} from 'react-native';
import { List, InputItem} from '@ant-design/react-native';
import CountDown from '../../../../components/base/CountDown';
import apiPaths from '../../paths';
import HTTP from '../../../../api';
// import VerifyCode from './VerifyCode';
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
      itemArr:[
        {
          name:"原密碼",
          placeholder:"請輸入密碼",
          field:"oldPassword"
        },
        {
          name:"新密碼",
          placeholder:"請輸入新密碼",
          field:"newPassword"
        },
        {
          name:"重複密碼",
          placeholder:"請重複新密碼",
          field:"confirmPassword"
        }
      ]
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
          funcName: 'app.mb.action.srv.ChangePinAction',
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
      url: apiPaths.SEND_SMS_URL,
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
  onSubmit =  async () =>{
    let {oldPassword, newPassword,confirmPassword} = this.state;
    console.log(oldPassword,newPassword,confirmPassword);
    const res = await HTTP.api({
      url: apiPaths.CHANGE_PIN,
      method: 'POST',
      data: {
        ActionMethod: 'changePinConfirm',
        oldPassword:encodeURIComponent(oldPassword),
        newPassword:encodeURIComponent(newPassword)
      },
    });
    // await HTTP.api({
    //   url: apiPaths.CHANGE_PIN,
    //   method: 'POST',
    //   data: {
    //     ActionMethod: 'changePinAck',
    //     nPin:encodeURIComponent(res.nPin),
    //     oPin:encodeURIComponent(res.oPin),
    //     otp:this.state.otp.trim(),
    //     exceedResendFlag:res.exceedResendFlag,
    //     exceedResend:res.exceedResend,
    //     smsFlowNo:this.state.smsFlowNo
    //   },
    // });
    // this.props.submitVerifyCode({smsFlowNo, otp});
  }
  _onChange(val,item){
    console.log(val);
    console.log(item.field);
    this.setState({
      [item.field]: val,
    });
  }

  renderContainer() {
    const {itemArr} = this.state;
    return (
      <>
      <List>
      {itemArr.map((item) => (
         <InputItem value={this.state[item.field]} onChange={(val) => this._onChange(val,item)} placeholder={item.placeholder} key={item.field}>{item.name}</InputItem>
      ))}
          </List>
          <View>
            <Text>8-20位數字及英文組合，區分大小寫，不能輸入空格及符號</Text>
            {/* <VerifyCode submitVerifyCode={this.submitVerifyCode}
               verifyCodeParams={{}}/> */}
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
              this.onSubmit();
            }}
            title="完成"
          />
        </View>
          </>
      )
  }
}
export default ChangePin;
