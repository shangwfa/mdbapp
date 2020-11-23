import * as React from 'react';
import {View, Text, StyleSheet, Button, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import BasePage from '../../BasePage';
import {routePaths} from '../../../router/routes';
import utils from '../../../utils';
import I18n from '../../../i18n';
import Actions from '../../../redux/actions';
import ActionTypes from '../../../redux/actionTypes';
import HTTP from '../../../api';
import apiPaths from '../../../api/path';
import DeviceInfo from 'react-native-device-info';

class HomePage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: 'Home',
    });
  }

  toLogin = () => {
    DeviceEventEmitter.emit(routePaths.Login, {name: '小牛', age: 18});
    this.navigation.navigate(routePaths.Login);
  };
  toStorage = () => {
    console.log(utils.STORAGEKEYS.TOKEN);
    utils.saveStorage(utils.STORAGEKEYS.TOKEN, 'xxxx');
    utils.getStorage(utils.STORAGEKEYS.TOKEN);
  };
  toSwitch = () => {
    console.log('toSwitch');
    this.props.setLanguage();
    this.forceUpdate();
  };
  toReq = async () => {
    await HTTP.api({
      url: apiPaths.LOGIN,
      method: 'POST',
      data: {
        ActionMethod: 'login',
        pageLanguage: 'CN',
        username: 'TESTUSER01',
        password: '111111qq',
        Login: 'Login',
        browserOk: 'N',
        loginDeviceId: DeviceInfo.getUniqueId(),
        loginMethod: '1', //密码登录
        authKey: '',
        passwordType: 'loginId',
        mobileCode: '853',
        checkForm: JSON.stringify({Version: '1.0.2', Flag: 'Y'}),
      },
    });
  };

  renderContainer() {
    return (
      <View style={styles.container}>
        <Text>Home Page</Text>
        <Text>{I18n.t('signIn.title')}</Text>
        <Button title="跳转" onPress={this.toLogin} />
        <Button title="Storage" onPress={this.toStorage} />
        <Button title="切换语言" onPress={this.toSwitch} />
        <Button title="HTTP" onPress={this.toReq} />
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
const mapDispatchToProps = (dispatch) => {
  return {
    setLanguage: () =>
      dispatch(Actions[ActionTypes.I18N_USER_SET_LANGUAGE]('cn')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
