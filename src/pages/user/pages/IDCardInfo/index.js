import React from 'react';
import {Button, Keyboard} from 'react-native';
import {List, InputItem} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
import HTTP from '../../../../api';
// import VerifyCode from '../../../../components/business/VerifyCode';
class IDCardInfo extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '提交身份證信息',
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
    const {idCard_number, localName, log_id} = this.state;
    const res = await HTTP.api({
      url: 'forgetPassWord.do',
      method: 'POST',
      params: {
        ActionMethod: 'checkOpenByIdNo',
        PageLanguage: 'zh_CN',
        langCode: 'CN',
        idCard: idCard_number,
        idNum: idCard_number,
        localName: localName,
        log_id: log_id,
      },
    });
    this.props.navigation.navigate('FaceRecognition', {...res, ...this.state});
  };

  renderContainer() {
    const {idCard_number, idCard_type, localName, log_id} = this.state;
    return (
      <>
        <List>
          <InputItem
            value={localName}
            onChange={(value) => {
              this.setState({
                localName: value,
              });
            }}>
            localName
          </InputItem>
          <InputItem value={log_id}>log_id</InputItem>
          <InputItem
            value={idCard_number}
            onChange={(value) => {
              this.setState({
                idCard_number: value,
              });
            }}>
            idCard_number
          </InputItem>
          <InputItem
            value={idCard_type}
            onChange={(value) => {
              this.setState({
                idCard_type: value,
              });
            }}>
            idCard_type
          </InputItem>
        </List>
        <Button
          onPress={() => {
            Keyboard.dismiss();
            this.checkOpenByIdNo();
          }}
          title="下一步"
        />
        {/* <VerifyCode submitVerifyCode={this.submitVerifyCode} /> */}
      </>
    );
  }
}
export default IDCardInfo;
