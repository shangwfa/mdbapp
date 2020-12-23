/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-22 14:08:44
 * @Description: file content
 */
import types from './actionType';

function writeLoginLog() {
  return (dispatch) => {};
}

export const loginSuccess = (result) => {
  return async (dispatch) => {
    if (result.firstLogin === 'Y' || result.resetPwdLogin === 'Y') {
      dispatch(firstLogin(true));
    }
    dispatch(setIsLoggedIn(true, result));
    dispatch(writeLoginLog());
  };
};

function setIsLoggedIn(isLogin, data) {
  return {type: types.USER_LOGIN, isLogin: isLogin, data: data};
}

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
