import TransPinVerifyCodePage from '../pages/transPinVerifyCode';
import ResetTransPinPage from '../pages/resetTransPin';
import ResetTransPinResultPage from '../pages/resetTransPinResult';
export default [
  {
    name: 'TransPinVerifyCode',
    cname: '获取重置交易密碼验证码',
    component: TransPinVerifyCodePage,
  },
  {
    name: 'ResetTransPin',
    cname: '重置交易密碼',
    component: ResetTransPinPage,
  },
  {
    name: 'ResetTransPinResult',
    cname: '重置交易密碼结果页',
    component: ResetTransPinResultPage,
  },
];
