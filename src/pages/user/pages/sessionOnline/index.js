// 退出时间设置
import { ScrollView } from 'react-native'
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';

const sessionOnline = props => {
  // 设置退出时间
  const loadLoginLog = async () => {
    await HTTP.api({
      url: apiPaths.SETTINGINFO,
      method: 'POST',
      data: {
        ActionMethod: 'update',
        deviceId: 'xxxx',
        loginId: 'xxxx',
        cif: '',
        fingerPrintUpdDt: '',
        fingerPrintFlag: '',
        faceAuthUpdDt: '',
        faceAuthFlag: '',
        softTokenUpdDt: '',
        softTokenFlag: '',
        sessionOnlineTime: 5,
        status: 0,
        setUpType: 2,
        checkType: 'N'
      }
    })
  }
  return (
    <ScrollView></ScrollView>
  )
}

export default sessionOnline