import ShootIDCardPage from '../pages/shootIDCard';
import IDCardInfoPage from '../pages/IDCardInfo';
import IDVerifyCodePage from '../pages/IDVerifyCode';
import ResetIDPasswordPage from '../pages/resetIDPassword';
import FaceRecognitionPage from '../pages/faceRecognition';

export default [
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
    name: 'FaceRecognition',
    cname: '找回登录ID及密码-人脸识别',
    component: FaceRecognitionPage,
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
];
