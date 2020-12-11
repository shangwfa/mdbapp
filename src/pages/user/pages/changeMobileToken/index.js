// 信任此设备 EToken
import {ScrollView} from 'react-native';
import HTTP from '../../../../api';
import apiPaths from '../../../../api/path';
import BasePage from '../../../BasePage';

class ChangeMobileToken extends BasePage {
  didMount() {}
  closeMobileTokenInfo = async () => {
    await HTTP.api({
      url: apiPaths.MOBILETOKENINFO,
      method: 'POST',
      data: {
        ActionMethod: 'unbind',
      },
    });
  };

  renderContainer() {
    return <ScrollView></ScrollView>;
  }
}

export default ChangeMobileToken;
