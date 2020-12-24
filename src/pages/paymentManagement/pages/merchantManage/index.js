import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {List, Button} from '@ant-design/react-native';
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
            itemType: this.renderList,
            props: {
              content: 'renderList',
              key: 'renderList',
            },
          },
          {
            itemType: this.renderBtn,
          },
        ],
      },
      merchantDes: [
        {
          label: this.params.acctType === 'CA' ? '往來賬戶：' : '儲蓄賬戶：',
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
          onPress: () => {},
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
    };
  }
  didMount() {
    this.getMerchantData();
  }
  getMerchantData = async () => {
    const res = await HTTP.api({
      url: apiPaths.PAYMENT,
      method: 'POST',
      params: {
        ActionMethod: 'merchantLimit',
        PageLanguage: 'zh_CN',
        merchantCode: this.params.merchantCode,
        bankCardNo: this.params.bankCardNo,
      },
    });
    const merchantDes = this.state.merchantDes.map((item) => ({
      ...item,
      extra: item.key
        ? `${res[item.key]} ${res[item.suffixKey] || ''}`
        : item.extra,
    }));
    this.setState({merchantDes});
  };
  renderList = () => {
    return (
      <List>
        {this.state.merchantDes.map((item) => (
          <Item {...item}>{item.label}</Item>
        ))}
      </List>
    );
  };
  renderBtn = () => {
    return (
      <>
        <WhiteSpace size="sm" />
        <Button type="primary">解约</Button>
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
