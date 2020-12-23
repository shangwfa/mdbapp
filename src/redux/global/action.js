import Types from './actionType';

export default {
  [Types.G_CHANG_ENV]: (env) => {
    return {
      type: Types.G_CHANG_ENV,
      payload: {
        env,
      },
    };
  },
  [Types.G_IS_LOADING]: (isLoading) => {
    return {
      type: Types.G_IS_LOADING,
      payload: {
        isLoading,
      },
    };
  },
  [Types.G_THEME]: (type) => {
    return {
      type: Types.G_THEME,
      payload: {
        type,
      },
    };
  },
};
