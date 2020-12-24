import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import BasePage from '../../../BasePage';
import {List} from '@ant-design/react-native';
import RenderStaticPage from '#/components/render/RenderStaticPage';

class MinePage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '我的',
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
            itemType: this.renderItem,
            props: {
              name: '安全設置',
              key: '安全設置',
              onPress: () => {
                this.navigation.navigate('SecuritySettings');
              },
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '個人設置',
              key: '個人設置',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '交易限額',
              key: '交易限額',
              onPress: () => {
                this.navigation.navigate('TransLimit');
              },
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '電子結單/通知書',
              key: '電子結單/通知書',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '借記卡',
              key: '借記卡',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '語言',
              key: '語言',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '登入方式',
              key: '登入方式',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '信任設備',
              key: '信任設備',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '客戶分類',
              key: '客戶分類',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '風險問卷',
              key: '風險問卷',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '清空緩存',
              key: '清空緩存',
              onPress: () => {},
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '關於我們',
              key: '關於我們',
              onPress: () => {
                this.navigation.navigate('AboutUS');
              },
              arrow: 'horizontal',
            },
          },
          {
            itemType: this.renderItem,
            props: {
              name: '版本',
              key: '版本',
              onPress: () => {},
              extra: '1.03',
            },
          },
        ],
      },
    };
  }

  renderItem = (item) => {
    return (
      <List.Item {...item} key={item.name}>
        {item.name}
      </List.Item>
    );
  };

  renderContainer() {
    return <RenderStaticPage pageDes={this.state.pageDes} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default MinePage;
