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
    const xx = `./webPage/${fileName}.html`;
    const flie =
      Platform.OS === 'ios'
        ? require(xx)
        : {uri: `file:///android_asset/webPage/${fileName}.html`};
    return flie;
  };
  renderContainer() {
    return <WebView source={this.loadFlie()} />;
  }
}
export default WebViewContent;
