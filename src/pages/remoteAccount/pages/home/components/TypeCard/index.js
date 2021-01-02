import * as React from 'react';
import {connect} from 'react-redux';
import {View, Image, Text, TouchableOpacity} from 'react-native';
import theme from './styles';
const aoIcon = require('./img/ao_icon.png');
const noAoIcon = require('./img/no_ao_icon.png');

function TypeCard(props) {
  const {
    styles,
    title,
    subTitle,
    itemStyle,
    isAoIcon,
    isSelect,
    onPress,
  } = props;
  return (
    <TouchableOpacity onPress={() => onPress(isSelect)}>
      <View style={[styles.container, itemStyle]}>
        <Image style={styles.icon} source={isAoIcon ? aoIcon : noAoIcon} />
        <View>
          <Text style={styles.text}>{title}</Text>
          {subTitle && (
            <Text style={[styles.text, {marginTop: 3}]}>{subTitle}</Text>
          )}
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(TypeCard);
