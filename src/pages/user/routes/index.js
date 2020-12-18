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
    cname: '关于我们',
    component: AboutUSPage,
  },
  {
    name: 'Statements',
    cname: '声明与条款',
    component: StatementsPage,
  },
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
  {
    name: 'ShootIDCard',
    cname: '找回登录ID及密码-拍摄身份证正面',
    component: ShootIDCardPage,
  },
  {
    name: 'IDCardInfo',
    cname: '找回登录ID及密码-提交身份证信息',
    component: IDCardInfoPage,
  },
  {
    name: 'IDVerifyCode',
    cname: '找回登录ID及密码-获取验证码',
    component: IDVerifyCodePage,
  },
  {
    name: 'ResetIDPassword',
    cname: '找回登录ID及密码-重置ID及密码',
    component: ResetIDPasswordPage,
  },
  {
    name: 'SecuritySettings',
    cname: '安全设置',
    component: SecuritySettingsPage,
  },
  {
    name: 'FaceRecognition',
    cname: '找回登录ID及密码-人脸识别',
    component: FaceRecognitionPage,
  },
  {
    name: 'ChangePin',
    cname: '修改登入密码',
    component: ChangePinPage,
  },
  {
    name: 'ChangeTransPin',
    cname: '修改交易密码',
    component: ChangeTransPinPage,
  },
];
