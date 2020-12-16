import React from 'react';
import {Button, Keyboard, Text} from 'react-native';
import {List, InputItem} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
import HTTP from '../../../../api';
// import VerifyCode from '../../../../components/business/VerifyCode';
class IDVerifyCode extends BasePage {
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
    };
  }
  checkOpenByIdNo = async () => {
    this.props.navigation.navigate('ResetIDPassword');
    // const {idCard_number, localName, log_id} = this.state;
    // const res = await HTTP.api({
    //   url: 'forgetPassWord.do',
    //   method: 'POST',
    //   params: {
    //     ActionMethod: 'checkOpenByIdNo',
    //     PageLanguage: 'zh_CN',
    //     langCode: 'CN',
    //     idCard: idCard_number,
    //     idNum: idCard_number,
    //     localName: localName,
    //     log_id: log_id,
    //   },
    // });
    // console.log('forgetPassWord.do res', res); // {"cif": "", "idNum": "440902199008083694", "idNumType": "CD", "isValidCustomer": "N", "localName": "吴超亮", "userId": ""}
    // this.props.navigation.navigate('ResetIDPassword', {...res, ...this.state});
  };

  renderContainer() {
    const {idCard_number, idCard_type, localName, log_id} = this.state;
    return (
      <>
        <Text>人脸识别</Text>
        <Button
          onPress={() => {
            Keyboard.dismiss();
            this.checkOpenByIdNo();
          }}
          title="下一步"
        />
      </>
    );
  }
}
export default IDVerifyCode;
