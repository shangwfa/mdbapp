// 退出登录
import { ScrollView } from 'react-native'
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';

const logout = props => {
  // 退出登录接口
  const logoutHandle = async () => {
    await HTTP.api({
      url: apiPaths.LOGOUT,
      method: 'POST',
      data: {
        ActionMethod: 'logout'
      }
    })
  }

  return (
    <ScrollView></ScrollView>
  )
}

export default logout