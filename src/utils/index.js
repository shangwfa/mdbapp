/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-22 17:56:43
 * @Description: file content
 */
import storage from './storage';
import moment from 'moment';

export function formatDate(data, format) {
  if (!data) return '';
  return moment(data, 'YYYYMMDD').format('YYYY/MM/DD');
}

export function formatTime(data, format) {
  if (!data) return '';
  return moment(data, 'HHmmss').format('HH:mm:ss');
}

export function formatAccount(num, type, maxLength, intLength) {
  if (num == undefined) {
    return;
  }
  num = num.toString().replace(/[^\d]/g, ''); //清除“数字”和“.”以外的字符
  if (type === 'modeOne') {
    try {
      num = num.toString().replace(/(\d{4})(?=\d)/g, '$1 ');
    } catch (reason) {
      console.log('format number failed +++++' + reason);
    }
  } else if (type === 'modeTwo') {
    try {
      num = num.toString().replace(/(\d{4})(?=\d)/g, '$1 ');
    } catch (reason) {
      console.log('format number failed +++++' + reason);
    }
  }
  return num;
}

export function formatAmount(num) {
  return formatNumber(num, 2);
}

export function formatNumber(num, precision, lang, ccy, type) {
  var parts;
  // 判断是否为数字,先去掉逗號
  if (typeof num !== 'undefined') {
    num = num.toString().replace(/,/g, '');
  }
  try {
    if (!isNaN(parseFloat(num)) && isFinite(num)) {
      // 把类似 .5, 5. 之类的数据转化成0.5, 5, 为数据精度处理做准, 至于为什么
      // 不在判断中直接写 if (!isNaN(num = parseFloat(num)) && isFinite(num))
      // 是因为parseFloat有一个奇怪的精度问题, 比如 parseFloat(12312312.1234567119)
      // 的值变成了 12312312.123456713
      num = Number(num);
      // 处理小数点位数
      num = (typeof precision !== 'undefined'
        ? num.toFixed(precision)
        : num
      ).toString();
      // 分离数字的小数部分和整数部分
      parts = num.split('.');
      if (type !== 'input') {
        // 整数部分加[,] 或 [.](lang=PT)分隔, 借用一个著名的正则表达式
        parts[0] = parts[0]
          .toString()
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + ',');
      }
      if (ccy === 'JPY' || ccy === 'KER') {
        num = parts[0];
      } else {
        num = parts.join('.');
      }
    }
    if (lang === 'PT') {
      parts = num.split('.');
      if (parts.length === 1) {
        num = parts[0].toString().replace(/,/g, '.');
      } else {
        num = parts[0].toString().replace(/,/g, '.');
        num += ',' + parts[1];
      }
    }
  } catch (reason) {
    console.log('format number failed +++++' + reason);
  }
  return num;
}

export default {
  ...storage,
};
