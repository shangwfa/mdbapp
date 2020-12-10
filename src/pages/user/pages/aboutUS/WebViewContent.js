import React from 'react';
import {Platform} from 'react-native';
import {WebView} from 'react-native-webview';

export default function WebViewContent({route, navigation, lang}) {
  const loadFlie = () => {
    const fileName = 'ImportantStatementCN';
    const flie =
      Platform.OS === 'android'
        ? require(`./webPage/${fileName}.html`)
        : {uri: `file:///android_asset/webPage/${fileName}.html`};
    return flie;
  };
  return <WebView source={loadFlie('ImportantStatementCN')} />;
}
