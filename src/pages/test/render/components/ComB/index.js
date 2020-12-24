import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export default (props) => {
  return (
    <View style={styles.comB}>
      <Text>{props.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comB: {
    backgroundColor: '#faebd7',
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
