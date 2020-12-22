import React from 'react';
import {View} from 'react-native';
import HTTP from '#/api';
import apiPaths from '#/api/path';
import BasePage from '#/pages/BasePage';
import AccountItem from './AccountItem';
class LoanAccount extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '贷款账户',
    });
    this.state = {
      acctList: [],
    };
  }
  async componentDidMount() {
    this.getAcctList();
  }
  getAcctList = async () => {
    const {LA_AcctList = []} = await HTTP.api({
      url: apiPaths.LOANACCENQ,
      method: 'POST',
      data: {
        ActionMethod: 'loanAccLoad',
        PageLanguage: 'zh_CN',
      },
    });
    this.setState({
      acctList: LA_AcctList,
    });
  };
  renderContainer() {
    const {acctList} = this.state;
    return (
      <View>
        {acctList.map((accData) => (
          <AccountItem
            acctNum={accData.acctNum}
            bal={accData.bal}
            ccyName={accData.ccyName}
          />
        ))}
      </View>
    );
  }
}
export default LoanAccount;
