import React from 'react';
import {StyleSheet, ScrollView, Linking} from 'react-native';
import {List} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
const Item = List.Item;
class AboutUS extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: 'AboutUS',
    });
    const {navigation} = this.props;
    this.state = {
      itemArr: [
        {
          extra: 'www.mdb.com.mo',
          onPress: () => {
            navigation.navigate('WebViewContent');
          },
          title: '官方網站',
        },
        {
          onPress: () => {
            navigation.navigate('WebViewContent');
          },
          title: '服務條款',
        },
        {
          onPress: () => {
            navigation.navigate('WebViewContent');
          },
          title: '資料保護聲明',
        },
        {
          onPress: () => {
            navigation.navigate('WebViewContent');
          },
          title: '重要聲明',
        },
        {
          onPress: () => {
            navigation.navigate('WebViewContent');
          },
          title: '知識產權聲明',
        },
        {
          extra: '+853 28337766',
          onPress: () => {
            Linking.openURL('tel:+853 28337766').catch((err) => {
              console.log('call MDB Service Hotline failed ' + err);
            });
          },
          title: '聯絡我們',
        },
      ],
    };
  }
  render() {
    const {itemArr} = this.state;
    return (
      <ScrollView
        style={styles.scrollView}
        automaticallyAdjustContentInsets={false}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <List>
          {itemArr.map((item, index) => (
            <Item extra={item.extra} arrow="horizontal" onPress={item.onPress}>
              {item.title}
            </Item>
          ))}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  brief: {
    textAlign: 'right',
  },
});
export default AboutUS;
