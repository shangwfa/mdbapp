import React, {Component} from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/action';
import BasePage from '../../../BasePage';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loginFrom: {
        username: '',
        password: '',
        phoneCode: '',
      },
    };
  }
  render() {
    const {doLoginWithPhone, doLoginWithUsername} = this.props;
    return (
      <View style={styles.container}>
        <Text>Login Page</Text>
        <Button
          title="手机号登陆"
          onPress={() => {
            doLoginWithPhone();
          }}
        />

        <Button
          title="用户名登陆"
          onPress={() => {
            doLoginWithUsername();
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
});

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => ({
  doLoginWithPhone: (loginFrom) => dispatch(actions.LoginAction(loginFrom)),
  doLoginWithUsername: (loginFrom) => dispatch(actions.LoginAction(loginFrom)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
