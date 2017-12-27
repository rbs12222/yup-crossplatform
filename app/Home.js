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

const { width, height } = Dimensions.get('window');

const initialLayout = {
  height: 0,
  width: Dimensions.get('window').width,
};

const FirstRoute = () => (
  <TaskListView
    onAdd={() => {
      // alert('hi');
      NavigationStore.showAdd();
    }}
    onEdit={() => {
      // alert('hi');
      NavigationStore.showEdit();
    }}
    onMenu={() => {
      // NavigationStore.showEdit();
      // this.forceUpdate();
      this._drawer.open();
    }}
  />);
const SecondRoute = () => <View style={{ backgroundColor: '#673ab7' }} />;

@observer
export default class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'first', title: 'Todo' },
        { key: 'second', title: 'Categories' },
      ],
    };

    this.titleConfig = {
      title: 'Yup!',
      tintColor: '#299176',
    };
  }

  _handleIndexChange = index => this.setState({ index });

  _renderHeader = props => <TabBar {...props} style={{ backgroundColor: 'white' }} labelStyle={{ color: 'black' }} />;

  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

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
            // alert('hi');
            NavigationStore.showEdit();
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

    if (NavigationStore.ShowTask) {
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
          {this.renderEdit()}
          {this.renderTab()}
        </View>
      </Drawer>
    );

  }


}