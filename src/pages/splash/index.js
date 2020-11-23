import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BasePage from '../BasePage';

class SplashPage extends BasePage {
  didMount() {
    setTimeout(() => {
      this.navigation.replace('Tabs');
    }, 5000);
  }

  renderContainer() {
    return (
      <View style={styles.container}>
        <Text>Splash Page</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SplashPage;
