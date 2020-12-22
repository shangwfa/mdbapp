import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {Switch} from '@ant-design/react-native';
export const {width} = Dimensions.get('window');
import * as PbSizeStyle from './PbSizeStyle';
function AccountItem({
  isOpen,
  bankCardNo,
  acctType,
  custBaseInfoVoList,
  navigation,
}) {
  const [checked, setChecked] = useState(isOpen === 'Y');
  function Header() {
    return (
      <TouchableOpacity style={homeStyle.AccountCardItemTop} activeOpacity={1}>
        <View style={homeStyle.AccountCardItemTopLeft2}>
          <Text
            allowFontScaling={false}
            style={homeStyle.AccountCardItemTopLeft_Text1}>
            {acctType === 'CA' ? '往來賬戶' : '儲蓄賬戶'}
            {/* title1:acctList[i].acctType=='CA'?language.currentAccount:language.savingAccount, */}
          </Text>
          <Text
            allowFontScaling={false}
            style={homeStyle.AccountCardItemTopLeft_Text1}>
            {bankCardNo}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
  function Body() {
    return (
      <View style={homeStyle.AccountCardItemList}>
        <TouchableOpacity
          style={[homeStyle.LoginMidListAccountItemPath]}
          onPress={() => {
            // navigation.navigate('LoanAccountDetail', {acctNum});
          }}
          activeOpacity={0.8}>
          <View style={homeStyle.AccountCardItem}>
            <View style={homeStyle.LoanListItem}>
              <Text
                allowFontScaling={false}
                style={homeStyle.AccountCardLoansRight_Text1}>
                快捷支付功能
              </Text>
              <View style={homeStyle.AccountCardItemTopRight}>
                <Switch
                  checked={checked}
                  onChange={() => {
                    setChecked(!checked);
                  }}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
  return (
    <View style={homeStyle.LoginMidListAccountItemPath}>
      <View style={homeStyle.UnLoginContentSpaceLine} />
      <View style={homeStyle.LoginMidListAccountCardItem}>
        {Header()}
        {Body()}
      </View>
    </View>
  );
}
const homeStyle = StyleSheet.create({
  HomePageItemListFather: {
    marginTop: -width * 0.1,
    marginBottom: PbSizeStyle.size20,
    justifyContent: 'flex-start',
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
  AccountCardItemTop: {
    flexDirection: 'row',
    alignItems: 'center',
    display: 'flex',
    backgroundColor: 'rgba(189,200,249,1)',
    borderTopLeftRadius: PbSizeStyle.size5,
    borderTopRightRadius: PbSizeStyle.size5,
    padding: PbSizeStyle.fontSizeM,
  },
  AccountCardItemTopLeft2: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    display: 'flex',
  },
  AccountCardItemTopLeft_Text1: {
    color: '#062775',
    fontSize: PbSizeStyle.fontSize24,
  },
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
  AccountCardItemRightImage: {
    width: PbSizeStyle.fontSizeXLL,
    height: PbSizeStyle.fontSizeXLL,
  },
  AccountCardItemTopRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    display: 'flex',
  },
});
export default AccountItem;
