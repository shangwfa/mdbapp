import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import BasePage from '../../../BasePage';
import RenderStaticPage from '#/components/render/RenderStaticPage';
import TopTips from './components/TopTips';
import VerifyCodeInput from './components/VerifyCodeInput';
import HTTP from '#/api';
import API from '../../api';
import lang from '#/i18n';
class RemoteAccVerifyCodePage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: lang.t('remoteAccount.title'),
    });
    this.state = {
      pageDes: {
        container: ScrollView,
        props: {
          showsVerticalScrollIndicator: false,
          style: styles.container,
        },
        children: [
          {
            itemType: TopTips,
            key: 'toptips',
            props: {
              title: lang.t('remoteAccount.smsCode'),
              subTitle: `${lang.t('remoteAccount.codeSended')}${
                this.params.phonePrefix
              } ${this.params.phone}`,
            },
          },
          {
            itemType: VerifyCodeInput,
            key: 'verifyCode',
            props: {
              toVerifyCode: this.toVerifyCode,
            },
          },
        ],
      },
    };
  }
  toVerifyCode = async (code) => {
    console.log(code);
    await HTTP.api({
      url: API.REMOTE_ACC_VERIFY_CODE,
      method: 'POST',
      data: {
        ActionMethod: 'checkMobileNo',
        langCode: 'E',
        mobileCode: this.params.phonePrefix.slice(1),
        mobileNo: this.params.phone,
        otp: code,
        smsFlowNo: '202011253803038604', //这个是什么
        exceedResend: 'N',
        mobileCode_first: this.params.phonePrefix.slice(1),
        mobileNo_first: this.params.phone,
        PageLanguage: 'zh_CN',
      },
    });
    // TODO 跳转新页面
  };

  renderContainer() {
    return <RenderStaticPage pageDes={this.state.pageDes} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
});

export default RemoteAccVerifyCodePage;
