import * as React from 'react';
import {Provider as ANTDProvider} from '@ant-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Orientation from 'react-native-orientation';
import {Provider} from 'react-redux';
import Router from './router';
import store from './redux';

export default class APP extends React.Component {
  componentDidMount() {
    SplashScreen.hide();
    Orientation.lockToPortrait();
  }
  render() {
    return (
      <SafeAreaProvider>
        <ANTDProvider>
          <Provider store={store}>
            <Router />
          </Provider>
        </ANTDProvider>
      </SafeAreaProvider>
    );
  }
}
