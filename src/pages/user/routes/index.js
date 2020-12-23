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
import SecuritySettingsPage from '../pages/securitySettings';
import ChangePinPage from '../pages/changePin';
import ChangeTransPinPage from '../pages/changeTransPin';

import AccountType from '../pages/accountType';
import ChangeMobileToken from '../pages/changeMobileToken';
import LoginLogs from '../pages/loginLogs';
import Logout from '../pages/logout';
import QuestionNaire from '../pages/questionNaire';
import SessionOnline from '../pages/sessionOnline';
import TransLimit from '../pages/transLimit';
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
    name: 'SecuritySettings',
    cname: '安全设置',
    component: SecuritySettingsPage,
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
    name: 'TransLimit',
    cname: '交易限額',
    component: TransLimit,
  },
];
