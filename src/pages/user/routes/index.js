/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-17 14:40:39
 * @Description: file content
 */
import LoginPage from '../pages/login/LoginPage';
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
import IDCardInfoPage from '../pages/IDCardInfo';
import IDVerifyCodePage from '../pages/IDVerifyCode';
import ResetIDPasswordPage from '../pages/resetIDPassword';
import SecuritySettingsPage from '../pages/securitySettings';
import FaceRecognitionPage from '../pages/faceRecognition';
import ChangePinPage from '../pages/changePin';
import ChangeTransPinPage from '../pages/changeTransPin';
export default [
  {
    name: 'Login',
    cname: '登陆',
    component: LoginPage,
  },
  {
    name: 'userProfile',
    cname: '用户资料',
    component: UserProfile,
  },
  {
    name: 'fingerLogin',
    cname: '指纹登陆',
    component: FingerLoginPage,
  },
  {
    name: 'faceIDLogin',
    cname: 'faceID登陆',
    component: FaceIDLoginPage,
  },
  {
    name: 'fingerDemo',
    cname: '指纹识别测试',
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
    name: 'IDCardInfo',
    component: IDCardInfoPage,
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
    name:"ChangePin",
    cname:"修改登入密码",
    component: ChangePinPage,
  },
  {
    name: 'ChangeTransPin',
    cname:"修改交易密码",
    component: ChangeTransPinPage,
  },
];
