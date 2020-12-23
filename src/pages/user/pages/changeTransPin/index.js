import React from 'react';
import BasePage from '../../../BasePage';
import {View, StyleSheet, Button, Keyboard, Text} from 'react-native';
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
      oldPin2: '',
      newPin2: '',
      newPin2Confirm: '',
      itemArr: [
        {
          name: '原密碼',
          placeholder: '請輸入密碼',
          field: 'oldPin2',
        },
        {
          name: '新密碼',
          placeholder: '請輸入新密碼',
          field: 'newPin2',
        },
        {
          name: '重複密碼',
          placeholder: '請重複新密碼',
          field: 'newPin2Confirm',
        },
      ],
    };
  }
  _onChange(val, item) {
    this.setState({
      [item.field]: val,
    });
  }
  onSubmit = async () => {
    let {oldPin2, newPin2, newPin2Confirm} = this.state;
    console.log(oldPin2, newPin2, newPin2Confirm);
    await HTTP.api({
      url: 'login.do',
      method: 'POST',
      data: {
        ActionMethod: 'updatePin2',
        oldPin2: oldPin2,
        newPin2: newPin2,
        newPin2Confirm: newPin2Confirm,
      },
    });
    // this.props.submitVerifyCode({smsFlowNo, otp});
  };
  renderContainer() {
    const {btnOtpDisabled, itemArr} = this.state;
    return (
      <>
        <List>
          {itemArr.map((item) => (
            <InputItem
              value={this.state[item.field]}
              onChange={(val) => this._onChange(val, item)}
              placeholder={item.placeholder}
              key={item.field}>
              {item.name}
            </InputItem>
          ))}
        </List>
        <View>
          <Text>6位數字組合</Text>
          <Button
            onPress={() => {
              this.onSubmit();
            }}
            disabled={btnOtpDisabled}
            title="完成"
          />
        </View>
      </>
    );
  }
}
export default changeTransPin;
