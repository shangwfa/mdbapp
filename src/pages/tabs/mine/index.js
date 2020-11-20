import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BasePage from '../../BasePage';

class MinePage extends BasePage {
  renderContainer() {
    return (
      <View style={styles.container}>
        <Text>Mine Page</Text>
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

export default MinePage;
