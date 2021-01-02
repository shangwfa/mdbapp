import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text, Image, TouchableWithoutFeedback} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import theme from './styles';
const deepArrow = require('./img/deep_header_left_arrow.png');
const lightArrow = require('./img/header_left_arrow.png');

const LeftPart = (props) => {
  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        navigation.goBack();
      }}>
      <Image
        style={props.style}
        source={props.theme === 'light' ? lightArrow : deepArrow}
        onPress={() => {
          navigation.goBack();
        }}
      />
    </TouchableWithoutFeedback>
  );
};

function Header(props) {
  const {styles, isHideLeft} = props;

  return (
    <View style={styles.container}>
      {isHideLeft ? (
        <View />
      ) : (
        <LeftPart style={styles.leftPart} theme={props.theme} />
      )}
      <Text style={styles.midPart}>{props.title}</Text>
      <Text style={styles.rightPart} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {styles: theme[state.G.theme], theme: state.G.theme};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
