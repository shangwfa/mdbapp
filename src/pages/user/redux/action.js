import types from './actionType';
import LoginService from '../pages/login/LoginService';

function LoginFactory(loginMethod, user) {
  switch (loginMethod) {
    case 'PASSWORD_LOGIN':
      break;
    case 'FINGERPRINT_LOGIN':
      break;
    default:
      break;
  }
}

function writeLoginLog() {
  return (dispatch) => {};
}

export const LoginAction = (loginFrom) => {
  return async (dispatch) => {
    let loginService = new LoginService();
    let result = await loginService.login(loginFrom);
    if (result.firstLogin === 'Y' || result.resetPwdLogin === 'Y') {
      dispatch(firstLogin(true));
    }
    dispatch(setIsLoggedIn(true));
    dispatch(writeLoginLog());
    // dispatch(rememberStatus(username));
  };
};

function setIsLoggedIn(isLogin) {
  return {type: types.USER_IS_LOGIN, isLogin: isLogin};
}

/*
 * 记住密码
 */
export const rememberStatus = (userId) => {
  return {
    type: types.LOGIN_REMEMBER_STATUS,
    userId: userId,
  };
};

/*
 * 首次登陆
 */
export const firstLogin = (isFirstLogin) => {
  return {
    type: types.SET_FIRST_LOGIN,
    isFirstLogin: isFirstLogin,
  };
};

/*
 * 退出
 */
export const LogoutAction = () => {
  return (dispatch) => {
    dispatch(setIsLoggedIn(false));
  };
};
