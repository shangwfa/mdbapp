import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import {View, Text} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
import CountDown from './CountDown';
class AboutUS extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '重置交易密碼',
    });
    this.state = {
      viewDepth: 1,
      showInput: false,
    };
  }
  renderContainer() {
    return (
      <View style={styles.wrapper}>
        <View style={styles.item}>
          <Text style={styles.left}>電話號碼</Text>
          <Text style={styles.right}>853****4197</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.left}>短訊驗證碼</Text>
          <TextInput style={styles.input} placeholder="請輸入" />
          <CountDown
            enable={true}
            timerCount={60}
            onClick={() => {
              console.log(111);
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    height: 150,
    backgroundColor: '#fff',
  },
  item: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#000',
    borderBottomWidth: 1,
  },
  left: {
    width: 100,
  },
  btn: {
    flex: 1,
    textAlign: 'right',
    color: '#edc31e',
  },
  input: {
    flex: 1,
  },
});
export default AboutUS;
