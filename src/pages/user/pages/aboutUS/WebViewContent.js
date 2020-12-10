import React from 'react';
import {StyleSheet, ScrollView, Platform, Linking} from 'react-native';
import {List} from '@ant-design/react-native';
import {WebView} from 'react-native-webview';

// function loadFlie(key) {
//   const lang = this.props.lang === 'CN' ? 'CN' : 'US';
//   const files = {
//     ImportantStatement: {
//       CN: '/webPage/ImportantStatementCN.html',
//       US: '/webPage/ImportantStatementUS.html',
//     },
//   };
//   const fileUri = files[key][lang];
//   return Platform.OS === 'android'
//     ? require(`.${fileUri}`)
//     : {uri: `file:///android_asset${fileUri}`};
// }

// var source =
//   Platform.OS === 'ios'
//     ? require('./webPage/ImportantStatementCN.html')
//     : {uri: 'file:///android_asset/webPage/ImportantStatementCN.html'};

export default function WebViewContent({route, navigation}) {
  console.log(121212, route, navigation);
  return <WebView source={require('./webPage/ImportantStatementCN.html')} />;
}
