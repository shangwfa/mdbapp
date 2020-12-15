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
import HTTP from '../../../../api';
export const {width} = Dimensions.get('window');
import BasePage from '../../../BasePage';
class ShootIDCard extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '拍攝身份證正面',
    });
    this.state = {
      selectPathFront: null,
      imageFontBase64: null,
    };
  }

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
        this.setState({selectPathFront: source, imageFontBase64: result.data});
      } else {
        if (result.didCancel !== true) {
          this.setState({
            selectPathFront: source,
            imageFontBase64: result.data,
          });
        }
      }
    } catch (error) {
      console.log(
        'There has been a problem with your fetch operation: ' + error.message,
      );
    }
  };
  onConfirmNextPage = async () => {
    if (this.state.selectPathFront === null) {
      return Toast.info('请拍攝身份證正面照片');
    }
    const {navigation} = this.props;
    try {
      const res = await HTTP.api({
        url: 'forgetPassWord.do',
        method: 'POST',
        data: {
          langCode: 'CN', //CN、US、PT
          forgetStatus: '1', // <IDCardVerifyStart forgetStatus={checkedAfter ? '1':'0'}/>，原項目代碼中forgetStatus的值只會取1
          imageFontBase64: this.state.imageFontBase64,
        },
      });
      if (res.idCard_type === 'CD' || res.idCard_type === 'MT') {
        navigation.navigate('IDVerifyCode', {
          title: '找回登錄ID及密碼',
          ...res,
        });
      } else {
        // Toast.info(
        //   '抱歉！您的證件證件非澳門身份證或內地身份證，請重新人臉識別或親臨本行營業網點辦理',
        // );
        navigation.navigate('IDVerifyCode', {
          title: '找回登錄ID及密碼',
          ...res,
        });
      }
    } catch (error) {
      console.log('error');
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

        <Button onPress={this.onConfirmNextPage} title="下一步" />
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
export default ShootIDCard;
