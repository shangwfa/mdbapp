import React from 'react';
import {Button, View, Text} from 'react-native';
import BasePage from '../../../BasePage';
class ResetTransPinResult extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '重置交易密碼结果',
    });
  }

  render() {
    return (
      <View>
        <Text>修改交易密码成功</Text>
        <Button onPress={() => {}} title="完成" />
      </View>
    );
  }
}
export default ResetTransPinResult;
