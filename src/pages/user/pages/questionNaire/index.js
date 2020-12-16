// 风险问卷
import { ScrollView } from 'react-native'
import React from 'react'
import BasePage from '#/pages/BasePage'
import HTTP from '#/api';
import apiPaths from '#/api/path';
import { WebView } from 'react-native-webview'

class QuestionNaire extends BasePage {
  constructor(props) {
    super(props)
    this.state = {
      webviewUrl: ''
    }
  }

  didMount(){
    this.getToken4RiskQuestion()
  }

  // 获取拿问卷调查数据需要的token
  getToken4RiskQuestion = async () => {
    try {
      const res = await HTTP.api({
        url: apiPaths.JSONURL,
        method: 'POST',
        data: {
          ActionMethod: 'getToken4RiskQuestion'
        }
      })
      // 拿到token之后，拼接 webview 文件的 url
      this.setState({
        webviewUrl: `https://183.62.167.45:7080/H5/txn?token=${res.token}`
      })
    } catch(err) {
      console.log(err)
    }
  }

  // 提交问卷
  onMessageHandle = async () => {
    const res = await HTTP.api({
      url: apiPaths.TRANSFERINVESTMENT,
      method: 'POST',
      data: {
        ActionMethod: 'accountsLoad',
        SYS_BACK_MENU_ID: 'AccountsInBANK',
        accountType: 'CA',
        investTransferType: 'transferOut' // transferIn
      }
    })
  }

  renderContainer(){
    return (
      <ScrollView>
        <WebView source={this.state.webviewUrl} onMessage={this.onMessageHandle}></WebView>
      </ScrollView>
    )
  }
}

export default QuestionNaire