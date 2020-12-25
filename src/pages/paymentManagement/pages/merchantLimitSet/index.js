import * as React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import {List, InputItem, Button, Toast} from '@ant-design/react-native';
import BasePage from '#/pages/BasePage';
import RenderStaticPage from '#/components/render/RenderStaticPage';
import VerifyCode from '#/components/business/VerifyCode';
import HTTP from '#/api';
import apiPaths from '../../paths/index';

const Item = List.Item;

class Index extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '限額管理',
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
            itemType: this.renderMerchantList,
            props: {
              content: 'renderMerchantList',
              key: 'renderMerchantList',
              merchantDes: [
                {
                  label:
                    this.params.acctType === 'CA' ? '往來賬戶：' : '儲蓄賬戶：',
                  extra: '',
                  key: 'bankAccNo',
                },
                {
                  label: '合作商户：',
                  extra: this.params.merchantName,
                },
                {
                  label: '单笔支付限额：',
                  key: 'singleLimit',
                  extra: '',
                  suffixKey: 'ccy',
                  type: 'number',
                },
                {
                  label: '日累计支付限额：',
                  key: 'dayLimit',
                  extra: '',
                  suffixKey: 'ccy',
                  type: 'number',
                },
              ],
            },
          },
          {
            itemType: VerifyCode,
            props: {
              httpData: {
                funcName: 'app.mb.action.payment.PaymentManageAction.limit',
              },
              showPhoneNum: false,
              submitVerifyCode: this.submitVerifyCode,
            },
          },
        ],
      },
      merchantData: {
        singleLimit: '',
        dayLimit: '',
      },
    };
  }
  didMount() {
    this.getMerchantData();
  }
  getMerchantData = async () => {
    const merchantData = await HTTP.api({
      url: apiPaths.PAYMENT,
      method: 'POST',
      params: {
        ActionMethod: 'merchantLimit',
        PageLanguage: 'zh_CN',
        merchantCode: this.params.merchantCode,
        bankCardNo: this.params.bankCardNo,
      },
    });
    this.setState({
      merchantData: {
        ...this.state.merchantData,
        ...merchantData,
      },
    });
  };
  submitVerifyCode = async ({smsFlowNo, otp, firstOnPress}) => {
    const {
      merchantData: {singleLimit, dayLimit},
    } = this.state;
    if (singleLimit > dayLimit) {
      Toast.info('单笔支付限额不可大于日累计支付限额');
    }
    const httpParams = {
      ActionMethod: 'merchantLimitSet',
      bankCardNo: this.params.bankCardNo,
      merchantCode: this.params.merchantCode,
      otp: otp,
      exceedResendFlag: firstOnPress ? 'N' : 'Y',
      exceedResend: firstOnPress ? 'N' : 'Y',
      smsFlowNo: smsFlowNo,
      singleLimit: singleLimit,
      dayLimit: dayLimit,
    };
    await HTTP.api({
      url: apiPaths.PAYMENT,
      method: 'POST',
      params: httpParams,
    });
    Toast.info('修改成功');
  };
  renderMerchantList = (props) => {
    const {merchantData} = this.state;
    const merchantDes = props.merchantDes.map((item) => ({
      ...item,
      value: merchantData[item.key],
      extra:
        merchantData[item.suffixKey] || merchantData[item.key] || item.extra,
    }));
    return (
      <List>
        {merchantDes.map((item, index) =>
          item.suffixKey === 'ccy' ? (
            <InputItem
              {...item}
              key={index}
              onChange={(value) => {
                this.setState({
                  merchantData: {
                    ...merchantData,
                    [item.key]: value,
                  },
                });
              }}>
              {item.label}
            </InputItem>
          ) : (
            <Item {...item} key={index}>
              {item.label}
            </Item>
          ),
        )}
      </List>
    );
  };
  renderContainer() {
    return <RenderStaticPage pageDes={this.state.pageDes} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default Index;
