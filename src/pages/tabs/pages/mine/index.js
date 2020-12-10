import * as React from 'react';
import {StyleSheet, ScrollView, Text} from 'react-native';
import BasePage from '../../../BasePage';
import {List} from '@ant-design/react-native';

class MinePage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      listData: this.initListData(),
    };
    this.initHeader({
      title: '我的',
    });
  }

  initListData() {
    return [
      {
        name: '安全設置',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '個人設置',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '交易限額',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '電子結單/通知書',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '借記卡',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '語言',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '登入方式',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '信任設備',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '客戶分類',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '風險問卷',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '清空緩存',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '關於我們',
        onPress: () => {},
        disabled: true,
        arrow: 'horizontal',
      },
      {
        name: '版本',
        onPress: () => {},
        extra: '1.03',
      },
    ];
  }

  renderContainer() {
    return (
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <List>
          {this.state.listData.map((item) => {
            return (
              <List.Item {...item} key={item.name}>
                {item.name}
              </List.Item>
            );
          })}
        </List>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default MinePage;
