import Types from './actionType';

export default {
  [Types.I18N_USER_SET_LANGUAGE]: (langType) => {
    return {
      type: Types.I18N_USER_SET_LANGUAGE,
      payload: {
        langType,
      },
    };
  },
};
