import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Drawer from 'react-native-drawer'

import { TabViewAnimated, TabBar, SceneMap } from 'react-native-tab-view';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';

import NavigationBar from 'react-native-navbar';
import NavigationStore from './data/NavigationStore';
import { observer } from 'mobx-react';

import TaskAddView from './task/TaskAddView';
import TaskEditView from './task/TaskEditView';
import TaskListView from './task/TaskListView';

import NoteAddView from './note/NoteAddView';
import NoteEditView from './note/NoteEditView';
import NoteListView from './note/NoteListView';

const { width, height } = Dimensions.get('window');

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = () => (
  <TaskListView
    onAdd={() => {
      // alert('hi');
      NavigationStore.showTaskAdd();
    }}
    onEdit={() => {
      // alert('hi');
      NavigationStore.showTaskEdit();
    }}
    onMenu={() => {
      // NavigationStore.showTaskEdit();
      // this.forceUpdate();
      this._drawer.open();
    }}
  />);
const SecondRoute = () => (
  <NoteListView
    onAdd={() => {
      // alert('hi');
      NavigationStore.showNoteAdd();
    }}
    onEdit={() => {
      // alert('hi');
      NavigationStore.showNoteEdit();
    }}
    onMenu={() => {
      // NavigationStore.showTaskEdit();
      // this.forceUpdate();
      this._drawer.open();
    }}
  />);

@observer
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Todo' },
        { key: 'second', title: 'Notes' },
      ],
    };

    this.titleConfig = {
      title: 'Yup!',
      tintColor: '#299176',
    };
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} style={{ backgroundColor: 'white'}} labelStyle={{ color: 'black' }} />;

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  renderAdd = () => {
    if (NavigationStore.ShowTaskAdd) {
      return (
        <TaskAddView onBack={() => {
          // alert('hi');
          NavigationStore.showTaskList();
          this.forceUpdate();
        }}
        />)
    }

    if (NavigationStore.ShowNoteAdd) {
      return (
        <NoteAddView onBack={() => {
          // alert('hi');
          NavigationStore.showNoteList();
          this.forceUpdate();
        }}
        />)
    }

    return null;
  }

  renderEdit = () => {
    if (NavigationStore.ShowTaskEdit) {
      return (
        <TaskEditView onBack={() => {
          // alert('hi');
          NavigationStore.showTaskList();
          this.forceUpdate();
        }}
        />)
    }

    if (NavigationStore.ShowNoteEdit) {
      return (
        <NoteEditView onBack={() => {
          // alert('hi');
          NavigationStore.showNoteList();
          this.forceUpdate();
        }}
        />)
    }
    return null;
  }

  renderSidebar = () => {
    return (
      <View style={{ flex: 1, paddingTop: 50, backgroundColor: '#219176' }} >

        <View>

          <Icon.Button name="list" backgroundColor="transparent" onPress={() => {
          }} >
            To-do list
          </Icon.Button>
        </View>
        <View>

          <Icon.Button name="settings" backgroundColor="transparent" onPress={() => {
          }} >
            Settings
          </Icon.Button>
        </View>
        <View>

          <Icon.Button name="help" backgroundColor="transparent" onPress={() => {
          }} >
            About
          </Icon.Button>
        </View>

      </View>
    )
  }

  renderTab = () => {
    const icon = (
      <Button
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingRight: 10
        }}
        onPress={this.props.onMenu}
      >
        <Icon name="menu"
              size={25}
              color="#299176" />
      </Button>);

    if (NavigationStore.ShowTaskList || NavigationStore.ShowNoteList) {
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

    return null;
  }

  render() {

    NavigationStore.ShowTaskAdd;
    NavigationStore.ShowTaskEdit;
    NavigationStore.ShowTaskList;

    return (
      <Drawer
        ref={(ref) => this._drawer = ref}
        content={this.renderSidebar()}
        openDrawerOffset={width / 2}
        tapToClose
        side={'right'}
      >
        <View style={{ flex: 1 }} >
          {this.renderAdd()}
          {this.renderEdit()}
          {this.renderTab()}
        </View>
      </Drawer>
    );

  }


}