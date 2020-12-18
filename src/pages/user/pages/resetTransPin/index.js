import React from 'react';
import {StyleSheet, Button, Keyboard, View, Text} from 'react-native';
import {Toast, List, InputItem} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';
class ResetTransPin extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '重置交易密碼',
    });
    this.state = {
      pin2: '',
      pin2Confirm: '',
    };
  }
  submit = async () => {
    const {smsFlowNo, otp} = this.props.route.params;
    const {pin2, pin2Confirm} = this.state;
    await HTTP.api({
      url: apiPaths.LOGIN,
      method: 'POST',
      data: {
        ActionMethod: 'setPin2',
        otp: otp,
        pin2: pin2,
        pin2Confirm: pin2Confirm,
        smsFlowNo: smsFlowNo,
      },
    });
    this.props.navigation.navigate('ResetTransPinResult');
  };
  validateInput() {
    const {pin2, pin2Confirm} = this.state;
    if (pin2 !== pin2Confirm) {
      Toast.info('密碼和確認密碼不一致');
      return;
    }
    if (pin2.length !== 6) {
      Toast.info('密碼為6位數字');
      return;
    }
    this.submit();
    // if (!validateRequired(form.pin2, form.pin2IsDisabled)) {
    //   JsonAjaxService.getErrMsgByLang('ERM2851');
    //   return false;
    // }
    // if (
    //   !validateNUMONLY(form.pin2, form.pin2IsDisabled) ||
    //   form.pin2.length !== 6
    // ) {
    //   JsonAjaxService.getErrMsgByLang('ERM2855');
    //   return false;
    // }
    // if (!validateRequired(form.pin2Confirm, form.pin2ConfirmIsDisabled)) {
    //   JsonAjaxService.getErrMsgByLang('ERM2854');
    //   return false;
    // }
    // if (
    //   !validateNUMONLY(form.pin2Confirm, form.pin2IsDisabled) ||
    //   form.pin2Confirm.length !== 6
    // ) {
    //   JsonAjaxService.getErrMsgByLang('ERM2855');
    //   return false;
    // }
    // if (form.pin2 !== form.pin2Confirm) {
    //   JsonAjaxService.getErrMsgByLang('ERM2852');
    //   return false;
    // }
    // return pin2 === pin2Confirm;
  }

  render() {
    return (
      <>
        <List>
          <InputItem
            type="password"
            value={this.state.pin2}
            onChange={(value) => {
              this.setState({
                pin2: value,
              });
            }}
            placeholder="请输入新密碼">
            新密碼
          </InputItem>
          <InputItem
            type="password"
            value={this.state.pin2Confirm}
            onChange={(value) => {
              this.setState({
                pin2Confirm: value,
              });
            }}
            placeholder="请重複密碼">
            重複密碼
          </InputItem>
        </List>
        <View style={styles.wrapper}>
          {/* <View style={styles.item}>
            <Text style={styles.left}>新密碼</Text>
            <TextInput
              onChangeText={(text) => this.setState({pin2: text})}
              style={styles.input}
              placeholder="請輸入密碼"
            />
          </View>
          <View style={styles.item}>
            <Text style={styles.left}>重複密碼</Text>
            <TextInput
              onChangeText={(text) => this.setState({pin2Confirm: text})}
              style={styles.input}
              placeholder="請輸入密碼"
            />
          </View> */}
          <Button
            onPress={() => {
              Keyboard.dismiss();
              this.validateInput();
            }}
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
export default ResetTransPin;
