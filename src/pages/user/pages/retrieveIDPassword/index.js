import React from 'react';
import {
  Button,
  View,
  NativeModules,
  Platform,
  ImageBackground,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
export const {width} = Dimensions.get('window');
import BasePage from '../../../BasePage';
class ResetTransPin extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '拍攝身份證正面',
    });
  }
  setStep = () => {
    console.log('下一步');
    const {navigation} = this.props;
    navigation.navigate('RetrieveVerifyCodeAndPassword', {
      title: '找回登錄ID及密碼',
    });
  };

  takePhotoPage(takePhotoType) {
    let optionsTemp;
    // let language = this.props.language;
    if (takePhotoType === 'Positive') {
      optionsTemp = {
        titleTips1: ' language.forgetPwd.fg_label_title_tips1',
        titleTips2: ' language.forgetPwd.fg_label_title_tips2',
        title: ' language.forgetPwd.fg_label_title',
        cancelButtonTitle: ' language.forgetPwd.fg_label_titleButtonCancel',
        takePhotoButtonTitle:
          ' language.forgetPwd.fg_label_takePhotoButtonTitle',
        chooseFromLibraryButtonTitle:
          'language.forgetPwd.fg_label_chooseFromLibraryButtonTitle',
        reTakePhotoButtonTitle:
          ' language.forgetPwd.fg_label_titleButtonRetake',
      };
    }

    if (Platform.OS === 'android') {
      NativeModules.ETImagePickerModule.takeImagePicker(optionsTemp)
        .then((result) => {
          console.log(
            '------------------takeImagePicker-----------------------',
          );
          console.log(result);
          let source = {uri: 'data:image/jpeg;base64,' + result.data}; //console.log(source);
          if (takePhotoType === 'Positive') {
            this.setState({selectPathFront: source});
            this.setState({imageFontBase64: result.data});
          } else {
            this.setState({selectPathBack: source});
            this.setState({imageBackBase64: result.data});
          }
          console.log(
            '------------------takeImagePicker-----------------------',
          );
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    } else {
      //IOS
      NativeModules.ETImagePickerModule.takeImagePicker(optionsTemp)
        .then((result) => {
          console.log(
            '------------------takeImagePicker IOS-----------------------',
          );
          console.log(result);
          let source = {uri: 'data:image/jpeg;base64,' + result.data}; //console.log(source);
          if (result.didCancel !== true) {
            if (takePhotoType === 'Positive') {
              this.setState({selectPathFront: source});
              this.setState({imageFontBase64: result.data});
            } else {
              this.setState({selectPathBack: source});
              this.setState({imageBackBase64: result.data});
            }
          }
          console.log(
            '------------------takeImagePicker IOS-----------------------',
          );
        })
        .catch(function (error) {
          console.log(
            'There has been a problem with your fetch operation: ' +
              error.message,
          );
        });
    }
  }

  renderContainer() {
    return (
      <View style={styles.wrapper}>
        <ImageBackground
          style={styles.ETOLIDCardImageBackground}
          source={require('../../../../assets/img_IdCardFornt_Bg1.png')}
          resizeMode="stretch">
          <TouchableOpacity
            style={styles.ETOLIDCardCircleBox}
            onPress={() => {
              this.takePhotoPage('Positive');
            }}
            activeOpacity={1}>
            <Image
              style={styles.ETOLIDCardFrontImage}
              source={require('../../../../assets/img_IdCard_camera.png')}
              resizeMode="stretch"
            />
          </TouchableOpacity>
        </ImageBackground>
        <Button onPress={this.takePhotoPage} title="下一步" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
  },
  ETOLIDCardImageBackground: {
    width: width * 0.78,
    height: width * 0.52,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ETOLIDCardCircleBox: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.09,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(151,151,151,0.5)',
  },
  ETOLIDCardFrontImage: {
    width: width * 0.09,
    height: width * 0.07,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default ResetTransPin;
