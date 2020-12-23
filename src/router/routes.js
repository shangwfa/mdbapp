import SplashPage from '../pages/splash';
import Tabs from '../pages/tabs';
import RNCameraPage from '../pages/test/rnCamera';
import UserModule from '../pages/user';
import ThemePage from '../pages/test/theme';
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
  {
    name: 'ThemePage',
    component: ThemePage,
  },
  ...UserModule.routes,
];

export const routePaths = {};
routes.forEach((item) => (routePaths[item.name] = item.name));

export default routes;
