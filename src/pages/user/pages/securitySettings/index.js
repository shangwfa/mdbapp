import React from 'react';
import {List} from '@ant-design/react-native';
import BasePage from '#/pages/BasePage';
const Item = List.Item;
class AboutUS extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '安全設置',
    });
    const {navigation} = this.props;
    this.state = {
      itemArr: [
        {
          extra: 'www.mdb.com.mo',
          onPress: () => {
            navigation.navigate('ChangePin', {
              title: '修改登入密碼',
            });
          },
          title: '修改登入密碼',
        },
        {
          onPress: () => {
            navigation.navigate('ChangeTransPin', {
              title: '修改交易密碼',
            });
          },
          title: '修改交易密碼',
        },
        {
          onPress: () => {
            navigation.navigate('TransPinVerifyCode', {
              title: '获取重置交易密碼验证码',
            });
          },
          title: '重置交易密碼',
        },
        {
          onPress: () => {},
          title: '指紋登入',
          extra: '關閉',
        },
        {
          onPress: () => {},
          title: '快捷支付管理',
        },
        {
          onPress: () => {},
          title: '登入歷史',
        },
        {
          onPress: () => {},
          title: '登出設置',
          extra: '2分鐘',
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
