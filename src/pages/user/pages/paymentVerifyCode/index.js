import React from 'react';
import {connect} from 'react-redux';
import BasePage from '#/pages/BasePage';
import VerifyCode from '#/components/business/VerifyCode';
import apiPaths from '#/api/path';
class Index extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '快捷支付管理',
    });
    this.state = {
      smsFlowNo: '',
      // httpData: {
      //   ActionMethod: '“paymentOpen',
      //   PageLanguage: 'zh_CN',
      //   bankCardNo: 'this.params.bankCardNo',
      //   exceedResend: 'N',
      //   exceedResendFlag: 'N',
      // },
      httpData: {
        funcName: 'app.mb.action.payment.PaymentManageAction.open',
      },
    };
  }

  submitVerifyCode = ({smsFlowNo, otp, firstOnPress}) => {
    console.log('smsFlowNo,otp,firstOnPress', smsFlowNo, otp, firstOnPress);
    this.setState({smsFlowNo: smsFlowNo});
  };

  renderContainer() {
    const {httpData} = this.state;
    return (
      <VerifyCode
        httpData={httpData}
        httpUrl={apiPaths.PAYMENT}
        submitVerifyCode={this.submitVerifyCode}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  mobileNo: state.user.userLoginInfo.mobileNo,
});

export default connect(mapStateToProps)(Index);
