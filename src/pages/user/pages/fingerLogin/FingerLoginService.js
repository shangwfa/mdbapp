/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-10 16:36:19
 * @Description: file content
 */
import TouchID from 'react-native-touch-id';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {Alert} from 'react-native';

/**
 * android 手机
 * ios 手机的指纹识别
 */
export default class FingerLoginService {
  isSupported() {
    const optionalConfigObject = {
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
    };

    TouchID.isSupported(optionalConfigObject)
      .then((biometryType) => {
        console.log('biometryType: ', biometryType);
        // Success code
        if (biometryType === 'FaceID') {
          console.log('FaceID is supported.');
        } else if (biometryType === 'TouchID') {
          console.log('TouchID is supported.');
        } else if (biometryType === true) {
          // Touch ID is supported on Android
        }
      })
      .catch((error) => {
        //如果用户的设备未启用touchID或faceID，则为失败代码
        console.log('isSupported:', error);
      });
  }
  authenticate() {
    const optionalConfigObject = {
      title: 'Authentication Required', // Android
      imageColor: '#e00606', // Android
      imageErrorColor: '#ff0000', // Android
      sensorDescription: 'Touch sensor', // Android
      sensorErrorDescription: 'Failed', // Android
      cancelText: 'Cancel', // Android
      fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
      unifiedErrors: false, // use unified error messages (default false)
      passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
    };
    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then((success) => {
        console.log('success: ', success);
        // Success code
        Alert.alert('Authenticated Successfully');
      })
      .catch((error) => {
        console.log('error: ', error);
        Alert.alert('指纹识别未开启或者您的手机不支持指纹识别');
        // Failure code
      });
  }
}
