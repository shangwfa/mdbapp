import React from 'react';
import BasePage from '../../../BasePage';
import VerifyCode from '../../../../components/business/VerifyCode';
import SubmitPassword from './SubmitPassword';
class ResetTransPin extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '重置交易密碼',
    });
    this.state = {
      step: 1,
    };
  }
  setStep = (step) => {
    this.setState({step});
  };

  renderContainer() {
    const {step} = this.state;
    return step === 1 ? (
      <VerifyCode setStep={this.setStep} />
    ) : (
      <SubmitPassword />
    );
  }
}
export default ResetTransPin;
