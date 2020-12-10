// 登录历史
import { ScrollView } from 'react-native'
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';

const logs = props => {
  // 获取登录历史
  const loadLoginLog = async () => {
    await HTTP.api({
      url: apiPaths.LOGINLOGURL,
      method: 'POST',
      data: {
        ActionMethod: 'loadingLog',
        userId: 'xxxx',
        cif: 'xxxx'
      }
    })
  }
  return (
    <ScrollView></ScrollView>
  )
}

export default logs