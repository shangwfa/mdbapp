import React from 'react';
import {Button, Text} from 'react-native';
import BasePage from '../../../BasePage';
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';
class FaceRecognition extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '获取重置登入ID及密码验证码',
    });
    this.state = {
      idCard_number: this.params.idCard_number,
      idCard_type: this.params.idCard_type,
      localName: this.params.localName,
      log_id: this.params.log_id,
      imageFontBase64: this.params.imageFontBase64,
      cif: this.params.cif,
      isValidCustomer: this.params.isValidCustomer,
      userId: this.params.userId,
    };
  }
  checkCustomerFaceInfo = async () => {
    try {
      await HTTP.api({
        url: apiPaths.FORGETPASSWORD,
        method: 'POST',
        data: {
          ActionMethod: 'checkCustomerFaceInfo',
          PageLanguage: 'zh_CN',
          cif: this.state.cif,
          idNum: this.state.idCard_number,
          idNumType: this.state.idCard_type,
          imageBestBase64: this.state.imageFontBase64,
          imageFontBase64: this.state.imageFontBase64,
          langCode: 'CN',
          localName: this.state.localName,
          log_id: this.state.log_id,
          userId: this.state.userId,
        },
      });
      this.getMobileNumberByCif();
    } catch (error) {
      console.log('checkCustomerFaceInfo res失败', error);
    }
  };
  getMobileNumberByCif = async () => {
    try {
      const res = await HTTP.api({
        url: apiPaths.FORGETPASSWORD,
        method: 'POST',
        data: {
          ActionMethod: 'getMobileNumberByCif',
          PageLanguage: 'zh_CN',
          cif: this.state.cif,
          idNum: this.state.idCard_number,
          idNumType: this.state.idCard_type,
          langCode: 'CN',
          log_id: this.state.log_id,
          userId: this.state.userId,
        },
      });
      this.props.navigation.navigate('ResetIDPassword', {
        ...this.params,
        ...this.state,
        mobileNumber: res.mobileNumber,
      });
    } catch (error) {
      console.log('checkCustomerFaceInfo res失败', error);
    }
  };

  renderContainer() {
    return (
      <>
        <Text>人脸识别</Text>
        <Button onPress={this.checkCustomerFaceInfo} title="发起人脸识别请求" />
        <Button
          onPress={this.getMobileNumberByCif}
          title="人脸识别成功后发起的请求"
        />
        <Button
          onPress={() => {
            this.props.navigation.navigate('IDVerifyCode', {
              ...this.params,
              ...this.state,
              mobileNumber: '+8613560738475',
            });
          }}
          title="下一步"
        />
      </>
    );
  }
}
export default FaceRecognition;
