import Types from './actionType';

const initState = {
  ENV: 'UAT',
};

const onAction = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.G_CHANG_ENV:
      const {env} = payload;
      return {
        ...state,
        ENV: env,
      };
    default:
      return state;
  }
};

export default onAction;
