import React from 'react';
import {Button, Keyboard, Text} from 'react-native';
import {List, InputItem} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
import HTTP from '../../../../api';
import imageBestBase64 from './imageBestBase64';
// import VerifyCode from '../../../../components/business/VerifyCode';
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
      userId: this.params.userId,
      cif: this.params.cif,
    };
  }
  checkCustomerFaceInfo = async () => {
    console.log('发起人脸识别请求');
    const {idCard_number, idCard_type, localName, log_id, userId} = this.state;
    try {
      const res = await HTTP.api({
        url: 'forgetPassWord.do',
        method: 'POST',
        params: {
          ActionMethod: 'checkCustomerFaceInfo',
          PageLanguage: 'zh_CN',
          cif: '',
          idNum: idCard_number,
          idNumType: idCard_type,
          imageBestBase64: imageBestBase64,
          imageFontBase64: imageBestBase64,
          langCode: 'CN',
          localName: localName,
          log_id: log_id,
          userId: userId,
        },
      });
      console.log('checkCustomerFaceInfo res成功', res);
      this.getMobileNumberByCif();
    } catch (error) {
      console.log('checkCustomerFaceInfo res失败', error);
    }
  };
  getMobileNumberByCif = async () => {
    console.log('人脸识别成功后发起的请求');
    const {idCard_number, idCard_type, cif, log_id, userId} = this.state;
    try {
      const res = await HTTP.api({
        url: 'forgetPassWord.do',
        method: 'POST',
        params: {
          ActionMethod: 'getMobileNumberByCif',
          PageLanguage: 'zh_CN',
          cif: cif,
          idNum: idCard_number,
          idNumType: idCard_type,
          langCode: 'CN',
          log_id: log_id,
          userId: userId,
        },
      });
      console.log('checkCustomerFaceInfo res成功', res);
      // this.props.navigation.navigate('ResetIDPassword', {...res, ...this.state});
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
            this.props.navigation.navigate('ResetIDPassword', {
              ...this.state,
            });
          }}
          title="下一步"
        />
      </>
    );
  }
}
export default FaceRecognition;
