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
};
