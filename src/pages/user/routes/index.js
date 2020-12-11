import LoginPage from '../pages/login';
import AboutUSRoutes from '../pages/aboutUS/routes';
import ResetTransPinRoutes from '../pages/resetTransPin/routes';
export default [
  {
    name: 'Login',
    component: LoginPage,
  },
  ...AboutUSRoutes,
  ...ResetTransPinRoutes,
];
