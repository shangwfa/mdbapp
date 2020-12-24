import PaymentAccList from '../pages/paymentAccList';
import PaymentWebView from '../pages/paymentWebView';
import PaymentVerifyCode from '../pages/paymentVerifyCode';
import MerchantManage from '../pages/merchantManage';
export default [
  {
    name: 'PaymentAccList',
    cname: '快捷支付管理賬戶列表',
    component: PaymentAccList,
  },
  {
    name: 'PaymentWebView',
    cname: '服務條款說明',
    component: PaymentWebView,
  },
  {
    name: 'PaymentVerifyCode',
    cname: '快捷支付管理',
    component: PaymentVerifyCode,
  },
  {
    name: 'MerchantManage',
    cname: '商户管理',
    component: MerchantManage,
  },
];
