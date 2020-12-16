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
    // dispatch(rememberStatus(username));
  };
};

function setIsLoggedIn(isLogin, data) {
  return {type: types.USER_LOGIN, isLogin: isLogin, data: data};
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
