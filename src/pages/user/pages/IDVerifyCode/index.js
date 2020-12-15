import React from 'react';
import BasePage from '../../../BasePage';
import VerifyCode from '../../../../components/business/VerifyCode';
class IDVerifyCode extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '获取重置登入ID及密码验证码',
    });
    this.state = {
      code: 1,
    };
  }
  submitVerifyCode = (code) => {
    console.log('code', code);
    this.props.navigation.navigate('ResetIDPassword');
  };

  renderContainer() {
    return <VerifyCode submitVerifyCode={this.submitVerifyCode} />;
  }
}
export default IDVerifyCode;
