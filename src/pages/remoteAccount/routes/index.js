import RemoteAccHomePage from '../pages/home';
import RemoteAccInputPhonePage from '../pages/inputPhone';
import RemoteAccVerifyCodePage from '../pages/verifyCode';
export default [
  {
    name: 'RemoteAccHomePage',
    cname: '远程开户-首页',
    component: RemoteAccHomePage,
  },
  {
    name: 'RemoteAccInputPhonePage',
    cname: '远程开户-输入手机号',
    component: RemoteAccInputPhonePage,
  },
  {
    name: 'RemoteAccVerifyCodePage',
    cname: '远程开户-验证码',
    component: RemoteAccVerifyCodePage,
  },
];
