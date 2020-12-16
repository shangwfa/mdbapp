import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/action';
import BasePage from '../../../BasePage';
import {List, WhiteSpace} from '@ant-design/react-native';
import LoginService from './LoginService';
class LoginPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      loginFrom: {
        username: '',
        password: '',
        phoneCode: '',
        loginMethod: '1',
        rememberStatus: false,
      },
    };

    this.loginService = new LoginService();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Login Page</Text>
        <Button
          title="手机号登陆"
          style={styles.buttons}
          onPress={() => {
            let res = this.loginService.loginWithPhone(this.state.loginFrom);
            this.props.onLoginSuccess(res);
          }}
        />
        <WhiteSpace size="sm" />
        <Button
          title="用户名登陆"
          style={styles.buttons}
          onPress={() => {
            let res = this.loginService.loginWithUsername(this.state.loginFrom);
            this.props.onLoginSuccess(res);
          }}
        />
        <WhiteSpace size="sm" />
        <Button
          title="退出登陆"
          style={styles.buttons}
          onPress={() => {
            this.props.doLogout();
          }}
        />
        <WhiteSpace size="sm" />
        <Button
          title="fingerDemo"
          style={styles.buttons}
          onPress={() => {
            this.navigation.navigate('fingerDemo');
          }}
        />

        <WhiteSpace size="sm" />
        <Button
          title="指纹登陆"
          style={styles.buttons}
          onPress={() => {
            this.navigation.navigate('fingerLogin');
          }}
        />
        <WhiteSpace size="sm" />
        <Button
          title="faceID登陆"
          style={styles.buttons}
          onPress={() => {
            this.navigation.navigate('faceIDLogin');
          }}
        />
        <WhiteSpace size="sm" />
        <Button
          title="用户信息"
          style={styles.buttons}
          onPress={() => {
            this.navigation.navigate('userProfile');
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttons: {
    marginTop: 10,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  onLoginSuccess: (res) => dispatch(actions.loginSuccess(res)),
  doLogout: () => dispatch(actions.LogoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
