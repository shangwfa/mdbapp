import * as React from 'react';
import {
  StatusBar,
  StyleSheet,
  DeviceEventEmitter,
  BackHandler,
} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import Header from '../components/base/Header';
class BasePage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.params = this.props.route.params;
    this.navigation = this.props.navigation;
  }

  initStatusBar(statusBar) {
    this.statusBar = statusBar || {
      barStyle: 'dark-content',
    };
  }
  initHeader(header) {
    this.header = header;
  }

  renderStatusBar() {
    return <StatusBar {...this.statusBar} />;
  }
  renderHeader = () => {
    if (this.header) {
      return <Header {...this.header} />;
    }
  };

  modal = () => {
    if (this.renderModal) {
      return this.renderModal();
    }
  };

  /**注册页面事件 */
  registerPageEvent = () => {
    this.emitterListener = DeviceEventEmitter.addListener(
      this.props.route.name,
      (event) => {
        console.log(`接收事件页面:${this.props.route.name}`);
        console.log(`事件参数:${JSON.stringify(event)}`);
      },
    );
  };
  /**注册Android 物理回退按键 */
  registerBackHandlerEvent = () => {
    this.backListener = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (this.hardwareBack) {
          this.hardwareBack();
          return true;
        } else {
          return false;
        }
      },
    );
  };

  componentDidMount() {
    this.registerPageEvent();
    this.registerBackHandlerEvent();
    this.didMount && this.didMount();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        {this.renderStatusBar()}
        {this.renderHeader()}
        {this.renderContainer()}
        {this.modal()}
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
});
export default BasePage;
