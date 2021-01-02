import * as React from 'react';
import {connect} from 'react-redux';
import {Image, TouchableOpacity, View} from 'react-native';
import theme from './styles';

const image = require('./img/submit_btn.png');

function TopPart(props) {
  const {styles, onPress} = props;
  console.log(styles);

  return (
    <TouchableOpacity onPress={onPress}>
      <Image source={image} style={styles.icon} />
    </TouchableOpacity>
  );
}

const mapStateToProps = (state) => {
  return {styles: theme[state.G.theme]};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopPart);
