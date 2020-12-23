/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-09 15:27:11
 * @Description: file content
 */
import HTTP from '#/api';
import utils from '#/utils';
import DeviceInfo from 'react-native-device-info';
import apiPaths from '../../paths';
export default class LoginService {
  isFirstLogin(result) {
    return result.firstLogin === 'Y' || result.resetPwdLogin === 'Y';
  }

  loginWithPhone(loginFrom) {
    loginFrom['passwordType'] = 'phoneNum';
    loginFrom['loginMethod'] = '1';
    return this.login(loginFrom);
  }

  loginWithUsername(loginFrom) {
    loginFrom['passwordType'] = 'loginId';
    loginFrom['loginMethod'] = '1';
    return this.login(loginFrom);
  }

  login(loginFrom) {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: apiPaths.LOGIN,
        method: 'POST',
        data: {
          ActionMethod: 'login',
          pageLanguage: 'CN',
          username: 'NEW00005',
          password: 'Abcd1234',
          // username: 'testuser03',
          // password: '111111qq',
          Login: 'Login',
          browserOk: 'N',
          loginDeviceId: DeviceInfo.getUniqueId(),
          loginMethod: '1', //密码登录
          authKey: '',
          passwordType: 'loginId',
          mobileCode: '853',
          checkForm: JSON.stringify({Version: '1.0.2', Flag: 'Y'}),
        },
      }).then((res) => {
        console.log('HTTP：res: ', res);
        //记住密码
        if (loginFrom.rememberStatus) {
          utils.saveStorage(
            utils.STORAGEKEYS.REMEMBER_USERNAME,
            loginFrom.username,
          );
        }
        // 指纹登陆授权凭证;
        const PASSWORD_LOGIN = 1;
        if (PASSWORD_LOGIN === loginFrom.loginMethod) {
          let authKey = result.jsonData.authKey ? result.jsonData.authKey : '';
          utils.saveStorage(utils.STORAGEKEYS.BIOMETRICS_AUTH_KEY, authKey);
        }
        resolve(res);
      });
    });
  }

  logout() {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: apiPaths.LOGIN,
        method: 'POST',
        data: {
          ActionMethod: 'logout',
          pageLanguage: 'CN',
        },
      }).then((res) => {
        resolve();
      });
    });
  }
}
