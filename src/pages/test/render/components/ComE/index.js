import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export default (props) => {
  return (
    <View style={styles.comE}>
      <Text>{props.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comE: {
    backgroundColor: '#8fbc8f',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
