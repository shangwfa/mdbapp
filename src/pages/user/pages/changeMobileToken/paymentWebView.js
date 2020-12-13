// 信任此設備服務條款細則
import { ScrollView, View, TouchableOpacity, Image, Text } from 'react-native'
import React from 'react'
import BasePage from '../../../BasePage'

class PaymentWebView extends BasePage {
  constructor(prop) {
    super(prop)
    this.state = {
      isChecked: false
    }
  }
  didMount = () => {
  }

  getRememberPwdStatusImgUrl = (isChecked, userTheme) => {

  }

  submitHandle = isChecked => {
    if(isChecked) {
      
    }
  }
  
  renderContainer = () => {
    return (
      <ScrollView>
        {/*協議内容 */}
        <View></View>
        {/* 打勾 */}
        <TouchableOpacity>
          <View>
            <Image source={this.getRememberPwdStatusImgUrl(this.state.isChecked, 'userTheme')} />
            <Text>{'我已經閲讀所有服務條款，同意並且遵循所有內容'}</Text>
          </View>
        </TouchableOpacity>
        {/* 同意并继续进行 */}
        <View>
          <TouchableOpacity onPress={() => this.submitHandle(this.state.isChecked)}>
            <Text>{'同意並繼續進行'}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    )
  }
}

export default PaymentWebView