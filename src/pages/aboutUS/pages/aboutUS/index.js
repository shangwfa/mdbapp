import React from 'react';
import {Linking} from 'react-native';
import {List} from '@ant-design/react-native';
import BasePage from '#/pages/BasePage';
import lang from '#/i18n';
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
            navigation.navigate('Statements', {
              title: lang.t('aboutUs.WebSite'),
            });
          },
          title: lang.t('aboutUs.WebSite'),
        },
        {
          onPress: () => {
            navigation.navigate('Statements', {
              title: lang.t('aboutUs.TermsOfService'),
            });
          },
          title: lang.t('aboutUs.TermsOfService'),
        },
        {
          onPress: () => {
            navigation.navigate('Statements', {
              title: lang.t('aboutUs.PrivacyPolicy'),
            });
          },
          title: lang.t('aboutUs.PrivacyPolicy'),
        },
        {
          onPress: () => {
            navigation.navigate('Statements', {
              title: lang.t('aboutUs.ImportantStatement'),
            });
          },
          title: lang.t('aboutUs.ImportantStatement'),
        },
        {
          onPress: () => {
            navigation.navigate('Statements', {
              title: lang.t('aboutUs.IntellectualStatement'),
            });
          },
          title: lang.t('aboutUs.IntellectualStatement'),
        },
        {
          extra: '+853 28337766',
          onPress: () => {
            Linking.openURL('tel:+853 28337766').catch((err) => {
              console.log('call MDB Service Hotline failed ' + err);
            });
          },
          title: lang.t('aboutUs.ContactUs'),
        },
        {
          onPress: () => {
            navigation.navigate('ShootIDCard');
          },
          title: '找回登錄ID及密碼',
        },
        {
          onPress: () => {
            navigation.navigate('AccountList');
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
