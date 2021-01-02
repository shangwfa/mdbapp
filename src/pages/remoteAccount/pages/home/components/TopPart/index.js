import * as React from 'react';
import {connect} from 'react-redux';
import {Text, View, Image} from 'react-native';
import theme from './styles';

const image = require('./img/open_acc_tips.png');

function TopPart(props) {
  const {styles} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>開戶小貼士</Text>
      <Text style={styles.tips}>本服務支持持有以下證件的客戶辦理</Text>
      <Image style={styles.icon} source={image} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {styles: theme[state.G.theme]};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(TopPart);
