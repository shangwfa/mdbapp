// 登录历史
import { ScrollView } from 'react-native'
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';

const loginLogs = props => {
  // 查看登录历史
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

export default loginLogs