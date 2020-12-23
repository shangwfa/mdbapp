// 退出时间设置
import { ScrollView } from 'react-native'
import HTTP from '#/api';
import apiPaths from '#/api/path';
import React from 'react'
import BasePage from '#/pages/BasePage'

class TransLimit extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '交易限額',
    });
    this.state= {
      itemArr:[
        {
          title:"兌換（本人）",
          single_transaction_exchange_limit:"1,000,000.00",
          daily_cumulative_exchange_limit:"1,000,000.00"
        },
        {
          title:"轉帳（本行他人）",
          single_transaction_limit:"1,000,000.00",
          daily_cumulative_limit:"1,000,000.00"
        },
        {
          title:"轉帳（本澳他行）",
          single_transaction_limit:"1,000,000.00",
          daily_cumulative_limit:"1,000,000.00"
        },
        {
          title:"轉帳（海外他行）",
          single_transaction_limit:"1,000,000.00",
          daily_cumulative_limit:"1,000,000.00"
        }
      ]
    }
  }
  renderContainer() {
    return (
      <ScrollView>
        
      </ScrollView>
    )
  }
}

export default TransLimit