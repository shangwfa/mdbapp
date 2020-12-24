import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
export const {width} = Dimensions.get('window');
import * as PbSizeStyle from './PbSizeStyle';
function Header({acctNum}) {
  return (
    <TouchableOpacity style={homeStyle.AccountCardItemTop} activeOpacity={1}>
      <View style={homeStyle.AccountCardItemTopLeft2}>
        <Text
          allowFontScaling={false}
          style={homeStyle.AccountCardItemTopLeft_Text1}>
          貸款合同
        </Text>
        <Text
          allowFontScaling={false}
          style={homeStyle.AccountCardItemTopLeft_Text1}>
          {acctNum}
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const homeStyle = StyleSheet.create({
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
});
export default Header;
