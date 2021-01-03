import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import theme from './styles';

function OrPart(props) {
  const {styles, val} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{val}</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {styles: theme[state.G.theme]};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrPart);
