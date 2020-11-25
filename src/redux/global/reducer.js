import Types from './actionType';

const initState = {
  ENV: 'UAT',
  isLoading: false,
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
    case Types.G_IS_LOADING:
      const {isLoading} = payload;
      return {
        ...state,
        isLoading: isLoading,
      };
    default:
      return state;
  }
};

export default onAction;
