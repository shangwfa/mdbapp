import {combineReducers} from 'redux';
import i18n from './i18n/reducer';
import G from './global/reducer';

export default combineReducers({G, i18n});
