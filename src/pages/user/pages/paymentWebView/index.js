import React from 'react';
import {View, Text} from 'react-native';
import {Checkbox, WhiteSpace} from '@ant-design/react-native';
import {WebView} from 'react-native-webview';
import BasePage from '#/pages/BasePage';
const AgreeItem = Checkbox.AgreeItem;
class Index extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '服務條款說明',
    });
    this.state = {
      isChecked: false,
    };
  }
  renderContainer() {
    const {navigation} = this.props;
    return (
      <View>
        <Text>
          《澳門發展銀行股份有限公司快捷支付服務協議》（以下簡稱“本協議”）是澳門發展銀行股份有限公司（以下簡稱“本行”）與本行個人賬戶持有人（以下簡稱“閣下”）就快捷支付服務（以下簡稱“本服務”）的使用及辦理等相關事項所訂立的有效合約。
          閣下一旦通過互聯網（Internet）、應用程式或其他電子渠道點擊確認或以接受短訊驗證碼方式選擇接受本協議，即表示閣下同意接受本協議的全部條款，由此產生的相關責任均由閣下承擔。如果閣下不同意本協議的任何內容，或者無法準確理解相關條款的解釋，請不要進行後續操作。
        </Text>
        <WhiteSpace />
        <AgreeItem
          checked={this.state.isChecked}
          onChange={() => {
            this.setState({isChecked: !this.state.isChecked});
          }}>
          我已經閲讀所有服務條款，同意並且遵循所有內容
        </AgreeItem>
      </View>
    );
  }
}
export default Index;
