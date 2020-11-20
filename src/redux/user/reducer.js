import Types from './actionType';

const initState = {
  userLanguageSetting: null, //用户手动设置的语言
};

const onAction = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.I18N_USER_SET_LANGUAGE:
      const {langType} = payload;
      return {
        ...state,
        userLanguageSetting: langType,
      };
    default:
      return state;
  }
};

export default onAction;
