import * as React from 'react';
import {connect} from 'react-redux';
import {View, Text, TextInput} from 'react-native';
import theme from './styles';

function VerifyCodeInput(props) {
  const {styles, inputSize = 6, toVerifyCode} = props;
  const [textString, setTextString] = React.useState('');

  const renderText = () => {
    let inputs = [];
    for (let i = 0; i < inputSize; i++) {
      inputs.push(
        <View style={styles.box}>
          <Text
            style={[
              styles.text,
              textString.length === i ? styles.focusText : null,
            ]}
            key={i}>
            {textString[i]}
          </Text>
        </View>,
      );
    }

    return inputs;
  };

  const onChangeText = (text) => {
    setTextString(text);
    text.length === 6 && toVerifyCode(text);
  };
  return (
    <View style={styles.container}>
      <View style={styles.boxs}>{renderText()}</View>
      <TextInput
        style={styles.inputItem}
        onChangeText={onChangeText}
        underlineColorAndroid="transparent"
        maxLength={inputSize}
        autoFocus={true}
        keyboardType="numeric"
        selectionColor="transparent"
      />
    </View>
  );
}

const mapStateToProps = (state) => {
  return {styles: theme[state.G.theme]};
};
const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyCodeInput);
