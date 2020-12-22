// 我的高息定存列表
import { ScrollView } from 'react-native'
import HTTP from '#/api';
import apiPaths from '../../paths';
import React from 'react'
import BasePage from '#/pages/BasePage'

class HiTdAcctList extends BasePage {
  didMount() {
    this.tdLoadWithNewCifCheck()
  }
  // 查詢我的高息定存列表
  tdLoadWithNewCifCheck = async () => {
    const res = await HTTP.api({
      url: apiPaths.hiTimeDepositUrl,
      method: 'POST',
      data: {
        ActionMethod: 'tdLoad1WithNewCifCheck',
        inquireFlag: 'Y'
      }
    })
  }

  queryGXTimeDepositDetail = async item => {
    const res = await HTTP.api({
      url: apiPaths.hiTimeDepositUrl,
      method: 'POST',
      data: {
        ActionMethod: 'tdDetail',
        selectCcy: item.ccy,
        acctNum: item.title1Value,
        showOther: 'N'
      }
    })
    // 成功之后跳转到 HiTdDetail 页
  }

  hiTdOpenLoad = async () => {
    const res = await HTTP.api({
      url: apiPaths.hiTimeDepositUrl,
      method: 'POST',
      data: {
        ActionMethod: 'tdOpenLoad'
      }
    })
    // 成功之后跳转到 ProductionList 页
  }

  renderContainer() {
    return (
      <ScrollView></ScrollView>
    )
  }
}

export default HiTdAcctList