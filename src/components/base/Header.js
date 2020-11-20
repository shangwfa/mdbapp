import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';

function Header(props) {
  return (
    <View style={styles.container}>
      <Text>{props.title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    height: 45,
    justifyContent: 'center',
  },
});

export default Header;
