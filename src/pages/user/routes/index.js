/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-17 14:40:39
 * @Description: file content
 */
import LoginPage from '../pages/login';
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

import AccountType from '../pages/accountType';
import ChangeMobileToken from '../pages/changeMobileToken';
import LoginLogs from '../pages/loginLogs';
import Logout from '../pages/logout';
import QuestionNaire from '../pages/questionNaire';
import SessionOnline from '../pages/sessionOnline';
import LoanAccount from '../pages/loanAccount';
import LoanAccountDetail from '../pages/loanAccountDetail';
import PaymentManagement from '../pages/paymentManagement';
import PaymentWebView from '../pages/paymentWebView';

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
  {
    name: 'AccountType',
    cname: '客户分类',
    component: AccountType,
  },
  {
    name: 'ChangeMobileToken',
    cname: '信任此设备',
    component: ChangeMobileToken,
  },
  {
    name: 'LoginLogs',
    cname: '登录历史',
    component: LoginLogs,
  },
  {
    name: 'Logout',
    cname: '退出登录',
    component: Logout,
  },
  {
    name: 'QuestionNaire',
    cname: '风险问卷',
    component: QuestionNaire,
  },
  {
    name: 'SessionOnline',
    cname: '设置退出时间',
    component: SessionOnline,
  },
  {
    name: 'LoanAccount',
    cname: '贷款账户',
    component: LoanAccount,
  },
  {
    name: 'LoanAccountDetail',
    cname: '贷款账户详情',
    component: LoanAccountDetail,
  },
  {
    name: 'PaymentManagement',
    cname: '快捷支付管理賬戶列表',
    component: PaymentManagement,
  },
  {
    name: 'PaymentWebView',
    cname: '服務條款說明',
    component: PaymentWebView,
  },
];
