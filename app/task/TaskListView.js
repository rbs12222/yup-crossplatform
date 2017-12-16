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
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';

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
    this.titleConfig = {
      title: 'Yup!',
      tintColor: '#299176',
    };
  }

  componentWillMount() {
    TaskStore.all();
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
      }} >
        <Icon name="check" size={20} color="blue" />
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
            flexDirection: 'row',
            // justifyContent: 'center',
            alignItems: 'center',
          }} >
            <Button
              containerStyle={{
                justifyContent: 'center',
                alignItems: 'center',
                padding: 5,
                backgroundColor: '#219176',
                borderRadius: 15,
                marginHorizontal: 10,
              }}
              onPress={() => this.props.onAdd()}
            >
              <Icon name="add" size={15} color="white" />
            </Button>
            <Text> {item.name} </Text>
          </View>
          {this.renderDone(item)}
        </View>
      </TouchableOpacity>
    )
  }

  renderHeader = () => {
    return (
      <View style={{ flex: 1, flexDirection: 'row' }} >
        <View style={{
          flex: 1,
          paddingVertical: 15,
          borderBottomColor: '#dddddd',
          borderBottomWidth: StyleSheet.hairlineWidth,
          flexDirection: 'row',
          // justifyContent: 'center',
          alignItems: 'center',
        }} >
          <Button
            containerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
              padding: 5,
              backgroundColor: '#219176',
              borderRadius: 15,
              marginHorizontal: 10,
            }}
            onPress={() => this.props.onAdd()}
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
    if (TaskStore.ListIsUpdate);

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
    return (
      <View style={styles.container} >
        <NavigationBar
          tintColor={'white'}
          title={this.titleConfig}
          // rightButton={this.rightButtonConfig}
          rightButton={icon}
        />
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