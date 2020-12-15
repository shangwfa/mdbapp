/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-10 15:24:06
 * @Description: file content
 */
import HTTP from '../../../../api';
import apiPaths from '../../paths';

export const SMS_FUNC_TYPE = {
  ChangePerAction: 'app.mb.action.srv.ChangePerAction',
  ChangeAddressAction:
    'app.mb.action.sys.RemittanceAdressAction.updateRemittanceAddress',
};

export default class UserProfileService {
  getUserProfile() {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: apiPaths.USER_PROFILE_URL,
        method: 'POST',
        data: {
          ActionMethod: 'listChPerInfo',
          PageLanguage: 'zh_CN',
        },
      }).then((res) => {
        resolve(res);
      });
    });
  }

  updateProfile(updateForm) {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: apiPaths.USER_PROFILE_URL,
        method: 'POST',
        data: {
          ...updateForm,
          ActionMethod: 'changePersonalInfoAck',
          PageLanguage: 'zh_CN',
        },
      }).then((res) => {
        resolve(res);
      });
    });
  }

  getAddress() {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: apiPaths.USER_ADDRESS_URL,
        method: 'POST',
        data: {
          ActionMethod: 'listRemittanceAddress',
          PageLanguage: 'zh_CN',
        },
      }).then((res) => {
        resolve(res);
      });
    });
  }

  updateAddress(updateForm) {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: apiPaths.USER_ADDRESS_URL,
        method: 'POST',
        data: {
          ...updateForm,
          ActionMethod: 'updateRemittanceAddress',
          PageLanguage: 'zh_CN',
          exceedResend: 'N',
          exceedResendFlag: 'N',
        },
      }).then((res) => {
        resolve(res);
      });
    });
  }

  sendSMS(funcName) {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: apiPaths.SEND_SMS_URL,
        method: 'POST',
        data: {
          ActionMethod: 'sendOtp',
          PageLanguage: 'zh_CN',
          funcName: funcName,
        },
      }).then((res) => {
        resolve(res);
      });
    });
  }
}
