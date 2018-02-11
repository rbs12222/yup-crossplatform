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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';

import TaskStore from '../data/TaskStore';
import * as firebase from 'firebase';
import UserStore from '../data/UserStore';

@observer
export default class TaskListView extends Component<{}> {

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;
  }

  componentWillMount() {

  }

  renderDone = (item) => {

    if (!item.complete) {
      return null;
    }

    return (
      <View style={{
        flex: 0, justifyContent: 'center', alignItems: 'center', paddingLeft: 10,
        borderBottomColor: '#dddddd',
        borderBottomWidth: StyleSheet.hairlineWidth,
        paddingHorizontal: 10,
      }}>
        <Icon name="check" size={20} color='#299176' />
      </View>
    )
  }

  keyExtractor = (item) => item.id;

  renderRow = (row) => {
    const item = row.item;
    let color = 'orange';

    if (item.priority && item.priority.toString().toLowerCase() === 'less') {
      color = 'green';
    }

    if (item.priority && item.priority.toString().toLowerCase() === 'urgent') {
      color = 'red';

    }
    return (
      <TouchableOpacity activeOpacity={0.2} style={{ flex: 1 }} onPress={() => {
        TaskStore.edit(item.id, { complete: !item.complete });
      }}>
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{
            flex: 1,
            paddingVertical: 15,
            borderBottomColor: '#dddddd',
            borderBottomWidth: StyleSheet.hairlineWidth,
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Button
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                backgroundColor: '#219176',
                borderRadius: 15,
                marginHorizontal: 10,
              }}
              onPress={() => {
                TaskStore.currentItem = item;
                this.props.onEdit();
              }}
            >
              <Icon name="edit" size={15} color="white" />
            </Button>
            <View style={{ flex: 1, paddingLeft: 5 }}>
              <Text style={{ fontSize: 17 }}> {item.name} </Text>
              <Text style={{ fontSize: 12, color: '#555', marginTop: 5 }}>{item.description} </Text>
              <Text style={{ fontSize: 15, color, }}> {item.priority} </Text>
              <Text style={{
                fontSize: 13,
                color: '#299176',
                paddingTop: 15
              }}>{TaskStore.toLocaleDateString(item.due)} </Text>
            </View>
          </View>
          {this.renderDone(item)}
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{
          flex: 1,
          paddingVertical: 15,
          borderBottomColor: '#dddddd',
          borderBottomWidth: StyleSheet.hairlineWidth,
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
          <Button
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              backgroundColor: '#219176',
              borderRadius: 15,
              marginHorizontal: 10,
            }}
            onPress={() => {
              this.props.onAdd();
            }}
          >
            <Icon name="add" size={15} color="white" />
          </Button>
        </View>
      </View>
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
        ListHeaderComponent={this.renderHeader()}
        extraData={TaskStore.ListIsUpdate}
        // onRefresh={this.onRefresh}
        // refreshing={this.refreshing}
        windowSize={11}
      />
    );
  }

  render() {
    if (TaskStore.ListIsUpdate) ;
    return (
      <View style={styles.container}>
        {this.renderView()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
