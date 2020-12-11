import React from 'react';
import {Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import BasePage from '../../../BasePage';
class WebViewContent extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: props.route.params.title || '',
    });
  }
  loadFlie = () => {
    const fileName = 'ImportantStatementCN';
    const flie =
      Platform.OS === 'android'
        ? require(`./webPage/${fileName}.html`)
        : {uri: `file:///android_asset/webPage/${fileName}.html`};
    return flie;
  };
  renderContainer() {
    const myHtmlFile = require('./webPage/ImportantStatementCN.html');
    return <WebView source={myHtmlFile} />;
  }
}
export default WebViewContent;
