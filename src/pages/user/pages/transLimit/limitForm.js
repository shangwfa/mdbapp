// 退出时间设置
import { ScrollView,Text } from 'react-native'
import HTTP from '#/api';
import apiPaths from '#/api/path';
import { List, InputItem} from '@ant-design/react-native';
import React from 'react'
import BasePage from '#/pages/BasePage'
import LimitItem from './LimitItem'

class LimitForm extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '交易限額',
    });
    this.state= {
      itemArr:[
        {
          title:"兌換（本人）",
          value:"1,000,000.00"
        },
        {
          title:"單筆兌換限額",
          value:"1,000,000.00"
        },
        {
          title:"修改為",
          value:"1,000,000.00"
        },
        {
          title:"日累計兌換限額",
          value:"1,000,000.00"
        },
        {
          title:"修改為",
          value:"1,000,000.00"
        }
      ]
    }
  }
  _onChange(){}
  renderContainer() {
    const {itemArr} = this.state;
    return (
      <Text>123</Text>
      // <ScrollView>
      //  <Text>幣種:澳門幣 </Text>
      //   {itemArr.map((item) => (
      //   <LimitItem item={item}></LimitItem>
      // ))}
      // </ScrollView>
    //   <><List> {itemArr.map((item) => (
    //     <InputItem value={this.state[item.field]} onChange={(val) => this._onChange(val,item)} placeholder={item.placeholder} key={item.field}></InputItem>
    //  ))}</List></>
    )
  }
}

export default LimitForm