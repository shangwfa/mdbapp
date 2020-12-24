import * as React from 'react';
import {StyleSheet, ScrollView, View, Button} from 'react-native';
import BasePage from '#/pages/BasePage';
import RenderStaticPage from '#/components/render/RenderStaticPage';
import {WhiteSpace} from '@ant-design/react-native';
import ComA from './components/ComA';
import ComB from './components/ComB';
import ComC from './components/ComC';
import ComD from './components/ComD';
import ComE from './components/ComE';

class RenderPage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '我的',
    });
    this.state = {
      pageDes: {
        container: ScrollView,
        props: {
          showsVerticalScrollIndicator: false,
          style: styles.container,
        },
        children: [
          {
            itemType: ComA,
            props: {
              name: 'comA',
              key: 'comA',
            },
          },
          {
            itemType: ComB,
            props: {
              title: 'comB',
              key: 'comB',
            },
          },
          {
            itemType: ComC,
            props: {
              subTitle: 'comC',
              key: 'comC',
              style: {
                container: styles.comC,
              },
            },
          },
          {
            itemType: ComD,
            props: {
              des: 'comD',
              key: 'comD',
            },
          },
          {
            itemType: ComE,
            props: {
              content: 'comE',
              key: 'comE',
            },
          },
          {
            itemType: this.renderBtn,
            props: {
              title: '改变视图',
              key: '改变视图',
              onPress: this.toChangeView,
            },
          },
        ],
      },
    };
  }
  toChangeView = () => {
    this.setState({
      pageDes: {
        ...this.state.pageDes,
        children: this.state.pageDes.children.slice(2),
      },
    });
  };
  renderBtn = (props) => {
    return (
      <View style={{justifyContent: 'center'}}>
        <WhiteSpace size="sm" />
        <Button
          style={styles.btn}
          title={props.title}
          onPress={props.onPress}
        />
      </View>
    );
  };

  renderContainer() {
    return <RenderStaticPage pageDes={this.state.pageDes} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  comC: {
    backgroundColor: '#f5f5dc',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default RenderPage;
