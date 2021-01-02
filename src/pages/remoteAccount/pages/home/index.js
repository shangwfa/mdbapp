import * as React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Toast} from '@ant-design/react-native';
import BasePage from '../../../BasePage';
import RenderStaticPage from '#/components/render/RenderStaticPage';
import TopPart from './components/TopPart';
import TypeCard from './components/TypeCard';
import OrPart from './components/OrPart';
import IsSelectPart from './components/IsSelectPart';
import SubmitBtn from './components/SubmitBtn';

class RemoteAccHomePage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: '远程开户',
    });
    this.state = {
      cardType: '',
      isGt18: false,
      pageDes: {
        container: ScrollView,
        props: {
          showsVerticalScrollIndicator: false,
          style: styles.container,
        },
        children: [
          {
            itemType: TopPart,
            key: 'opAccTip',
          },
          {
            itemType: TypeCard,
            key: 'isAoCard',
            props: {
              title: '澳門居民身份證',
              isAoIcon: true,
              isSelect: false,
              itemStyle: {
                marginTop: 20,
                marginBottom: 10,
              },
              onPress: this.setAoCard,
            },
          },
          {
            itemType: OrPart,
            key: 'line',
          },
          {
            itemType: TypeCard,
            key: 'isNoAoCard',
            props: {
              title: '中國居民身份證且持有澳門逗留證件',
              subTitle: '(外地雇員身份認識證)',
              isAoIcon: false,
              isSelect: false,
              itemStyle: {
                marginTop: 10,
              },
              onPress: this.setNoAoCard,
            },
          },
          {
            itemType: IsSelectPart,
            key: 'isGt18',
            props: {
              isGt18: false,
              onPress: this.toSetGt18,
            },
          },
          {
            itemType: SubmitBtn,
            key: 'submit',
            props: {
              onPress: this.toSubmit,
            },
          },
        ],
      },
    };
  }

  toSetItemProps = (key, props) => {
    this.setState({
      children: this.state.pageDes.children.map((item) => {
        if (item === key) {
          return {...item, prop: {...item.prop, props}};
        } else {
          return item;
        }
      }),
    });
  };

  setAoCard = (isSelect) => {
    this.setState({cardType: 'aoCard'});
    this.toSetItemProps('isAoCard', {isSelect: !isSelect});
  };
  setNoAoCard = (isSelect) => {
    this.setState({cardType: 'noAoCard'});
    this.toSetItemProps('isNoAoCard', {isSelect: !isSelect});
  };

  toSetGt18 = (isGt18) => {
    this.setState({isGt18: !isGt18});
    this.toSetItemProps('isGt18', {isGt18: !isGt18});
  };

  toSubmit = () => {
    if (this.state.cardType === '') {
      Toast.info('请选择证件类型');
    }
    if (!this.state.isGt18) {
      Toast.info('请确认已满18周岁且非美国人士');
    }
    this.navigation.navigate('RemoteAccInputPhonePage', {
      cardType: this.state.cardType,
      isGt18: this.state.isG,
    });
  };

  renderContainer() {
    return <RenderStaticPage pageDes={this.state.pageDes} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
  },
  xx: {
    marginTop: 30,
  },
});

export default RemoteAccHomePage;
