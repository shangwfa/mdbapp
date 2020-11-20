import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function LoginPage({route, navigation}) {
  console.log(route.params);
  return (
    <View style={styles.container}>
      <Text>Login Page</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LoginPage;
