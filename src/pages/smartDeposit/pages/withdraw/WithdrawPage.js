import React, {Component} from 'react';
import {Text, ScrollView, StyleSheet, View} from 'react-native';
import {List} from '@ant-design/react-native';
const Item = List.Item;
import lang from '#/i18n';
import {formatNumber, formatAccount, formatDate, formatTime} from '#/utils';
import BasePage from '#/pages/BasePage';
import WithdrawService from './WithdrawService';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-23 15:13:38
 * @Description: 取消订单
 */
export default class WithdrawPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      products: [],
      purchasedTotalAmount: 0,
    };
    this.initHeader({
      title: lang.t('smartDeposit.smart_Deposit'),
    });
    this.WithdrawService = new WithdrawService();
  }

  didMount() {
    // this._loadData(true);
  }

  //   _loadData(refresh) {
  //     if (refresh) {
  //       this.setState({isLoading: true, pageKey: ''});
  //     }
  //     this.WithdrawService.query(this.state.pageKey).then((res) => {
  //       let result = refresh
  //         ? res.PROD_LIST
  //         : this.state.products.concat(res.PROD_LIST);
  //       this.setState({
  //         products: result,
  //         isLoading: false,
  //         pageKey: res.NEXT_KEY,
  //         purchasedTotalAmount: res.TOT_PRIN,
  //       });
  //     });
  //   }

  renderContainer() {
    let renderData = {};
    let year = formatDate(renderData.VAL_DATE);
    let hours = formatTime(renderData.TR_TIME);
    let time = year + ' ' + hours;
    return (
      <ScrollView
        style={{flex: 1, backgroundColor: '#f5f5f9'}}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <List renderHeader={'basic'}>
          <Item extra={time} arrow="empty">
            {lang.t('smartDeposit.deposit_day')} {/*'存入時間'*/}
          </Item>
          <Item extra={renderData.CON_TENOR} arrow="empty">
            {lang.t('smartDeposit.label_term')} {/*'期數'*/}
          </Item>
          <Item extra={formatDate(renderData.MAT_DATE)} arrow="empty">
            {lang.t('smartDeposit.expire_time')}
            {/*'到期時間'*/}
          </Item>
          <Item extra={formatDate(renderData.VAL_DATE)} arrow="empty">
            {lang.t('smartDeposit.value_date')}
          </Item>
          <Item
            extra={
              renderData.DEPOSIT_DAYS === 0
                ? '0'
                : formatNumber(renderData.TODAY_RATE, 2) + '%'
            }
            arrow="empty">
            {lang.t('smartDeposit.withdraw_today_rate')} {/*'今日取出利率'*/}
          </Item>
          <Item extra={renderData.TODAY_INSTREST} arrow="empty">
            {lang.t('smartDeposit.withdraw_today_interest')}{' '}
            {/*'今日取出可獲利息'*/}
          </Item>
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({});
