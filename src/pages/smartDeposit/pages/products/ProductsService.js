import HTTP from '#/api';
import path from '../../api/path';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-23 10:29:38
 * @Description: file content
 */
export default class ProductsService {
  query(pageKey) {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: path.SMART_DEPOSIT_URL,
        method: 'POST',
        data: {
          ActionMethod: 'listAllCusDeposit',
          key: pageKey,
          PageLanguage: 'zh_CN',
        },
      }).then((res) => {
        resolve(res);
      });
    });
  }
}
