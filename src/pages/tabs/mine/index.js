import * as React from 'react';
import {View, Text, StyleSheet, Button} from 'react-native';
import BasePage from '../../BasePage';
import {DotIndicator} from 'react-native-indicators';

class MinePage extends BasePage {
  constructor(props) {
    super(props);
    this.state = {
      animating: false,
    };
  }

  toToggle = () => {
    this.setState({animating: !this.state.animating});
  };
  renderContainer() {
    return (
      <View style={styles.container}>
        <Text>Mine Page</Text>
        <Button title="动画" onPress={this.toToggle} />
        <DotIndicator
          color="white"
          size={10}
          animating={this.state.animating}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default MinePage;
