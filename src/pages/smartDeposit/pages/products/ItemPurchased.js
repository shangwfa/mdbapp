import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableHighlight} from 'react-native';
import {Card} from '@ant-design/react-native';
import {formatNumber} from '#/utils';
import {PropTypes} from 'prop-types';
import lang from '#/i18n';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-23 14:11:41
 * @Description: file content
 */
export default class ItemPurchased extends Component {
  static propTypes = {
    index: PropTypes.number,
    product: PropTypes.object,
    onSelect: PropTypes.func,
  };
  render() {
    let index = this.props.index + 1;
    let product = this.props.product;
    return (
      <TouchableHighlight>
        <Card full>
          <Card.Header
            title={index + '.' + product.PROD_LCL}
            extra={product.PROD_T_NUM + lang.t('smartDeposit.label_deposits')}
          />
          <Card.Body>
            <View style={styles.content}>
              <View style={styles.row}>
                <Text>{product.AMT + product.ACCRINT}</Text>
                <Text>
                  {lang.t('smartDeposit.label_total_principal_interest')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>
                  {lang.t('smartDeposit.label_principal_do')} {product.AMT}
                </Text>
                <Text>
                  {lang.t('smartDeposit.label_interest_do')} {product.ACCRINT}
                </Text>
              </View>
            </View>
          </Card.Body>
        </Card>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    marginLeft: 16,
    marginRight: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  header: {
    textAlign: 'left',
    textAlignVertical: 'center',
    color: '#000',
    fontWeight: '500',
    fontSize: 22,
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  row: {
    fontSize: 20,
  },
  footer: {},
});
