// 信任此设备 EToken
import { ScrollView } from 'react-native'
import HTTP from '../../../../../api';
import apiPaths from '../../../../../api/path';

const changeMoblieToken = props => {
  // 解除Token绑定
  const closeMobileTokenInfo = async () => {
    await HTTP.api({
      url: apiPaths.MOBILETOKENINFO,
      method: 'POST',
      data: {
        ActionMethod: 'unbind'
      }
    })
  }
  return (
    <ScrollView></ScrollView>
  )
}

export default changeMoblieToken