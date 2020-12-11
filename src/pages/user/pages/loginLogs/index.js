// 登录历史
import { ScrollView } from 'react-native'
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';
import React from 'react'
import BasePage from '../../../BasePage'

class LoginLogs extends BasePage {
  didMount(){
  }
  // 查看登录历史
  loadLoginLog = async () => {
    await HTTP.api({
      url: apiPaths.LOGINLOGURL,
      method: 'POST',
      data: {
        ActionMethod: 'loadingLog',
        userId: 'xxxx',
        cif: 'xxxx'
      }
    })
  }

  renderContainer(){
    return (
      <ScrollView></ScrollView>
    )
  }
}

export default LoginLogs