import React from 'react';
import {View, Text, Button, StyleSheet} from 'react-native';
export default () => {
  return (
    <View style={styles.container}>
      <View style={styles.box1} />
      <View style={styles.box2} />
      <Text style={styles.text}>slfjslfj</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'azure',
    paddingTop: 50,
    alignContent: 'flex-end',
  },
  box1: {
    width: 100,
    height: 100,
    backgroundColor: 'aquamarine',
    backfaceVisibility: 'hidden',
    opacity: 0.1,
  },
  box2: {
    width: 200,
    height: 200,
    backgroundColor: 'aqua',
  },
  text: {
    width: 100,
    textAlign: 'center',
    textShadowColor: 'blue',
    textShadowOffset: {width: 10, height: 10},
    textShadowRadius: 5,
    textTransform: 'uppercase',
  },
});
