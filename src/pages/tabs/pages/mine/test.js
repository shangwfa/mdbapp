import * as React from 'react';
import {StyleSheet, Button, NativeModules, ScrollView} from 'react-native';
import BasePage from '../../../BasePage';
import {List} from '@ant-design/react-native';

// 清空緩存
// AsyncStorage.clear()
const Item = List.item;
class MinePage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      listData: this.initListData(),
    };
    this.initHeader({
      title: '我的',
    });
  }

  initListData() {
    return [å
      {
        name: '安全設置',
        onPress: () => {},
      },
      {
        name: '個人設置',
        onPress: () => {},
      },
      {
        name: '交易限額',
        onPress: () => {},
      },
      {
        name: '電子結單/通知書',
        onPress: () => {},
      },
      {
        name: '借記卡',
        onPress: () => {},
      },
      {
        name: '語言',
        onPress: () => {},
      },
      {
        name: '登入方式',
        onPress: () => {},
      },
      {
        name: '信任設備',
        onPress: () => {},
      },
      {
        name: '客戶分類',
        onPress: () => {},
      },
      {
        name: '風險問卷',
        onPress: () => {},
      },
      {
        name: '清空緩存',
        onPress: () => {},
      },
      {
        name: '關於我們',
        onPress: () => {},
      },
      {
        name: '版本',
        value: '1.03',
        onPress: () => {},
      },
    ];
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
      <ScrollView style={styles.container}>
        <Button title="动画" onPress={this.toToggle} />
        <Button title="OCR" onPress={this.toTakeImagePicker} />
        <Button title="活体" onPress={this.toPressFaceLiveness} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
});

export default MinePage;
