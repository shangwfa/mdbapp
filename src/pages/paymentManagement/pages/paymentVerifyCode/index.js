import React from 'react';
import {Toast} from '@ant-design/react-native';
import {connect} from 'react-redux';
import BasePage from '#/pages/BasePage';
import VerifyCode from '#/components/business/VerifyCode';
import HTTP from '#/api';
import apiPaths from '../../paths/index';
class Index extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '快捷支付管理',
    });
  }

  submitVerifyCode = async ({smsFlowNo, otp, firstOnPress}) => {
    const res = await HTTP.api({
      url: apiPaths.PAYMENT,
      method: 'POST',
      data: {
        ActionMethod: 'paymentOpen',
        PageLanguage: 'zh_CN',
        bankCardNo: this.params.bankCardNo,
        exceedResend: firstOnPress ? 'N' : 'Y',
        exceedResendFlag: firstOnPress ? 'N' : 'Y',
        otp: otp,
        smsFlowNo: smsFlowNo,
      },
    });
    if (res.params_encrypt_str) {
      Toast.info('开通成功');
      this.props.navigation.navigate('PaymentAccList');
    } else {
      Toast.info(res.ERR_DESC);
    }
  };

  renderContainer() {
    return (
      <VerifyCode
        httpData={{
          funcName: 'app.mb.action.payment.PaymentManageAction.open',
        }}
        submitVerifyCode={this.submitVerifyCode}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  mobileNo: state.user.userLoginInfo.mobileNo,
});

export default connect(mapStateToProps)(Index);
