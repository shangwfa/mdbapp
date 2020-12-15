import {combineReducers} from 'redux';
import I18nRedux from './i18n';
import GRedux from './global';
import User from '../pages/user/redux';

export default combineReducers({
  G: GRedux.Reducer,
  i18n: I18nRedux.Reducer,
  user: User.Reducer,
});
