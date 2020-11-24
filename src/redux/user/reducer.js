import Types from './actionType';

const initState = {
  isLogin: false,
};

const onAction = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.USER_IS_LOGIN:
      const {isLogin} = payload;
      return {
        ...state,
        isLogin: isLogin,
      };
    default:
      return state;
  }
};

export default onAction;
