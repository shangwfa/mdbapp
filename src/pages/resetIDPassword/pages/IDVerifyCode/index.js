/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-16 10:03:25
 * @Description: file content
 */
import React from 'react';
import BasePage from '#/pages/BasePage';
import VerifyCode from '#/components/business/VerifyCode';
class IDVerifyCode extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '找回登入ID及密码獲取驗證碼',
    });
    this.state = {
      httpData: {
        ActionMethod: 'forgetPassWordSendOtp',
        funcName: 'app.mb.action.ol.ForgetPassWordAction',
        langCode: 'C',
        mobileCode: this.params.mobileNumber,
        mobileNo: this.params.mobileNumber,
        userId: this.params.userId,
        cif: this.params.cif,
      },
    };
  }
  submitVerifyCode = ({smsFlowNo, otp, firstOnPress}) => {
    this.props.navigation.navigate('ResetIDPassword', {...this.params});
  };

  renderContainer() {
    return (
      <VerifyCode
        submitVerifyCode={this.submitVerifyCode}
        httpData={this.state.httpData}
      />
    );
  }
}
export default IDVerifyCode;
