/*
 * @Author: deng.wulin@mdb-fintech.com
 * @Date: 2020-12-16 09:51:49
 * @Description: file content
 */
// 退出登录
import {ScrollView} from 'react-native';
import HTTP from '#/api';
import apiPaths from '#/api/path';
import {connect} from 'react-redux';
import * as actions from '../../redux/action';

const Logout = (props) => {
  // 退出登录接口
  const logoutHandle = async () => {
    const {setLogout} = this.props;
    await HTTP.api({
      url: apiPaths.LOGOUT,
      method: 'POST',
      data: {
        ActionMethod: 'logout',
      },
    });
    // 成功之后设置 redux 中的 action
    setLogout(false);
  };

  return <ScrollView></ScrollView>;
};

const mapStateToProps = (state) => {};
const mapDispathchToProps = (dispatch) => ({
  setLogout: (isLogin) => dispatch(actions.setIsLoggedIn(isLogin)),
});

export default connect(mapStateToProps, mapDispathchToProps)(Logout);
