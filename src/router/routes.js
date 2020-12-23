/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-22 14:28:21
 * @Description: file content
 */
import SplashPage from '../pages/splash';
import Tabs from '../pages/tabs';
import RNCameraPage from '../pages/test/rnCamera';
import UserModule from '../pages/user';
import SmartDepositModule from '../pages/smartDeposit';
import PaymentManagement from '../pages/paymentManagement';
import LoanAccount from '../pages/loanAccount';
import ResetIDPassword from '../pages/resetIDPassword';
import ResetTransPin from '../pages/resetTransPin';
import AboutUS from '../pages/aboutUS';

const routes = [
  {
    name: 'Splash',
    component: SplashPage,
  },
  {
    name: 'Tabs',
    component: Tabs,
  },
  {
    name: 'RNCamera',
    component: RNCameraPage,
  },
  ...UserModule.routes,
  ...SmartDepositModule.routes,
  ...PaymentManagement.routes,
  ...LoanAccount.routes,
  ...ResetIDPassword.routes,
  ...ResetTransPin.routes,
  ...AboutUS.routes,
];

export const routePaths = {};
routes.forEach((item) => (routePaths[item.name] = item.name));

export default routes;
