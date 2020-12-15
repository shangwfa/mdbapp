/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-10 16:36:05
 * @Description: 指纹登陆
 */
import React, {Component} from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';
import FingerLoginService from './FingerLoginService';

export default class FingerLoginPage extends Component {
  constructor(props) {
    super(props);
    this.fingerLoginService = new FingerLoginService();
  }
  componentDidMount() {
    this.fingerLoginService.isSupported();
  }
  render() {
    return (
      <View>
        <Text> textInComponent </Text>

        <Button
          title="指纹授权"
          onPress={() => {
            this.fingerLoginService.authenticate();
          }}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
