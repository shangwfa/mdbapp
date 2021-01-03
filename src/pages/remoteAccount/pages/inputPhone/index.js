import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Toast} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
import RenderStaticPage from '#/components/render/RenderStaticPage';
import TopTips from './components/TopTips';
import Phone from './components/Phone';
import SubmitBtn from './components/SubmitBtn';
import HTTP from '#/api';
import API from '../../api';
import lang from '#/i18n';

class RemoteAccInputPhonePage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: lang.t('remoteAccount.title'),
    });
    this.state = {
      phone: '',
      phonePrefix: '+86',
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
              title: lang.t('remoteAccount.yourPhoneNo'),
              protoTip: lang.t('remoteAccount.agreeAnd'),
              personalProto: lang.t('remoteAccount.personalProto'),
              toPersonalProto: this.toPersonalProto,
              and: lang.t('remoteAccount.and'),
              declProto: lang.t('remoteAccount.declProto'),
              todeclProto: this.todeclProto,
            },
          },
          {
            itemType: Phone,
            key: 'phone',
            props: {
              phonePrefix: '+86',
              onChange: (value) => this.onChange(value),
            },
          },
          {
            itemType: SubmitBtn,
            key: 'submit',
            props: {
              btnTx: lang.t('remoteAccount.agreeGoOn'),
              onPress: this.toSubmit,
            },
          },
        ],
      },
    };
  }
  onChange = (value) => {
    this.setState({phone: value});
  };
  toSubmit = async () => {
    if (this.state.phone === '') {
      Toast.info(lang.t('remoteAccount.inputPhoneTip'));
    }
    if (this.state.phone.length !== 11) {
      Toast.info(lang.t('remoteAccount.inputCorrectPhoneTip'));
    }
    // await HTTP.api({
    //   url: API.REMOTE_ACC_GET_PHONE_CODE,
    //   method: 'POST',
    //   data: {
    //     ActionMethod: 'registerSendOtp',
    //     funcName: 'app.mb.action.enq.JsonAction',
    //     langCode: 'E',
    //     mobileCode: this.state.phonePrefix,
    //     mobileNo: this.state.phone,
    //   },
    // });
    this.navigation.navigate('RemoteAccVerifyCodePage', {
      phone: this.state.phone,
      phonePrefix: this.state.phonePrefix,
    });
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

export default RemoteAccInputPhonePage;
