import React from 'react';
import {Button, Text} from 'react-native';
import BasePage from '../../../BasePage';
class ResetTransPin extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '拍攝身份證正面',
    });
  }
  setStep = () => {
    console.log('下一步');
    const {navigation} = this.props;
    navigation.navigate('RetrieveVerifyCodeAndPassword', {
      title: '找回登錄ID及密碼',
    });
  };

  renderContainer() {
    return (
      <>
        <Text>找回登錄ID及密碼</Text>
        <Button onPress={this.setStep} title="下一步" />
      </>
    );
  }
}
export default ResetTransPin;
