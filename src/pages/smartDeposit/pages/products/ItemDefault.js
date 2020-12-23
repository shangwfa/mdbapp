import React, {Component} from 'react';
import {Text, StyleSheet, TouchableHighlight} from 'react-native';
import {Card} from '@ant-design/react-native';
import {formatNumber} from '#/utils';
import {PropTypes} from 'prop-types';
import lang from '#/i18n';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-23 14:13:49
 * @Description: file content
 */
export default class ItemDefault extends Component {
  static propTypes = {
    index: PropTypes.number,
    product: PropTypes.object,
    onSelect: PropTypes.func,
  };
  render() {
    let index = this.props.index + 1;
    let product = this.props.product;
    return (
      <TouchableHighlight onPress={() => this.props.onSelect()}>
        <Card full>
          <Card.Header
            title={index + '.' + product.PROD_LCL}
            extra={product.PROD_T_NUM + lang.t('smartDeposit.label_deposits')}
          />
          <Card.Body>
            <Text style={styles.desc}>
              {lang.t('smartDeposit.note_easy_go_left') +
                formatNumber(product.PROD_HIGH_RATE, 2) +
                '%'}
            </Text>
          </Card.Body>
        </Card>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  desc: {
    marginLeft: 20,
    color: '#4F4F4F',
    fontSize: 16,
  },
});
