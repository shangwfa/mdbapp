import React from 'react';
import {
  Text,
  StyleSheet,
  View,
  RefreshControl,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import lang from '#/i18n';
import BasePage from '#/pages/BasePage';
import ProductsService from './ProductsService';
import {Card, WhiteSpace} from '@ant-design/react-native';
import {formatNumber} from '#/utils';
import ItemDefault from './ItemDefault';
import ItemPurchased from './ItemPurchased';
import Dashboard from './Dashboard';
/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-23 10:29:01
 * @Description: 智能存款产品列表
 */
export default class ProductsPage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      pageKey: '',
      isLoading: false,
      products: [],
      purchasedTotalAmount: 0,
    };
    this.initHeader({
      title: lang.t('smartDeposit.smart_Deposit'),
    });
    this.productsService = new ProductsService();
  }

  didMount() {
    this._loadData(true);
  }

  _loadData(refresh) {
    if (refresh) {
      this.setState({isLoading: true, pageKey: ''});
    }
    this.productsService.query(this.state.pageKey).then((res) => {
      let result = refresh
        ? res.PROD_LIST
        : this.state.products.concat(res.PROD_LIST);
      this.setState({
        products: result,
        isLoading: false,
        pageKey: res.NEXT_KEY,
        purchasedTotalAmount: res.TOT_PRIN,
      });
    });
  }

  renderContainer() {
    return (
      <>
        <Dashboard amount={this.state.purchasedTotalAmount} />
        <WhiteSpace />
        <FlatList
          data={this.state.products}
          keyExtractor={(item, index) => item + index}
          renderItem={(data) => this._renderItem(data)}
        />
      </>
    );
  }

  _gotoDetail(item) {
    this.navigation.navigate('productDetail', {product: item});
  }

  _renderItem({index, item}) {
    let isPurchased = item.PROD_T_NUM > 0;
    return isPurchased ? (
      <ItemPurchased
        index={index}
        product={item}
        onSelect={() => this._gotoDetail(item)}
      />
    ) : (
      <ItemDefault
        index={index}
        product={item}
        onSelect={() => this._gotoDetail(item)}
      />
    );
  }
}

const styles = StyleSheet.create({
  indicatorContainer: {
    alignItems: 'center',
  },
  indicator: {
    color: 'red',
    margin: 10,
  },
});
