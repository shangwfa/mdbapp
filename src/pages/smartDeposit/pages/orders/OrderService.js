import HTTP from '#/api';
import path from '../../api/path';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-22 14:23:14
 * @Description: file content
 */
export default class OrderService {
  queryOrder(key, redemptionFlag) {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: path.SMART_DEPOSIT_URL,
        method: 'POST',
        data: {
          ActionMethod: 'cusFinishDepositList',
          key: key,
          REDEMPTION_FLAG: redemptionFlag,
        },
      }).then((res) => {
        resolve(this.transToSectionGroup(res));
      });
    });
  }
  /**
   * return [{
   *    title:"",
   *    data:[]
   * }]
   * @param {*} data
   */
  transToSectionGroup(data) {
    let result = [];
    for (let [key, value] of Object.entries(data)) {
      result.push({title: key, data: value});
    }
    return result;
  }
}
