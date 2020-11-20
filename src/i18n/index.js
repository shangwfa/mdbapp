import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';
import store from '../redux';
import cn from './lang/zh-cn';
import en from './lang/en-us';

// 获取手机本地国际化信息
const locales = RNLocalize.getLocales();
const systemLanguage = locales[0]?.languageCode;
const {
  i18n: {userLanguageSetting},
} = store.getState();

if (userLanguageSetting) {
  I18n.locale = userLanguageSetting;
} else if (systemLanguage) {
  I18n.locale = systemLanguage;
} else {
  I18n.locale = 'cn';
}

store.subscribe(() => {
  const {
    i18n: {userLanguageSetting: newUserLanguageSetting},
  } = store.getState();
  console.log(newUserLanguageSetting);
  if (
    newUserLanguageSetting &&
    newUserLanguageSetting !== userLanguageSetting
  ) {
    I18n.locale = newUserLanguageSetting;
  }
});

I18n.fallbacks = true;

I18n.translations = {
  cn,
  en,
};

export default I18n;
