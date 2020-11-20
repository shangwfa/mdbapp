import AsyncStorage from '@react-native-async-storage/async-storage';
import STORAGEKEYS from './storageKeys';
const isString = (value) =>
  Object.prototype.toString.call(value) === '[object String]';
const isObject = (value) =>
  Object.prototype.toString.call(value) === '[object Object]';

const saveStorage = async (key, value) => {
  try {
    if (isString(value) || isObject) {
      let tmp = isString(value) ? value : JSON.stringify(value);
      console.log(`存储本地数据:${key}::${tmp}`);
      await AsyncStorage.setItem(key, tmp);
    } else {
      console.log('本地存储只能存储:String或{}');
    }
  } catch (e) {
    console.log(`本地存储store异常:${e}`);
  }
};

const getStorage = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      const result = isString(value) ? value : JSON.parse(value);
      console.log(`获取本地数据:${result}`);
      return result;
    }
  } catch (e) {
    console.log(`本地存储get异常:${e}`);
  }
};

export default {
  saveStorage,
  getStorage,
  STORAGEKEYS,
};
