import I18nRedux from './i18n';
import GRedux from './global';

export default {
  ...I18nRedux.ActionType,
  ...GRedux.ActionType,
};
