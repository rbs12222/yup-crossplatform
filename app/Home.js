import React, { Component } from 'react';
import { View, Text, Dimensions, Modal, Image, PixelRatio, Platform } from 'react-native';

import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';

import Config from './Config';
import NavigationStore from './data/NavigationStore';
import NavigationBar from 'react-native-navbar';
import { observer } from 'mobx-react';

import TaskListView from './task/TaskListView';
import NoteListView from './note/NoteListView';

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

@observer
export default class Home extends Component {

  static navigationOptions = () => (
    {
      header: null,
    }
  );

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Todo' },
        { key: 'second', title: 'Notes' },
      ],
    };
    this.navigation = this.props.navigation;
    this.titleConfig = {
      title: 'Yup!',
      tintColor: '#299176',
    };

    const height = Platform.OS === 'ios' ? 35 : 40;
    const width = 167 / 90 * height;
    const marginTop = Platform.OS === 'ios' ? 5: 7.5;

    this.titleConfig = 
      <Image source={require('./logo-02.png')} style={{ height, width, top: marginTop}} />
  }

  componentDidMount() {
    Config.init();
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} style={{ backgroundColor: 'white' }} labelStyle={{ color: 'black' }} />;

  _renderScene = SceneMap({
    first: () => (
      <TaskListView
        onAdd={() => {
          // alert('hi');
          // alert(this.navigation);
          this.navigation.navigate('TaskAdd');
        }}
        onEdit={() => {
          // alert('hi');
          this.navigation.navigate('TaskEdit');
        }}
      />),
    second: () => (
      <NoteListView
        onAdd={() => {
          // alert('hi');
          this.navigation.navigate('NoteAdd');
        }}
        onEdit={() => {
          // alert('hi');
          this.navigation.navigate('NoteEdit');
        }}
      />),
  });

  renderTab = () => {
    const icon = (
      <Button
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 10
        }}
        onPress={() => {
          NavigationStore.sidebar.open();
        }}
      >
        <Icon name="menu"
              size={25}
              color="#299176" />
      </Button>);

    return (
      <View style={{ flex: 1 }} >
        <NavigationBar
          tintColor={'white'}
          title={this.titleConfig}
          // rightButton={this.rightButtonConfig}
          rightButton={icon}
        />
        <TabViewAnimated
          style={{ flex: 1 }}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleIndexChange}
          initialLayout={initialLayout}
        />
      </View>
    );
  }

  render() {
    return (
      <View style={{ flex: 1 }} >
        {this.renderTab()}
      </View>
    );
  }


}