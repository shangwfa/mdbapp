// 信任此設備服務條款細則
import { ScrollView } from 'react-native'
import React from 'react'
import BasePage from '../../../BasePage'

class PaymentWebView extends BasePage {
  didMount = () => {
  }
  
  renderContainer = () => {
    return (
      <ScrollView></ScrollView>
    )
  }
}

export default PaymentWebView