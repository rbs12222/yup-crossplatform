import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { observer } from 'mobx-react';
import NavigationBar from 'react-native-navbar';

import TaskStore from '../data/TaskStore';
import NavigationStore from '../data/NavigationStore';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

@observer
export default class TaskListView extends Component<{}> {

  constructor(props) {
    super(props);

    this.rightButtonConfig = {
      title: 'Add',
      tintColor: 'white',
      handler: () => this.props.onAdd(),
    };

    this.titleConfig = {
      title: 'Tasks',
      tintColor: 'white',
    };
  }

  componentWillMount() {
    TaskStore.all();
  }

  renderDone = (item) => {

    if (item.complete) {
      return null;
    }

    return (
      <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center', paddingLeft: 10,
        borderBottomColor: '#dddddd',
        borderBottomWidth: StyleSheet.hairlineWidth, }} >
        <Text>Done</Text>
      </View>
    )
  }

  keyExtractor = (item) => item.id;

  renderRow = (row) => {
    const item = row.item;

    return (
      <TouchableOpacity activeOpacity={0.2} style={{ flex: 1 }} onPress={() => {
        TaskStore.edit(item.id, { complete: !item.complete });
      }} >
        <View style={{ flex: 1, flexDirection: 'row' }} >
          <View style={{
            flex: 1,
            paddingVertical: 15,
            borderBottomColor: '#dddddd',
            borderBottomWidth: StyleSheet.hairlineWidth,
          }} >
            <Text> {item.name} </Text>
          </View>
          {this.renderDone(item)}
        </View>
      </TouchableOpacity>
    )
  }

  renderView = () => {
    return (
      <FlatList
        ref={(ref) => {
          this.listRef = ref;
        }}
        style={{ flex: 1 }}
        initialNumToRender={10}
        data={TaskStore.ListData}
        renderItem={this.renderRow}
        keyExtractor={this.keyExtractor}
        extraData={TaskStore.ListIsUpdate}
        // onRefresh={this.onRefresh}
        // refreshing={this.refreshing}
        windowSize={11}
      />
    );
  }

  render() {
    if (TaskStore.ListIsUpdate);

    return (
      <View style={styles.container} >
        <NavigationBar
          tintColor={'purple'}
          title={this.titleConfig}
          rightButton={this.rightButtonConfig}
        />
        {this.renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});