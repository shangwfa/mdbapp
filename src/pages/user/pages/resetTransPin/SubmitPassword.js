import React from 'react';
import {StyleSheet, TextInput, Button, Keyboard, View} from 'react-native';
import {Text, Toast} from '@ant-design/react-native';
import HTTP from '../../../../api';
class SubmitPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pin2: '',
      pin2Confirm: '',
    };
  }
  submit = async () => {
    await HTTP.api({
      url: 'setPin2',
      method: 'POST',
      data: {
        ActionMethod: 'sendOtp',
        pin2: '123456',
        pin2Confirm: '123456',
        smsFlowNo: '202012025451622826',
        seqNo: '7515',
      },
    });
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
      <View style={styles.wrapper}>
        <View style={styles.item}>
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
        </View>
        <Button
          onPress={() => {
            Keyboard.dismiss();
            this.validateInput();
          }}
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
export default SubmitPassword;
