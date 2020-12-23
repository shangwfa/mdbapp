/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-22 14:17:30
 * @Description: 订单详情
 */
import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import BasePage from '#/pages/BasePage';
import lang from '#/i18n';
import OrderDetailService from './OrderDetailService';

export default class OrderDetailPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
    };

    this.initHeader({
      title: lang.t('smartDeposit.label_finish_deposit_detail'),
    });

    this.orderDetailService = new OrderDetailService();
  }

  didMount() {
    let CON_NO = this.params.CON_NO;
    let PROD_TYPE = this.params.PROD_TYPE;
    this.orderDetailService.query(CON_NO, PROD_TYPE).then((res) => {
      this.setState({order: res});
    });
  }

  _item(key, value) {
    return (
      <View style={styles.row}>
        <Text style={styles.label}>{lang.t(key)}</Text>
        <Text style={styles.value}> {value} </Text>
      </View>
    );
  }
  renderContainer() {
    let content = [];
    for (let [key, value] of Object.entries(this.state.order)) {
      content.push(this._item(key, value));
    }
    return <View style={styles.content}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  content: {
    flexDirection: 'column',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
  },
  label: {width: 100, color: 'gray'},
  value: {width: 200, color: '#000'},
});
