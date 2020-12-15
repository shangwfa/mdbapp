import Types from './actionType';
import LoginService from '../pages/login/LoginService';

export const userSetLanguage = (langType) => {
  return {
    type: Types.USER_SET_LANGUAGE,
    payload: {
      langType,
    },
  };
};

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
    if (result.firstLogin === 'Y' || resetPwdLogin === 'Y') {
      dispatch(firstLogin(true));
    }
    dispatch(setIsLoggedIn(true));
    dispatch(writeLoginLog());
    dispatch(rememberStatus(username));
  };
};

export function setIsLoggedIn(isLogin) {
  return {type: 'USER_LOGIN', isLogin: isLogin};
}

/*
 * 记住密码
 */
export const rememberStatus = (userId) => {
  return {
    type: 'rememberStatus',
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
    dispatch(setLogin(false));
  };
};
