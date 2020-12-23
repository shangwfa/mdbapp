import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import Header from './Header';
import Body from './Body';
export const {width} = Dimensions.get('window');
import * as PbSizeStyle from './PbSizeStyle';
function AccountItem({
  isOpen,
  bankCardNo,
  acctType,
  custBaseInfoVoList,
  navigation,
  refreshPaymentList,
}) {
  return (
    <View style={homeStyle.LoginMidListAccountItemPath}>
      <View style={homeStyle.UnLoginContentSpaceLine} />
      <View style={homeStyle.LoginMidListAccountCardItem}>
        <Header bankCardNo={bankCardNo} acctType={acctType} />
        <Body
          isOpen={isOpen}
          bankCardNo={bankCardNo}
          custBaseInfoVoList={custBaseInfoVoList}
          navigation={navigation}
          refreshPaymentList={refreshPaymentList}
        />
      </View>
    </View>
  );
}
const homeStyle = StyleSheet.create({
  LoginMidListAccountItemPath: {
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  },
  UnLoginContentSpaceLine: {
    width: width,
    height: PbSizeStyle.size5,
    backgroundColor: 'transparent',
  },
  LoginMidListAccountCardItem: {
    width: width * 0.9,
    borderTopWidth: 0,
    borderRadius: PbSizeStyle.size5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    alignItems: 'center',
    display: 'flex',
  },
});
export default AccountItem;
