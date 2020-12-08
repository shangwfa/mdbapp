import {combineReducers} from 'redux';
import I18nRedux from './i18n';
import GRedux from './global';

export default combineReducers({G: GRedux.Reducer, i18n: I18nRedux.Reducer});
