import {NativeModules} from 'react-native';
import constants from '../../constants';

const Aes = NativeModules.AesCrypto;
export default async (res) => {
  try {
    return await Aes.decrypt(
      res.params_encrypt_str,
      constants.SECRET_KEY,
      constants.SECRET_IV,
    );
  } catch (e) {
    console.log('解密异常', e);
  }
};
