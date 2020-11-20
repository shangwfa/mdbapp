import qs from 'qs';
import {NativeModules} from 'react-native';
import constants from '../../constants';

const Aes = NativeModules.AesCrypto;
export default async (config) => {
  let data = qs.stringify({RestJson: 'Y', ...config.data});
  try {
    data =
      'params_decrypt_str=' +
      (await Aes.encrypt(data, constants.SECRET_KEY, constants.SECRET_IV));
  } catch (e) {
    console.log('加密异常', e);
  }
  config.data = encodeURI(data, 'UTF-8');
  console.log('data', data);
  return config;
};
