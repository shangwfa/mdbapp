import LoginPage from '../pages/login';
import AboutUS from '../pages/aboutUS';
import WebViewContent from '../pages/aboutUS/WebViewContent';
import ResetTransPin from '../pages/resetTransPin';
export default [
  {
    name: 'Login',
    component: LoginPage,
  },
  {
    name: 'AboutUS',
    component: AboutUS,
  },
  {
    name: 'WebViewContent',
    component: WebViewContent,
  },
  {
    name: 'ResetTransPin',
    component: ResetTransPin,
  },
];
