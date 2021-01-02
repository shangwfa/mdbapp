import React from 'react';
import {View, Text, Button} from 'react-native';
import {connect} from 'react-redux';
import Actions from '../../../redux/actions';
import ActionTypes from '../../../redux/actionTypes';
const ThemePage = (props) => {
  console.log('xxx', props);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text>Home Page</Text>
      <Button title="切换主题" onPress={() => props.setTheme()} />
    </View>
  );
};

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return {
    setTheme: () => dispatch(Actions[ActionTypes.G_THEME]('deep')),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ThemePage);
