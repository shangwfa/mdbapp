import Types from './actionType';

const initState = {
  userLanguageSetting: 'cn',
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
