import React, { Component } from 'react';
import { Modal } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Drawer from 'react-native-drawer'
import HomeScreen from './Home';
import Sidebar from './Sidebar';
import User from './User';

import TaskAddView from './task/TaskAddView';
import TaskEditView from './task/TaskEditView';
import TaskListView from './task/TaskListView';

import NoteAddView from './note/NoteAddView';
import NoteEditView from './note/NoteEditView';
import NoteListView from './note/NoteListView';

import NavigationStore from './data/NavigationStore';
import UserStore from './data/UserStore';

const Home = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTitle: 'Yup!',
      headerTintColor: '#299176',
    },
  },
  TaskList: {
    screen: TaskListView,
    navigationOptions: {
      headerTitle: '',
    }
  },
  TaskAdd: {
    screen: TaskAddView,
    navigationOptions: {
      headerTitle: 'Add Task',
    }
  },
  TaskEdit: {
    screen: TaskEditView,
    navigationOptions: {
      headerTitle: 'Edit Task',
    }
  },
  NoteList: {
    screen: NoteListView,
    navigationOptions: {
      headerTitle: '',
    }
  },
  NoteAdd: {
    screen: NoteAddView,
    navigationOptions: {
      headerTitle: 'Add Note',
    }
  },
  NoteEdit: {
    screen: NoteEditView,
    navigationOptions: {
      headerTitle: 'Edit Note',
    }
  },
});


export default class HomeComponent extends Component {
  constructor(props) {
    super(props);
    this._drawer = null;

    this.state = {
      showLogin: true,
    }
  }

  onSuccess = () => {
    this.setState({
      showLogin: false,
    })
  }

  onError = (err) => {
    alert(err);
  }

  render() {
    return (
      <Drawer
        type="static"
        tapToClose={true}
        openDrawerOffset={0.5} // 20% gap on the right side of drawer
        panCloseMask={0.5}
        closedDrawerOffset={-3}
        tweenDuratio={150}
        ref={(ref) => NavigationStore.sidebar = ref}
        content={<Sidebar
          onLogout={() => {
            this.forceUpdate();
          }
          }
        />}
      >
        <Modal
          visible={!UserStore.User}
          onRequestClose={() => {

          }} >
          <User
            onSuccess={this.onSuccess}
            onError={this.onError}
          />
        </Modal>
        <Home/>
      </Drawer>
    );
  }
}