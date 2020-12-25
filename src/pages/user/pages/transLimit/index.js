// 退出时间设置
import React from 'react';
import {View, Text, StyleSheet, ScrollView, Button} from 'react-native';
// import HTTP from '#/api';
// import apiPaths from '#/api/path';
import {WhiteSpace} from '@ant-design/react-native';
import BasePage from '#/pages/BasePage';
// import LimitItem from './LimitItem'
import RenderStaticPage from '#/components/render/RenderStaticPage';
import LimitItem from './components/LimitItem';

class TransLimit extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '交易限額',
    });
    this.state = {
      pageDes: {
        container: ScrollView,
        props: {
          showsVerticalScrollIndicator: false,
          style: styles.container,
        },
        children: [
          {
            itemType: this.renderCcy,
            props: {
              title: '币种',
              key: '币种',
            },
          },
          {
            itemType: this.renderLimitArr,
            props: {
              title: '限额列表',
              key: '限额列表',
              itemArr: [
                {
                  title: '兌換（本人）',
                  single_transaction_exchange_limit: '1,000,000.00',
                  daily_cumulative_exchange_limit: '1,000,000.00',
                },
                {
                  title: '轉帳（本行他人）',
                  single_transaction_limit: '1,000,000.00',
                  daily_cumulative_limit: '1,000,000.00',
                },
                {
                  title: '轉帳（本澳他行）',
                  single_transaction_limit: '1,000,000.00',
                  daily_cumulative_limit: '1,000,000.00',
                },
                {
                  title: '轉帳（海外他行）',
                  single_transaction_limit: '1,000,000.00',
                  daily_cumulative_limit: '1,000,000.00',
                },
              ],
            },
          },
          {
            itemType: this.renderBtn,
            props: {
              title: '改变视图',
              key: '改变视图',
            },
          },
        ],
      },
    };
  }
  renderBtn = (props) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <WhiteSpace size="sm" />
        <Button
          style={styles.btn}
          title={props.title}
          onPress={props.onPress}
        />
      </View>
    );
  };
  renderCcy = () => {
    return (
      <View style={{justifyContent: 'flex-end'}}>
        <Text style={{textAlign: 'right', marginRight: 15, padding: 5}}>
          幣種:澳門幣
        </Text>
      </View>
    );
  };
  renderLimitArr = (props) => {
    return (
      <>
        {props.itemArr.map((item) => (
          <LimitItem item={item} />
        ))}
      </>
    );
  };
  renderContainer() {
    const {itemArr} = this.state;
    return <RenderStaticPage pageDes={this.state.pageDes} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
  },
  comC: {
    backgroundColor: '#f5f5dc',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TransLimit;
