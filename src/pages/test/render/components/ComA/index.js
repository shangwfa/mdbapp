import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export default (props) => {
  return (
    <View style={styles.comA}>
      <Text>{props.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comA: {
    backgroundColor: '#f0f8ff',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
