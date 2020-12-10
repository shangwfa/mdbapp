/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-09 15:27:11
 * @Description: file content
 */
import HTTP from '../../../../api';
import DeviceInfo from 'react-native-device-info';
import apiPaths from '../../paths';

export default class LoginService {
  constructor() {}

  login(loginFrom) {
    return new Promise((resolve, reject) => {
      HTTP.api({
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
      }).then((res) => {
        resolve(res);
      });
    });
  }

  logout() {}
}
