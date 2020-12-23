import React from 'react';
import {Linking} from 'react-native';
import {List} from '@ant-design/react-native';
import BasePage from '#/pages/BasePage';
const Item = List.Item;
class AboutUS extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '关于我们',
    });
    const {navigation} = this.props;
    this.state = {
      itemArr: [
        {
          extra: 'www.mdb.com.mo',
          onPress: () => {
            navigation.navigate('Statements');
          },
          title: '官方網站',
        },
        {
          onPress: () => {
            navigation.navigate('Statements');
          },
          title: '服務條款',
        },
        {
          onPress: () => {
            navigation.navigate('Statements');
          },
          title: '資料保護聲明',
        },
        {
          onPress: () => {
            navigation.navigate('Statements');
          },
          title: '重要聲明',
        },
        {
          onPress: () => {
            navigation.navigate('Statements');
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
        {
          onPress: () => {
            navigation.navigate('ShootIDCard');
          },
          title: '找回登錄ID及密碼',
        },
        {
          onPress: () => {
            navigation.navigate('LoanAccount');
          },
          title: '贷款账户',
        },
      ],
    };
  }
  renderContainer() {
    const {itemArr} = this.state;
    return (
      <List>
        {itemArr.map((item) => (
          <Item {...item} key={item.title}>
            {item.title}
          </Item>
        ))}
      </List>
    );
  }
}
export default AboutUS;
