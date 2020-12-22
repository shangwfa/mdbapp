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
function Body({isOpen, custBaseInfoVoList, navigation}) {
  const [checked, setChecked] = useState(isOpen === 'Y');
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
