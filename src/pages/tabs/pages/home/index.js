import * as React from 'react';
import {View, Text, StyleSheet, Button, DeviceEventEmitter} from 'react-native';
import {connect} from 'react-redux';
import BasePage from '../../../BasePage';
import utils from '../../../../utils';
import I18n from '../../../../i18n';
import Actions from '../../../../redux/actions';
import ActionTypes from '../../../../redux/actionTypes';
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';
import DeviceInfo from 'react-native-device-info';
import {WhiteSpace} from '@ant-design/react-native';
class HomePage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: 'Home',
      isHideLeft: true,
    });
  }

  toLogin = () => {
    DeviceEventEmitter.emit('LoginPage', {name: '小牛', age: 18});
    this.navigation.navigate('Login');
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
  toGetInfo = async () => {
    await HTTP.api({
      url: apiPaths.SETTINGINFO,
      method: 'POST',
      data: {
        ActionMethod: 'load',
        deviceId: DeviceInfo.getUniqueId(),
        loginId: 'TESTUSER01',
        status: '0',
        authKey: 'SCLFKDPXHF3QBQEI',
      },
    });
  };
  toRNCamera = () => {
    this.navigation.navigate('RNCamera');
  };
  toTheme = () => {
    this.navigation.navigate('ThemePage');
  };

  toSmartDeposit = () => {
    this.navigation.navigate('orders');
  };

  toProducts = () => {
    this.navigation.navigate('products');
  };
  toRender = () => {
    this.navigation.navigate('RenderPage');
  };
  toRemoteAcc = () => {
    this.navigation.navigate('RemoteAccHomePage');
  };
  renderContainer() {
    return (
      <View style={styles.container}>
        <Text>Home Page</Text>
        <Text>{I18n.t('signIn.title')}</Text>
        <Button style={styles.btn} title="登陆" onPress={this.toLogin} />
        <WhiteSpace size="sm" />
        <Button style={styles.btn} title="Storage" onPress={this.toStorage} />
        <WhiteSpace size="sm" />
        <Button style={styles.btn} title="切换语言" onPress={this.toSwitch} />
        <WhiteSpace size="sm" />
        <Button style={styles.btn} title="HTTP" onPress={this.toReq} />
        <WhiteSpace size="sm" />
        <Button
          style={styles.btn}
          title="SETTINGINFO"
          onPress={this.toGetInfo}
        />
        <WhiteSpace size="sm" />
        <Button style={styles.btn} title="RNCamera" onPress={this.toRNCamera} />
        <WhiteSpace size="sm" />
        <Button style={styles.btn} title="切换主题" onPress={this.toTheme} />
        <WhiteSpace size="sm" />
        <Button style={styles.btn} title="渲染器页面" onPress={this.toRender} />
        <Button
          style={styles.btn}
          title="已完成智能存款"
          onPress={this.toSmartDeposit}
        />
        <WhiteSpace size="sm" />
        <Button
          style={styles.btn}
          title="智能存款产品"
          onPress={this.toProducts}
        />
        <WhiteSpace size="sm" />
        <Button
          style={styles.btn}
          title="远程开户"
          onPress={this.toRemoteAcc}
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
  btn: {
    marginBottom: 10,
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
