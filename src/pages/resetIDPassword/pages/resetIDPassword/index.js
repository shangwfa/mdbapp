import React from 'react';
import {View, StyleSheet, Button, Keyboard} from 'react-native';
import {Toast, List, InputItem} from '@ant-design/react-native';
import HTTP from '#/api';
import apiPaths from '../../paths/index';
import BasePage from '#/pages/BasePage';
class ResetIDPassword extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      pin2: '',
      pin2Confirm: '',
      log_id: this.params.log_id,
      userId: this.params.userId,
      oldUserId: this.params.userId,
      cif: this.params.cif,
    };
  }
  submit = async () => {
    await HTTP.api({
      url: apiPaths.FORGETPASSWORD,
      method: 'POST',
      data: {
        ActionMethod: 'changeLoginPassWord',
        cif: this.state.cif,
        loginId: this.state.userId, // 修改后的userId
        oldLoginId: this.state.oldUserId, // 原來的userId
        newPassword: encodeURIComponent(this.state.pin2),
        confirmPassword: encodeURIComponent(this.state.pin2Confirm),
        editLoginId:
          String(this.state.userId).replace(/\s*/g, '').toUpperCase() ===
          String(this.state.oldUserId).replace(/\s*/g, '').toUpperCase()
            ? '0'
            : '1',
        log_id: this.state.log_id,
      },
    });
  };
  validateInput() {
    const {pin2, pin2Confirm} = this.state;
    if (pin2 !== pin2Confirm) {
      Toast.info('密碼和確認密碼不一致');
      return;
    }
    this.submit();
    // this.props.navigation.navigate('ResetTransPinResult');
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
            value={this.state.oldUserId}
            onChange={(value) => {
              this.setState({
                oldUserId: value,
              });
            }}
            placeholder="请输入登入ID">
            登入ID
          </InputItem>
          <InputItem
            type="password"
            value={this.state.pin2}
            onChange={(value) => {
              this.setState({
                pin2: value,
              });
            }}
            placeholder="请输入登入密碼">
            登入密碼
          </InputItem>
          <InputItem
            type="password"
            value={this.state.pin2Confirm}
            onChange={(value) => {
              this.setState({
                pin2Confirm: value,
              });
            }}
            placeholder="请再输入一次登入密碼">
            再输入一次登入密碼
          </InputItem>
        </List>
        <View style={styles.wrapper}>
          {/* <View style={styles.item}>
            <Text style={styles.left}>登入ID</Text>
            <Text style={styles.right}>XUWENMING</Text>
          </View>
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
export default ResetIDPassword;
