import SplashPage from '../pages/splash';
import Tabs from '../pages/tabs';
import LoginPage from '../pages/login';
import RNCameraPage from '../pages/rnCamera';
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
    name: 'Login',
    component: LoginPage,
  },
  {
    name: 'RNCamera',
    component: RNCameraPage,
  },
];

export const routePaths = {};
routes.forEach((item) => (routePaths[item.name] = item.name));

export default routes;
