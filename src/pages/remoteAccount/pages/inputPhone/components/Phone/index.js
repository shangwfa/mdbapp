import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {InputItem} from '@ant-design/react-native';
import theme from './styles';

function Phone(props) {
  const [phone, setPhone] = React.useState('');
  const {styles, onChange, placeholderTextColor, phonePrefix} = props;
  return (
    <View style={styles.container}>
      <InputItem
        last
        type="phone"
        placeholder="请输入手机号"
        value={phone}
        style={styles.inputItem}
        placeholderTextColor={placeholderTextColor}
        onChange={(value) => {
          setPhone(value);
          onChange(value);
        }}>
        <TouchableOpacity style={{flexDirection: 'row'}}>
          <Text style={styles.prefixText}>{phonePrefix}</Text>
          <Image style={styles.arrow} />
        </TouchableOpacity>
      </InputItem>
      <View style={styles.line} />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    styles: theme[state.G.theme],
    placeholderTextColor: state.G.theme === 'light' ? '#aaa' : '#aaa',
  };
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Phone);
