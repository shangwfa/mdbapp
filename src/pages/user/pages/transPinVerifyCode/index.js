import React from 'react';
import BasePage from '../../../BasePage';
import VerifyCode from '../../../../components/business/VerifyCode';
class TransPinVerifyCode extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '获取重置交易密碼验证码',
    });
    this.state = {
      code: 1,
    };
  }
  submitVerifyCode = (smsFlowNo) => {
    this.props.navigation.navigate('ResetTransPin', smsFlowNo);
  };

  renderContainer() {
    return <VerifyCode submitVerifyCode={this.submitVerifyCode} />;
  }
}
export default TransPinVerifyCode;
