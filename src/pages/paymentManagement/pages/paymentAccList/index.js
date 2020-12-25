import React from 'react';
import {View, ScrollView} from 'react-native';
import HTTP from '#/api';
import apiPaths from '../../paths/index';
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
      // paymentList: [
      //   {
      //     isOpen: 'Y',
      //     bankCardNo: '682000010236',
      //     acctType: 'CA',
      //     custBaseInfoVoList: [],
      //   },
      //   {
      //     isOpen: 'N',
      //     bankCardNo: '687000010400',
      //     acctType: 'CA',
      //     custBaseInfoVoList: [],
      //   },
      //   {
      //     isOpen: 'Y',
      //     bankCardNo: '886000010439',
      //     acctType: 'SA',
      //     custBaseInfoVoList: [
      //       {
      //         merchantCode: 'CNO2020090717340002',
      //         merchantName: '極易付',
      //       },
      //     ],
      //   },
      //   {
      //     isOpen: 'Y',
      //     bankCardNo: '880000010440',
      //     acctType: 'SA',
      //     custBaseInfoVoList: [],
      //   },
      // ],
    });
  };
  renderContainer() {
    const {paymentList} = this.state;
    const {navigation} = this.props;
    return (
      <ScrollView>
        {paymentList.map((accData, index) => (
          <AccountItem
            key={index}
            navigation={navigation}
            refreshPaymentList={this.getpaymentList}
            {...accData}
          />
        ))}
      </ScrollView>
    );
  }
}
export default Index;
