import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from './home';
import Mine from './mine';
const Tab = createBottomTabNavigator();
function Tabs() {
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

export default Tabs;
