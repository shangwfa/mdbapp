import * as React from 'react';
import {View, Text} from 'react-native';
export default (props) => {
  return (
    <View style={props.style.container}>
      <Text>{props.subTitle}</Text>
    </View>
  );
};
