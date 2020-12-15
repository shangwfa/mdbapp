import Types from './actionType';

const initState = {
  isLogin: false,
  isFirstLogin: false,
  lastUserName: '', //记住用户名
  userLoginInfo: {},
};

const onAction = (state = initState, action) => {
  switch (action.type) {
    case Types.USER_LOGIN:
      return {
        ...state,
        isLogin: action.isLogin,
        userLoginInfo: action.data,
      };
    case Types.USER_LOGOUT:
      return initState;
    case Types.LOGIN_REMEMBER_STATUS:
      return {
        ...state,
        lastUserName: action.userid,
      };
    case Types.SET_FIRST_LOGIN:
      return {
        ...state,
        isFirstLogin: action.isFirstLogin,
      };
    case Types.USER_LOGOUT:
      return initState;
    default:
      return state;
  }
};

export default onAction;
