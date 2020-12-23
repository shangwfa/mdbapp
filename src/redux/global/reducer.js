import Types from './actionType';
import theme from '../../theme';

const initState = {
  ENV: 'UAT',
  isLoading: false,
  theme: theme['light'],
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
    case Types.G_THEME:
      console.log('playload', payload);
      const {type: xx} = payload;

      return {
        ...state,
        theme: theme[xx],
      };
    default:
      return state;
  }
};

export default onAction;
