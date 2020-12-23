import HTTP from '#/api';
import path from '../../api/path';
import lang from '#/i18n';
import {formatNumber, formatAccount, formatDate, formatTime} from '#/utils';
import constant from '#/constants';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-22 14:17:30
 * @Description: 订单详情
 */
export default class OrderDetailService {
  query(conNo, prodType) {
    return new Promise((resolve, reject) => {
      HTTP.api({
        url: path.SMART_DEPOSIT_URL,
        method: 'POST',
        data: {
          ActionMethod: 'smartDepositDetail',
          CON_NO: conNo,
          PRD_TYPE: prodType,
        },
      }).then((res) => {
        resolve(this.format(res));
      });
    });
  }

  format(data) {
    let conList = data.CON_LIST;
    let renderData = conList.length > 0 ? conList[0] : {};
    let year1 = formatDate(renderData.OPEN_DATE);
    let hours1 = formatTime(renderData.TR_TIME);

    let year2 = formatDate(renderData.REDEMPTION_DATE);
    let hours2 = formatTime(renderData.REDEMPTION_TIME);
    let withdrew_type =
      renderData.REDEMPTION_FLAG === 'M'
        ? lang.t('smartDeposit.withdrew_auto_expire')
        : withdrew_type === 'E'
        ? lang.t('smartDeposit.withdrew_before_expire')
        : '';

    return {
      'smartDeposit.label_pro_name': renderData.PROD_LCL,
      'smartDeposit.deposit_day': year1 + ' ' + hours1,
      'smartDeposit.deposit_ref': renderData.CON_NO,
      'smartDeposit.label_principal':
        lang.t('smartDeposit.label_mop') + formatNumber(renderData.AMT, 2),
      'smartDeposit.label_rate_year':
        formatNumber(renderData.CON_RATE, 2) + '%',
      'smartDeposit.value_date': formatDate(renderData.OPEN_DATE),
      'smartDeposit.label_rate':
        lang.t('smartDeposit.label_mop') + formatNumber(renderData.ACCRINT, 2),
      'smartDeposit.label_total_principal_interest':
        lang.t('smartDeposit.label_mop') +
        formatNumber(renderData.AMT + renderData.ACCRINT, 2),
      'smartDeposit.deposit_term': renderData.TENOR,
      'smartDeposit.expire_time': formatDate(renderData.MAT_DATE),
      'smartDeposit.label_withdrew_time': year2 + ' ' + hours2,
      'smartDeposit.withdrew_type': withdrew_type,
      'smartDeposit.label_recevie_acctount': formatAccount(
        renderData.DR_AC,
        'modeOne',
      ),
      'smartDeposit.label_refno': renderData.host_tran_ref,
    };
  }
}
