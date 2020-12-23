import React from 'react';
import {View} from 'react-native';
import HTTP from '#/api';
import apiPaths from '#/api/path';
import BasePage from '#/pages/BasePage';
import AccountItem from './AccountItem';
class Index extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '快捷支付管理賬戶列表',
    });
    this.state = {
      paymentList: [],
    };
  }
  async componentDidMount() {
    this.getpaymentList();
  }
  getpaymentList = async () => {
    const {acctList = []} = await HTTP.api({
      url: apiPaths.PAYMENT,
      method: 'POST',
      data: {
        ActionMethod: 'paymentList',
        PageLanguage: 'zh_CN',
      },
    });
    this.setState({
      paymentList: acctList,
    });
  };
  renderContainer() {
    const {paymentList} = this.state;
    const {navigation} = this.props;
    return (
      <View>
        {paymentList.map((accData) => (
          <AccountItem
            navigation={navigation}
            refreshPaymentList={this.getpaymentList}
            {...accData}
          />
        ))}
      </View>
    );
  }
}
export default Index;
