import lang from '#/i18n';
import ShootIDCard from '#/pages/resetIDPassword/pages/shootIDCard';
import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  View,
  SectionList,
  TouchableHighlight,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import OrderService from './OrderService';
import {Card, WhiteSpace} from '@ant-design/react-native';
import BasePage from '#/pages/BasePage';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-22 14:16:41
 * @Description: 已完成订单
 */
export default class OrderPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      orders: [],
    };
    this.orderService = new OrderService();

    this.initHeader({
      title: lang.t('smartDeposit.label_have_been_finish_deposit'),
    });
  }

  loadData(refresh) {
    if (refresh) {
      this.setState({
        isLoading: true,
      });
    }
    this.orderService.queryOrder().then((res) => {
      let result = refresh ? res : this.state.orders.concat(res);
      this.setState({orders: result, isLoading: false});
    });
  }

  componentDidMount() {
    this.loadData(true);
  }

  genIndicator() {
    if (this.state.orders.length == 0) return <View></View>;
    return (
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
          size="large"
          animating={true}
        />
        <Text>正在加载更多</Text>
      </View>
    );
  }

  _onPressItem(item) {
    console.log('_onPressItem: ', 'ehllll');
    // let test_CON_NO = '801250000000377';
    // let test_PROD_TYPE = 'SI3M319G';
    this.navigation.navigate('orderDetail', {
      CON_NO: item.CON_NO,
      PROD_TYPE: item.PROD_TYPE,
    });
  }
  _renderItem = ({item}) => {
    if (item && item.length == 0) return <View></View>;
    return (
      <TouchableHighlight
        onPress={() => this._onPressItem(item)}
        activeOpacity={1}>
        <Card full>
          <Card.Header
            title={lang.t('smartDeposit.ref_no_deposited') + item.CON_NO}
          />
          <Card.Body>
            <View style={styles.content}>
              <View style={styles.row}>
                <Text>{item.AMT + item.ACCRINT}</Text>
                <Text>
                  {lang.t('smartDeposit.label_total_principal_interest')}
                </Text>
              </View>
              <View style={styles.row}>
                <Text>
                  {lang.t('smartDeposit.label_principal_do')} {item.AMT}
                </Text>
                <Text>
                  {lang.t('smartDeposit.label_interest_do')} {item.ACCRINT}
                </Text>
              </View>
            </View>
          </Card.Body>
          <Card.Footer
            content={
              item.PROD_LCL +
              lang.t('smartDeposit.label_withrew_to_acct') +
              item.DR_AC +
              item.REDEMPTION_TIMESTAMPS
            }
          />
        </Card>
      </TouchableHighlight>
    );
  };
  _sectionTitle({section}) {
    if (section.data.length === 0) return <View></View>;
    var title = section.title;
    return <Text style={{fontSize: 16, marginLeft: 16}}>{title}</Text>;
  }

  renderContainer() {
    return (
      <SectionList
        sections={this.state.orders}
        keyExtractor={(item, index) => item + index}
        renderItem={this._renderItem}
        ItemSeparatorComponent={() => <WhiteSpace size="lg" />}
        renderSectionHeader={this._sectionTitle}
        refreshing={this.state.isLoading}
        onRefresh={() => {
          this.loadData();
        }}
        refreshControl={
          <RefreshControl
            title="Loading..."
            colors={['red']}
            refreshing={this.state.isLoading}
            onRefresh={() => this.loadData(true)}
            tintColor={'orange'}
          />
        }
        ListFooterComponent={() => this.genIndicator()}
        onEndReached={() => {
          this.loadData();
        }}
      />
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
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});
