import AboutUSPage from '../pages/aboutUS';
import StatementsPage from '../pages/statements';
import SecuritySettingsPage from '../pages/securitySettings';
export default [
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
];
