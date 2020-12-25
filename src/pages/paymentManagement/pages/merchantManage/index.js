import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {List, Button, Toast} from '@ant-design/react-native';
import BasePage from '#/pages/BasePage';
import RenderStaticPage from '#/components/render/RenderStaticPage';
import {WhiteSpace} from '@ant-design/react-native';
import HTTP from '#/api';
import apiPaths from '../../paths/index';
const Item = List.Item;
class Index extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '商户管理',
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
                  label: '限额管理：',
                  arrow: 'horizontal',
                  onPress: () => {
                    this.props.navigation.navigate('MerchantLimitSet', {
                      ...this.params,
                    });
                  },
                },
                {
                  label: '单笔支付限额：',
                  key: 'singleLimit',
                  extra: '',
                  suffixKey: 'ccy',
                },
                {
                  label: '日累计支付限额：',
                  key: 'dayLimit',
                  extra: '',
                  suffixKey: 'ccy',
                },
              ],
            },
          },
          {
            itemType: this.renderBtn,
            props: {
              title: '解约',
              key: '解约',
              type: 'primary',
              onPress: this.merchantCancel,
            },
          },
        ],
      },
      merchantData: {},
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
    this.setState({merchantData});
  };
  merchantCancel = async () => {
    const res = await HTTP.api({
      url: apiPaths.PAYMENT,
      method: 'POST',
      params: {
        ActionMethod: 'merchantCancel',
        bankCardNo: this.params.bankCardNo,
        merchantCode: this.params.merchantCode,
      },
    });
    Toast.info(res.ERR_DESC);
  };
  renderMerchantList = (props) => {
    const {merchantData} = this.state;
    const merchantDes = props.merchantDes.map((item) => ({
      ...item,
      extra: item.key
        ? `${merchantData[item.key]} ${merchantData[item.suffixKey] || ''}`
        : item.extra,
    }));
    return (
      <List>
        {merchantDes.map((item, index) => (
          <Item key={index} {...item}>
            {item.label}
          </Item>
        ))}
      </List>
    );
  };
  renderBtn = (props) => {
    return (
      <>
        <WhiteSpace size="sm" />
        <Button {...props}>{props.title}</Button>
      </>
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
