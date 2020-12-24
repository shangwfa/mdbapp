import * as React from 'react';
import {StyleSheet, View, Text} from 'react-native';
export default (props) => {
  return (
    <View style={styles.comD}>
      <Text>{props.des}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  comD: {
    backgroundColor: '#deb887',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
