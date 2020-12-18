import LoginPage from '../pages/login/index';
import FaceIDLoginPage from '../pages/faceIDLogin/FaceIDLoginPage';
import FingerLoginPage from '../pages/fingerLogin/FingerLoginPage';
import UserProfile from '../pages/userProfile/UserProfilePage';
import FingerDemo from '../pages/fingerDemo/Application.container';

import AboutUSPage from '../pages/aboutUS';
import StatementsPage from '../pages/statements';
import TransPinVerifyCodePage from '../pages/transPinVerifyCode';
import ResetTransPinPage from '../pages/resetTransPin';
import ResetTransPinResultPage from '../pages/resetTransPinResult';
import ShootIDCardPage from '../pages/shootIDCard';
import IDVerifyCodePage from '../pages/IDVerifyCode';
import ResetIDPasswordPage from '../pages/resetIDPassword';
import SecuritySettingsPage from '../pages/securitySettings';
import FaceRecognitionPage from '../pages/faceRecognition';
import ChangePinPage from '../pages/changePin';
import ChangeTransPinPage from '../pages/changeTransPin';
export default [
  {
    name: 'Login',
    cname: '登录页面',
    component: LoginPage,
  },
  {
    name: 'userProfile',
    component: UserProfile,
  },
  {
    name: 'fingerLogin',
    component: FingerLoginPage,
  },
  {
    name: 'faceIDLogin',
    component: FaceIDLoginPage,
  },
  {
    name: 'fingerDemo',
    component: FingerDemo,
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
  {
    name: 'SecuritySettings',
    component: SecuritySettingsPage,
  },
  {
    name: 'FaceRecognition',
    component: FaceRecognitionPage,
  },
  {
    name: 'ChangePin',
    component: ChangePinPage,
  },
  {
    name: 'ChangeTransPin',
    component: ChangeTransPinPage,
  },
];
