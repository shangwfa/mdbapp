import axios from 'axios';
import store from '../redux';
import URL from '../constants/url';
import requestConfig from './request';
import responseConfig from './response';
import encrypt from './request/encrypt';
import decrypt from './response/decrypt';
import ActionTypes from '../redux/actionTypes';
import Actions from '../redux/actions';
const {
  G: {ENV},
} = store.getState();
const service = axios.create({
  baseURL: URL[ENV],
  timeout: 100000,
});

service.interceptors.request.use(
  async (config) => {
    console.log('HTTP请求:');
    console.log('HTTP请求地址:', config.baseURL + config.url);
    try {
      for (let f of Object.values(requestConfig)) {
        await f(config);
      }
      config.params && console.log('HTTP请求参数:', config.params);
      config.data && console.log('HTTP请求体:', config.data);
      await encrypt(config);
    } catch (e) {
      console.log('请求异常', e);
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  },
);

service.interceptors.response.use(
  async (response) => {
    console.log('response', response);
    let res = await decrypt(response.data);

    console.log('HTTP响应:');
    console.log('请求地址:', response.config.baseURL + response.config.url);
    console.log('响应内容:', res);
    Object.values(responseConfig).map((f) => f(res));
    return res;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const api = async (request) => {
  store.dispatch(Actions[ActionTypes.G_IS_LOADING](true));
  try {
    let result = await service.request({
      url: request.url,
      method: request.method,
      params: request.params,
      data: request.data,
    });
    store.dispatch(Actions[ActionTypes.G_IS_LOADING](false));
    return JSON.parse(result);
  } catch (error) {
    console.log('网络请求异常:', error);
    store.dispatch(Actions[ActionTypes.G_IS_LOADING](false));
    return error;
  }
};

const getPreData = (res, predata) => {
  let result = {};

  predata &&
    Object.keys(predata).forEach((key) => {
      result[key] = res[predata[key]];
    });
  return result;
};

/**
 * 示例：
 * [
  {
    name: 'login',
    method: 'POST',
    path: '/login',
    params: {userName: '', pwd: ''},
    data: {},
  },
  {
    name: 'userInfo',
    method: 'GET',
    path: '/userInfo',
    preParams: {userId: 'login.userId'},
    params: {},
    preData: {},
    data: {},
  },
];
 *
 */
const apis = async (requests) => {
  store.dispatch(Actions(ActionTypes.G_IS_LOADING)(true));
  const result = {};
  try {
    for (let request of requests) {
      result[request.name] = await service.request({
        method: request?.method,
        path: request.path,
        params: {...request.params, ...getPreData(request.preParams)},
        data: {...request.data, ...getPreData(request.preData)},
      });
    }
    store.dispatch(Actions(ActionTypes.G_IS_LOADING)(false));
    return JSON.parse(result);
  } catch (error) {
    console.log('网络请求异常:', error);
    store.dispatch(Actions(ActionTypes.G_IS_LOADING)(false));
  }
};

export default {api, apis};
