import React from 'react';
import {StyleSheet, ScrollView, Platform, Linking} from 'react-native';
import {List} from '@ant-design/react-native';
import {WebView} from 'react-native-webview';
const Item = List.Item;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: '#f5f5f9',
  },
  brief: {
    textAlign: 'right',
  },
});

// loadFlie(key){
//     const lang = this.props.lang === "CN" ? "CN":"US";
//     const files = {
//       ImportantStatement: {
//         CN:"/webPage/ImportantStatementCN.html",
//         US:"/webPage/ImportantStatementUS.html",
//       }
//     }
//     const fileUri = files[key][lang];
//     return Platform.OS==='android' ?require(`./webPage${fileUri}`):{uri:`file:///android_asset/webPage${fileUri}`}

// };

var source =
  Platform.OS === 'ios'
    ? require('./webPage/ImportantStatementCN.html')
    : {uri: 'file:///android_asset/webPage/ImportantStatementCN.html'};

export default function AboutUS({route, navigation}) {
  console.log(route.params);
  return (
    <ScrollView
      style={styles.scrollView}
      automaticallyAdjustContentInsets={false}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}>
      <List>
        <Item extra="www.mdb.com.mo" arrow="horizontal" onPress={() => {}}>
          官方網站
        </Item>
        <Item arrow="horizontal" onPress={() => {}}>
          服務條款
        </Item>
        <Item arrow="horizontal" onPress={() => {}}>
          資料保護聲明
        </Item>
        <Item arrow="horizontal" onPress={() => {}}>
          重要聲明
        </Item>
        <Item arrow="horizontal" onPress={() => {}}>
          知識產權聲明
        </Item>
        <Item
          extra="+853 28337766"
          arrow="horizontal"
          onPress={() => {
            Linking.openURL('tel:+853 28337766').catch((err) => {
              console.log('call MDB Service Hotline failed ' + err);
            });
          }}>
          聯絡我們
        </Item>
      </List>
      <WebView source={source} />
    </ScrollView>

    // <WebView source={{uri: 'https://www.baidu.com'}} />
  );
}
