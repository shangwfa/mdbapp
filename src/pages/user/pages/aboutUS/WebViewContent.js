import React from 'react';
import {Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import BasePage from '../../../BasePage';
class WebViewContent extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: 'WebViewContent',
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
    return <WebView source={this.loadFlie('ImportantStatementCN')} />;
  }
}
export default WebViewContent;
