//交易限額組件
import {View, Text} from 'react-native';
import React from 'react';

class LimitItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const {item} = this.props;
    return (
      <View>
        <Text>{item.title}</Text>
        <Text>單筆限額:{item.single_transaction_limit}</Text>
        <Text>日累計限額:{item.daily_cumulative_limit}</Text>
      </View>
    );
  }
}

export default LimitItem;
