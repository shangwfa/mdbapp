import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import theme from './styles';

function IsSelectPart(props) {
  const {styles, onPress, isGt18, val} = props;
  return (
    <TouchableOpacity onPress={() => onPress(isGt18)}>
      <View style={styles.container}>
        <View style={styles.no_select} />
        <Text style={styles.text}>{val}</Text>
      </View>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => {
  return {styles: theme[state.G.theme]};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(IsSelectPart);
