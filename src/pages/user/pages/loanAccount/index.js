import React from 'react';
import {
  Button,
  View,
  NativeModules,
  Platform,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native';
import {Toast} from '@ant-design/react-native';
import HTTP from '#/api';
import apiPaths from '#/api/path';
export const {width} = Dimensions.get('window');
import BasePage from '#/pages/BasePage';
class LoanAccount extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '贷款账户',
    });
    this.state = {
      selectPathFront: null,
      imageFontBase64: null,
    };
  }
  renderContainer() {
    return (
      <View style={styles.wrapper}>
        <Text>Text----贷款账户</Text>
        <Button onPress={this.onConfirmNextPage} title="下一步" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  ETOLIDCardImageBackground: {
    width: width * 0.78,
    height: width * 0.52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ETOLIDCardCircleBox: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(151,151,151,0.5)',
  },
  ETOLIDCardFrontImage: {
    width: width * 0.09,
    height: width * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default LoanAccount;
