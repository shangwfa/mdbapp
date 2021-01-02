import * as React from 'react';
import {connect} from 'react-redux';
import {Text, TouchableOpacity} from 'react-native';
import theme from './styles';

function SubmitBtn(props) {
  const {styles, btnTx, onPress} = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{btnTx}</Text>
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => {
  return {styles: theme[state.G.theme]};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(SubmitBtn);
