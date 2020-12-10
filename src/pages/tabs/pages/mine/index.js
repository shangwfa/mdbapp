import * as React from 'react';
import {View, Text, StyleSheet, Button, NativeModules, AsyncStorage} from 'react-native';
import BasePage from '../../../BasePage';
import {DotIndicator} from 'react-native-indicators';

// 清空緩存
// AsyncStorage.clear()

class MinePage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
  }

  toToggle = () => {
    this.setState({animating: !this.state.animating});
  };
  toTakeImagePicker = () => {
    NativeModules.ETImagePickerModule.takeImagePicker({
      titleTips1: '拍攝身份證正面',
      titleTips2: '請把證件置於方框内',
      title: '请选择图片来源',
      cancelButtonTitle: '取消',
      takePhotoButtonTitle: '拍照',
      chooseFromLibraryButtonTitle: '相册图片',
      reTakePhotoButtonTitle: '重拍',
    })
      .then((result) => {
        //成功回调
        //return result;
        console.log('------------------takeImagePicker-----------------------');
        console.log(result);
        let source = {uri: 'data:image/jpeg;base64,' + result.data}; //console.log(source);
        console.log('xxxx', source);
        console.log('------------------takeImagePicker-----------------------');
      })
      .catch(function (error) {
        //失败回调
        console.log(
          'There has been a problem with your fetch operation: ' +
            error.message,
        );
      });
  };

  toPressFaceLiveness = () => {
    NativeModules.ETFaceIDlivenessModule.onPressFaceLiveness({
      langCode: 'cn',
    })
      .then((result) => {
        let resultDa = JSON.parse(result);
        console.log(resultDa);
      })
      .catch(function (error) {
        console.log(
          'There has been a problem with your fetch operation: ' + error,
        );
      });
  };
  renderContainer() {
    return (
      <View style={styles.container}>
        <Text>Mine Page</Text>
        <Button title="动画" onPress={this.toToggle} />
        <Button title="OCR" onPress={this.toTakeImagePicker} />
        <Button title="活体" onPress={this.toPressFaceLiveness} />
        <DotIndicator
          color="white"
          size={10}
          animating={this.state.animating}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MinePage;
