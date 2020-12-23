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
];

export const routePaths = {};
routes.forEach((item) => (routePaths[item.name] = item.name));

export default routes;
