/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-22 14:26:16
 * @Description: file content
 */
import Orders from '../pages/orders/OrderPage';
import OrderDetail from '../pages/orderDetail/OrderDetailPage';

import ProductsPage from '../pages/products/ProductsPage';
import ProductDetailPage from '../pages/productDetail/ProductDetailPage';
export default [
  {
    name: 'orders',
    cname: '已完成存單',
    component: Orders,
  },
  {
    name: 'orderDetail',
    cname: '已完成存單详情',
    component: OrderDetail,
  },
  {
    name: 'products',
    cname: '智能存款产品列表',
    component: ProductsPage,
  },
  {
    name: 'productDetail',
    cname: '智能存款产品详情',
    component: ProductDetailPage,
  },
];
