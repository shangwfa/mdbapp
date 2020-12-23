/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-23 14:34:21
 * @Description: file content
 */
import React, {Component} from 'react';
import {
  Text,
  Dimensions,
  StyleSheet,
  View,
  ImageBackground,
} from 'react-native';
import lang from '#/i18n';
import {formatNumber} from '#/utils';
import {PropTypes} from 'prop-types';
let {width, height} = Dimensions.get('window');

export default class Dashboard extends Component {
  static propTypes = {
    amount: PropTypes.number,
  };

  render() {
    let back_img = require('./imgs/smartDeposit_background.png');
    return (
      <ImageBackground
        style={styles.container}
        source={back_img}
        resizeMode="stretch">
        <Text style={styles.title}> {formatNumber(this.props.amount, 2)} </Text>
        <Text style={styles.subtitle}>
          {' '}
          {lang.t('smartDeposit.deposit_total_amt')}{' '}
        </Text>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    width: width,
    height: width * 0.5,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 22,
  },
  subtitle: {
    color: '#FFF',
  },
});
