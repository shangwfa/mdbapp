import Types from './actionType';
export const userSetLanguage = (langType) => {
  return {
    type: Types.USER_SET_LANGUAGE,
    payload: {
      langType,
    },
  };
};
