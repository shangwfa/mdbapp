// 退出时间设置
import { ScrollView,Text } from 'react-native'
import HTTP from '#/api';
import apiPaths from '#/api/path';
import {Toast, List, InputItem} from '@ant-design/react-native';
import React from 'react'
import BasePage from '#/pages/BasePage'
import LimitItem from './LimitItem'

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
    const {itemArr} = this.state;
    return (
      <ScrollView>
       <Text>幣種:澳門幣 </Text>
        {itemArr.map((item) => (
        <LimitItem item={item}></LimitItem>
      ))}
      </ScrollView>
    )
  }
}

export default TransLimit