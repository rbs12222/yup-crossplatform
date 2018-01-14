import React, { Component } from 'react';
import { View, Text, Dimensions, Modal } from 'react-native';

import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';

import * as firebase from 'firebase';
import NavigationStore from './data/NavigationStore';
import NavigationBar from 'react-native-navbar';
import { observer } from 'mobx-react';

import TaskStore from './data/TaskStore';
import NoteStore from './data/NoteStore';

import TaskListView from './task/TaskListView';
import NoteListView from './note/NoteListView';

const { width, height } = Dimensions.get('window');

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const config = {
  apiKey: "AIzaSyAbpmdpCpt2qDGYaX9o2xHm8cC1UmbHPLQ",
  authDomain: "yotodo-277b4.firebaseapp.com",
  databaseURL: "https://yotodo-277b4.firebaseio.com",
  projectId: "yotodo-277b4",
  storageBucket: "yotodo-277b4.appspot.com",
  messagingSenderId: "956797187570"
};

// https://firebase.googleblog.com/2016/01/the-beginners-guide-to-react-native-and_84.html
const firebaseApp = firebase.initializeApp(config);


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
  }

  componentDidMount() {
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