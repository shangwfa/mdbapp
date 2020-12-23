import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {Switch, Modal, Toast} from '@ant-design/react-native';
import HTTP from '#/api';
import apiPaths from '#/api/path';

export const {width} = Dimensions.get('window');
import * as PbSizeStyle from './PbSizeStyle';
function Body({
  isOpen,
  refreshPaymentList,
  bankCardNo,
  custBaseInfoVoList,
  navigation,
}) {
  const showModal = () => {
    const tips =
      isOpen === 'Y'
        ? `請確認是否關閉賬戶${bankCardNo}的快捷支付功能？關閉後，將同時解約該賬戶與所有本行合作商戶的快捷支付服務，您將無法通過此賬戶進行快捷支付。\n`
        : `請確認是否開通賬戶${bankCardNo}的快捷支付功能？開通後，您可使用該賬戶與本行合作商戶簽約快捷支付服務。\n`;
    const onPress = isOpen === 'Y' ? paymentClose : paymentOpen;
    Modal.alert('提示', tips, [
      {
        text: '取消',
      },
      {text: '確定', onPress: onPress},
    ]);
  };
  const paymentClose = async () => {
    const res = await HTTP.api({
      url: apiPaths.PAYMENT,
      method: 'POST',
      params: {
        ActionMethod: 'paymentClose',
        PageLanguage: 'zh_CN',
        bankCardNo: bankCardNo,
      },
    });
    if (res.params_encrypt_str) {
      refreshPaymentList();
    } else {
      Toast.info(res.ERR_DESC);
    }
  };
  const paymentOpen = () => {
    navigation.navigate('PaymentWebView', {bankCardNo: bankCardNo});
  };
  return (
    <View style={homeStyle.AccountCardItemList}>
      <TouchableOpacity
        style={[homeStyle.LoginMidListAccountItemPath]}
        activeOpacity={0.8}>
        <View style={homeStyle.AccountCardItem}>
          <View style={homeStyle.LoanListItem}>
            <Text
              allowFontScaling={false}
              style={homeStyle.AccountCardLoansRight_Text1}>
              快捷支付功能
            </Text>
            <View style={homeStyle.AccountCardItemTopRight}>
              <Switch checked={isOpen === 'Y'} onChange={showModal} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const homeStyle = StyleSheet.create({
  AccountCardItemList: {
    width: width * 0.9,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    display: 'flex',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: PbSizeStyle.size5,
    borderBottomRightRadius: PbSizeStyle.size5,
  },
  LoginMidListAccountItemPath: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  },
  AccountCardItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: PbSizeStyle.size5,
    borderBottomRightRadius: PbSizeStyle.size5,
    padding: PbSizeStyle.fontSizeM,
  },
  LoanListItem: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  AccountCardLoansRight_Text1: {
    color: '#666666',
    fontSize: PbSizeStyle.fontSizeX,
    textAlign: 'right',
  },
  AccountCardItemTopRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
});
export default Body;
