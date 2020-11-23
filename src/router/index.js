import * as React from 'react';
import {NavigationContainer, StackRouter} from '@react-navigation/native';
import {
  createStackNavigator,
  CardStyleInterpolators,
} from '@react-navigation/stack';
import routes from './routes';
import {navigationRef, isReadyRef} from './rootNavigation';

const Stack = createStackNavigator();

function Router() {
  const routeNameRef = React.useRef();

  const onStateChange = () => {
    const previousRouteName = routeNameRef.current;
    const currentRouteName = navigationRef.current.getCurrentRoute().name;
    console.log(`从页面 ${previousRouteName} 跳转到 ${currentRouteName}`);
    const params = navigationRef.current.getCurrentRoute().params;
    console.log(`当前页面接收参数${JSON.stringify(params ? params : {})}`);
    routeNameRef.current = currentRouteName;
  };
  const onReady = () => {
    isReadyRef.current = true;
    routeNameRef.current = navigationRef.current.getCurrentRoute().name;
  };

  React.useEffect(() => {
    return () => {
      isReadyRef.current = false;
    };
  }, []);

  return (
    <NavigationContainer
      ref={navigationRef}
      onReady={onReady}
      onStateChange={onStateChange}>
      <Stack.Navigator
        initialRouteName="Splash"
        headerMode="none"
        screenOptions={{
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {routes.map((item) => (
          <Stack.Screen
            name={item.name}
            component={item.component}
            key={item.name}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Router;
