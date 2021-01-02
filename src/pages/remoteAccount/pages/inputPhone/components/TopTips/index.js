import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity} from 'react-native';
import theme from './styles';

function TopTips(props) {
  const {
    styles,
    title,
    protoTip,
    personalProto,
    toPersonalProto,
    and,
    declProto,
    todeclProto,
  } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.protoContainer}>
        <Text style={styles.protoTip}>{protoTip}</Text>
        <TouchableOpacity onPress={toPersonalProto}>
          <Text style={styles.personalProto}>{personalProto}</Text>
        </TouchableOpacity>
        <Text style={styles.protoTip}>{and}</Text>
        <TouchableOpacity onPress={todeclProto}>
          <Text style={styles.personalProto}>{declProto}</Text>
        </TouchableOpacity>
      </View>
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
