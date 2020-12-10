// 信任此设备 EToken
import { ScrollView } from 'react-native'
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';
import React from 'react'
import BasePage from '../../../BasePage'

class ChangeMobileToken extends BasePage {
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

  renderContainer() {
    return (
      <ScrollView></ScrollView>
    )
  }
}


export default ChangeMobileToken