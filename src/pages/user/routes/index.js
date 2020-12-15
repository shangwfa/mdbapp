import LoginPage from '../pages/login';
import FaceIDLoginPage from '../pages/faceIDLogin/FaceIDLoginPage';
import FingerLoginPage from '../pages/fingerLogin/FingerLoginPage';
import UserProfile from '../pages/userProfile/UserProfilePage';
import AboutUSRoutes from '../pages/aboutUS/routes';
import ResetTransPinRoutes from '../pages/resetTransPin/routes';
import RetrieveIDPassword from '../pages/retrieveIDPassword/routes';
import FingerDemo from '../pages/fingerDemo/Application.container';

export default [
  {
    name: 'Login',
    component: LoginPage,
  },
  {
    name: 'userProfile',
    component: UserProfile,
  },
  {
    name: 'fingerLogin',
    component: FingerLoginPage,
  },
  {
    name: 'faceIDLogin',
    component: FaceIDLoginPage,
  },
  {
    name: 'fingerDemo',
    component: FingerDemo,
  },
  ...AboutUSRoutes,
  ...ResetTransPinRoutes,
  ...RetrieveIDPassword,
];
