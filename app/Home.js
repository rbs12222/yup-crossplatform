import React, { Component } from 'react';
import { View, Text, Dimensions } from 'react-native';
import Drawer from 'react-native-drawer'

import Icon from 'react-native-vector-icons/MaterialIcons';

import NavigationStore from './data/NavigationStore';

import TaskAddView from './task/TaskAddView';
import TaskEditView from './task/TaskEditView';
import TaskListView from './task/TaskListView';

const { width, height } = Dimensions.get('window');

export default class Home extends Component {

  constructor(props) {
    super(props);
  }

  renderAdd = () => {
    if (NavigationStore.ShowAdd) {
      return (
        <TaskAddView onBack={() => {
          // alert('hi');
          NavigationStore.showTask();
          this.forceUpdate();
        }}
        />)
    }

    return null;
  }

  renderEdit = () => {
    if (NavigationStore.ShowEdit) {
      return (
        <TaskEditView onBack={() => {
          // alert('hi');
          NavigationStore.showTask();
          this.forceUpdate();
        }}
        />)
    }
    return null;
  }

  renderTask = () => {
    if (NavigationStore.ShowTask) {
      return (
        <TaskListView
          onAdd={() => {
            // alert('hi');
            NavigationStore.showAdd();
            this.forceUpdate();
          }}
          onMenu={() => {
            // NavigationStore.showEdit();
            // this.forceUpdate();
            this._drawer.open();
          }}
        />)
    }
    return null;
  }

  renderSidebar = () => {
    return (
      <View style={{ flex: 1, paddingTop: 50, backgroundColor: '#219176' }} >

        <View>

          <Icon.Button name="list" backgroundColor="transparent" onPress={() => {}}>
            To-do list
          </Icon.Button>
        </View>
        <View>

          <Icon.Button name="settings" backgroundColor="transparent" onPress={() => {}}>
            Settings
          </Icon.Button>
        </View>
        <View>

          <Icon.Button name="help" backgroundColor="transparent" onPress={() => {}}>
            About
          </Icon.Button>
        </View>

      </View>
    )
  }

  render() {

    NavigationStore.ShowAdd;
    NavigationStore.ShowEdit;
    NavigationStore.ShowTask;

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
          {this.renderTask()}
        </View>
      </Drawer>
    );

  }


}