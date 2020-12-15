import LoginPage from '../pages/login';
import AboutUSPage from '../pages/aboutUS';
import StatementsPage from '../pages/statements';
import TransPinVerifyCodePage from '../pages/transPinVerifyCode';
import ResetTransPinPage from '../pages/resetTransPin';
import ResetTransPinResultPage from '../pages/resetTransPinResult';
import ShootIDCardPage from '../pages/shootIDCard';
import IDVerifyCodePage from '../pages/IDVerifyCode';
import ResetIDPasswordPage from '../pages/resetIDPassword';
export default [
  {
    name: 'Login',
    component: LoginPage,
  },
  {
    name: 'AboutUS',
    component: AboutUSPage,
  },
  {
    name: 'Statements',
    component: StatementsPage,
  },
  {
    name: 'TransPinVerifyCode',
    component: TransPinVerifyCodePage,
  },
  {
    name: 'ResetTransPin',
    component: ResetTransPinPage,
  },
  {
    name: 'ResetTransPinResult',
    component: ResetTransPinResultPage,
  },
  {
    name: 'ShootIDCard',
    component: ShootIDCardPage,
  },
  {
    name: 'IDVerifyCode',
    component: IDVerifyCodePage,
  },
  {
    name: 'ResetIDPassword',
    component: ResetIDPasswordPage,
  },
];
