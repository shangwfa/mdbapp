/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-10 15:18:08
 * @Description:用户信息页面
 */
import React, {Component} from 'react';
import {Text, StyleSheet, View} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../../redux/action';
import {Button, List, WhiteSpace} from '@ant-design/react-native';

import UserProfileService from './UserProfileService';
import {SMS_FUNC_TYPE} from './UserProfileService';

class userProfilePage extends Component {
  constructor(props) {
    super(props);

    this.setState({
      profile: {},
      profileForm: {
        email: '',
        fax: '',
        otp: '',
        phone: '',
        smsFlowNo: '',
      },
      addressForm: {
        newRemittanceAddress: '',
        otp: '',
        smsFlowNo: '',
      },
    });

    this.userProfileService = new UserProfileService();
  }

  componentDidMount() {
    this.userProfileService.getUserProfile().then((res) => {
      console.log('componentDidMount', res);
      this.setState({profile: res});
    });
  }

  render() {
    return (
      <View>
        <Text> 用户信息 </Text>

        <Button
          onPress={() => {
            console.log('onPress: ', 'hello world');
            this.userProfileService.getUserProfile().then((res) => {
              console.log('res: ', res);
            });
          }}
          style={styles.btns}>
          获取用户信息
        </Button>

        <Button
          style={styles.btns}
          onPress={() => {
            this.userProfileService.sendSMS(SMS_FUNC_TYPE.ChangePerAction);
          }}>
          {' '}
          step 1:发送修改用户信息短信
        </Button>

        <Button
          style={styles.btns}
          onPress={() => {
            this.userProfileService.updateProfile(this.state.profileForm);
          }}>
          {' '}
          step 2:修改用户信息
        </Button>

        <Button
          style={styles.btns}
          onPress={() => {
            this.userProfileService.sendSMS(SMS_FUNC_TYPE.ChangeAddressAction);
          }}>
          {' '}
          step 1:发送修改用户地址短信
        </Button>
        <Button
          style={styles.btns}
          onPress={() => {
            this.userProfileService.updateAddress(this.state.addressForm);
          }}>
          {' '}
          step 2:修改用户地址
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  btns: {
    marginBottom: 16,
  },
});

// const mapStateToProps = (state) => ({
//   isLogin: state.user.isLogin,
// });

// const mapDispatchToProps = (dispatch) => ({});

export default userProfilePage;
