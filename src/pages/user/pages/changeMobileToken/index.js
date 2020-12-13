// 信任此设备 EToken
import { ScrollView, Switch, View, Text } from 'react-native'
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';
import React from 'react'
import BasePage from '../../../BasePage'

class ChangeMobileToken extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      isOpenToken: false
    }
  }
  didMount(){
  }
  // 解除Token绑定
  closeMobileTokenInfo = async () => {
    await HTTP.api({
      url: apiPaths.MOBILETOKENINFO,
      method: 'POST',
      data: {
        ActionMethod: 'unbind'
      }
    })
  }

  pickerSelectChanged = () => {
    const res =  !this.state.isOpenToken
    if(!res) {
      this.closeMobileTokenInfo()
    } else {
      // 跳轉查看相關協議
    }
  }

  renderContainer() {
    return (
      <ScrollView>
        <View>
          <Text>{'信任此設備'}</Text>
        </View>
        <Switch value={this.state.isOpenToken} onValueChange={() => this.pickerSelectChanged()}/>
      </ScrollView>
    )
  }
}


export default ChangeMobileToken