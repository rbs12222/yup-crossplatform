import React, { Component } from 'react';
import { View } from 'react-native';
import NavigationStore from './data/NavigationStore';

import TaskAddView from './task/TaskAddView';
import TaskEditView from './task/TaskEditView';
import TaskListView from './task/TaskListView';

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
          onEdit={() => {
            NavigationStore.showEdit();
            this.forceUpdate();
          }}
        />)
    }
    return null;
  }

  render() {

    NavigationStore.ShowAdd;
    NavigationStore.ShowEdit;
    NavigationStore.ShowTask;

    return (
      <View style={{ flex: 1 }} >
        {this.renderAdd()}
        {this.renderEdit()}
        {this.renderTask()}
      </View>
    );

  }


}