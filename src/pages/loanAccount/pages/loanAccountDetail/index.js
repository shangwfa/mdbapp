import React from 'react';
import {View} from 'react-native';
import {List, InputItem} from '@ant-design/react-native';
import HTTP from '#/api';
import apiPaths from '../../paths/index';
import BasePage from '#/pages/BasePage';
class LoanAccount extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '贷款账户详情',
    });
    this.state = {
      acctDetail: {},
      renderConfig: [
        {
          label: '贷款合同',
          key: 'acctNum',
        },
        {
          label: '贷款金额',
          key: 'initLoanAmt',
          prefix: 'ccy',
        },
        {
          label: '未还本金',
          key: 'outBal',
          prefix: 'ccy',
        },
        {
          label: '貸款日期',
          key: 'sDate',
        },
        {
          label: '貸款到期日',
          key: 'mDate',
        },
        {
          label: '年利率',
          key: 'interest',
          suffix: '%',
        },
        {
          label: '還款賬戶',
          key: 'acctNo',
          // value:formatInputAccount(renderData.acctNo,'modeOne'),
        },
        {
          label: '下一期還款日',
          key: 'nextPayDate',
        },
        {
          label: '下一期還款金額',
          key: 'nextPayAmt',
          prefix: 'ccy',
          // value:this.state.ccyName + ' ' + formatNumber(renderData.nextPayAmt,2,this.props.language.common.curLanguage, this.state.ccy),
        },
        {
          label: '逾期未付金額',
          key: 'dueAmt',
          prefix: 'ccy',
          // value:this.state.ccyName + ' ' + formatNumber(renderData.dueAmt,2,this.props.language.common.curLanguage, this.state.ccy),
        },
      ],
    };
  }
  async componentDidMount() {
    this.getAcctDetail();
  }
  getAcctDetail = async () => {
    const res = await HTTP.api({
      url: apiPaths.LOANACCENQ,
      method: 'POST',
      data: {
        ActionMethod: 'loanAccInfo',
        PageLanguage: 'zh_CN',
        acctNo: this.params.acctNum,
      },
    });
    this.setState({
      acctDetail: res,
    });
  };
  renderContainer() {
    const {acctDetail, renderConfig} = this.state;
    return (
      <View>
        <List>
          {renderConfig.map((item, index) => (
            <InputItem
              value={`${acctDetail[item.prefix] || ''}${acctDetail[item.key]}${
                item.suffix || ''
              }`}
              key={index}>
              {item.label}
            </InputItem>
          ))}
        </List>
      </View>
    );
  }
}
export default LoanAccount;
