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
import lang from '#/i18n';

class RemoteAccHomePage extends BasePage {
  constructor(props) {
    super(props);
    this.initHeader({
      title: lang.t('remoteAccount.title'),
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
              title: lang.t('remoteAccount.aoCard'),
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
            props: {
              val: lang.t('remoteAccount.or'),
            },
          },
          {
            itemType: TypeCard,
            key: 'isNoAoCard',
            props: {
              title: lang.t('remoteAccount.chinaCard'),
              subTitle: lang.t('remoteAccount.subChinaCard'),
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
              val: lang.t('remoteAccount.gt18Text'),
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
      Toast.info(lang.t('remoteAccount.noSelectCardTip'));
    }
    if (!this.state.isGt18) {
      Toast.info(lang.t('remoteAccount.noGt18Tip'));
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
});

export default RemoteAccHomePage;
