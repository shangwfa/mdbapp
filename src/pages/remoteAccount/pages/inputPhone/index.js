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

class RemoteAccInputPhonePage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '远程开户',
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
              title: '您的手機號碼',
              protoTip: '同意並繼續進行',
              personalProto: '《個人服務協議》',
              toPersonalProto: this.toPersonalProto,
              and: '及',
              declProto: '《收集個人資料聲明》',
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
              btnTx: '同意並繼續',
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
      Toast.info('请输入手机号');
    }
    if (this.state.phone.length !== 11) {
      Toast.info('请输入正确的手机号');
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
