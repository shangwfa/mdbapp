import HTTP from '#/api';
import path from '../../api/path';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-23 15:14:34
 * @Description: file content
 */
export default class WithdrawService {
  query(acctNum) {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: path.SMART_DEPOSIT_URL,
        method: 'POST',
        data: {
          ActionMethod: 'tdWDLoad',
          acctNum: acctNum,
          PageLanguage: 'zh_CN',
        },
      }).then((res) => {
        resolve(this.format(res));
      });
    });
  }

  format(result) {
    let acctList = [];
    for (let i in result.acctList) {
      let select = {
        value: result.acctList[i].ACCOUNT_NO.trim(),
        label: result.acctList[i].selectDisplay,
      };
      acctList.push(select);
    }

    let matualTypeList = [];
    if (result.matualTypeList && result.matualTypeList.length > 0) {
      for (let i in result.matualTypeList) {
        let select = {
          value: result.matualTypeList[i].value,
          label: result.matualTypeList[i].label,
        };
        matualTypeList.push(select);
      }
    }
    return {
      detailData: result,
      acctListDetail: acctList,
      matualTypeList: matualTypeList,
    };
  }
}
