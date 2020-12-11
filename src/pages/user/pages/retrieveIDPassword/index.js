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
import {Toast} from '@ant-design/react-native';
export const {width} = Dimensions.get('window');
import BasePage from '../../../BasePage';
class RetrieveIDPassword extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '拍攝身份證正面',
    });
    this.state = {
      selectPathFront: null,
    };
  }
  setStep = () => {
    if (this.state.selectPathFront === null) {
      return Toast.info('请拍攝身份證正面照片');
    }
    const {navigation} = this.props;
    navigation.navigate('RetrieveVerifyCodeAndPassword', {
      title: '找回登錄ID及密碼',
    });
  };

  takePhotoPage = async () => {
    const optionsTemp = {
      titleTips1: '拍攝身份證正面', //Shoot the front of ID card
      titleTips2: '請把證件置於方框内，保證清晰無反光', //Please put your ID card in the box, ensure the photo is clear and non-reflective
      title: '请选择图片来源', //Please select the source of picture
      cancelButtonTitle: '取消', //Cancel
      takePhotoButtonTitle: '拍照', //Photo
      chooseFromLibraryButtonTitle: '相册图片', //photos
      reTakePhotoButtonTitle: '重拍', //Remake
    };
    try {
      const result = await NativeModules.ETImagePickerModule.takeImagePicker(
        optionsTemp,
      );
      let source = {uri: 'data:image/jpeg;base64,' + result.data};
      if (Platform.OS === 'android') {
        this.setState({selectPathFront: source});
      } else {
        if (result.didCancel !== true) {
          this.setState({selectPathFront: source});
        }
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    }
  };

  renderContainer() {
    const {selectPathFront} = this.state;
    return (
      <View style={styles.wrapper}>
        {selectPathFront === null ? (
          <ImageBackground
            style={styles.ETOLIDCardImageBackground}
            source={require('../../../../assets/img_IdCardFornt_Bg1.png')}
            resizeMode="stretch">
            <TouchableOpacity
              style={styles.ETOLIDCardCircleBox}
              onPress={this.takePhotoPage}
              activeOpacity={1}>
              <Image
                style={styles.ETOLIDCardFrontImage}
                source={require('../../../../assets/img_IdCard_camera.png')}
                resizeMode="stretch"
              />
            </TouchableOpacity>
          </ImageBackground>
        ) : (
          <TouchableOpacity onPress={this.takePhotoPage} activeOpacity={1}>
            <Image
              style={styles.ETOLIDCardImageBackground}
              source={selectPathFront}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        )}

        <Button onPress={this.setStep} title="下一步" />
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
export default RetrieveIDPassword;
