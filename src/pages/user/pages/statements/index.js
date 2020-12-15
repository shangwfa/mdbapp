import React from 'react';
// import {Platform} from 'react-native';
import {WebView} from 'react-native-webview';
import BasePage from '../../../BasePage';
class Statements extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: props.route.params.title || '',
    });
  }
  loadFlie = () => {
    // const fileName = 'ImportantStatementCN';
    // const flie =
    //   Platform.OS === 'android'
    //     ? require(`./webPage/${fileName}.html`)
    //     : {uri: `file:///android_asset/webPage/${fileName}.html`};
    const flie = {uri: 'https://www.baidu.com'};
    return flie;
  };
  renderContainer() {
    return <WebView source={this.loadFlie()} />;
  }
}
export default Statements;
