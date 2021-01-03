import * as React from 'react';
import {connect} from 'react-redux';
import {Text, View, Image} from 'react-native';
import theme from './styles';
import lang from '#/i18n';

const image = require('./img/open_acc_tips.png');

function TopPart(props) {
  const {styles} = props;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{lang.t('remoteAccount.opAccTip')}</Text>
      <Text style={styles.tips}>{lang.t('remoteAccount.supportCardsTip')}</Text>
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
