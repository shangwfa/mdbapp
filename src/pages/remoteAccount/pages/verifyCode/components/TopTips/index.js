import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text} from 'react-native';
import theme from './styles';

function TopTips(props) {
  const {styles, title, subTitle} = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subTitle}>{subTitle}</Text>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {styles: theme[state.G.theme]};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopTips);
