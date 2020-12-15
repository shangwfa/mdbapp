import LoginPage from '../pages/login';
import FaceIDLoginPage from '../pages/faceIDLogin/FaceIDLoginPage';
import FingerLoginPage from '../pages/fingerLogin/FingerLoginPage';
import UserProfile from '../pages/userProfile/UserProfilePage';
import AboutUSRoutes from '../pages/aboutUS/routes';
import ResetTransPinRoutes from '../pages/resetTransPin/routes';
import RetrieveIDPassword from '../pages/retrieveIDPassword/routes';
import FingerDemo from '../pages/fingerDemo/Application.container';

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
  ...AboutUSRoutes,
  ...ResetTransPinRoutes,
  ...RetrieveIDPassword,
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
