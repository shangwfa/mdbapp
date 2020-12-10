import React from 'react';
import {Linking} from 'react-native';
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
  renderContainer() {
    const {itemArr} = this.state;
    return (
      <List>
        {itemArr.map((item, index) => (
          <Item {...item}>{item.title}</Item>
        ))}
      </List>
    );
  }
}
export default AboutUS;
