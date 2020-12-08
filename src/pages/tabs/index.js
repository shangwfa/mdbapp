import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, BackHandler, ToastAndroid} from 'react-native';
import Home from './pages/home';
import Mine from './pages/mine';
const Tab = createBottomTabNavigator();

class Tabs extends React.Component {
  componentDidMount() {
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }

  componentWillUnmount() {
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', this.onBackAndroid);
    }
  }
  onBackAndroid = () => {
    if (this.props.navigation.isFocused()) {
      if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
        BackHandler.exitApp();
      } else {
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用', 1000);
        return true;
      }
    }
  };
  render() {
    return (
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Mine" component={Mine} />
      </Tab.Navigator>
    );
  }
}

export default Tabs;
