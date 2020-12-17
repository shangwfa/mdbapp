/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-16 10:03:25
 * @Description: file content
 */
import React from 'react';
import BasePage from '../../../BasePage';
import VerifyCode from '../../../../components/business/VerifyCode';
class IDVerifyCode extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '找回登入ID及密码獲取驗證碼',
    });
    this.state = {};
  }
  submitVerifyCode = (smsFlowNo) => {
    this.props.navigation.navigate('ResetIDPassword', {...this.params});
  };

  renderContainer() {
    return <VerifyCode submitVerifyCode={this.submitVerifyCode} />;
  }
}
export default IDVerifyCode;
