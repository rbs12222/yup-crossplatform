import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';

import NavigationBar from 'react-native-navbar';

import TaskStore from '../data/TaskStore';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
  'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});


export default class TaskAddView extends Component<{}> {

  constructor(props) {
    super(props);
    this.leftButtonConfig = {
      title: 'Back',
      tintColor: 'white',
      handler: () => this.props.onBack(),
    };
    this.rightButtonConfig = {
      title: 'Save',
      tintColor: 'white',
      handler: () => {
        this.onSave();
        this.props.onBack();
      }
    };

    this.titleConfig = {
      title: 'Add Task',
      tintColor: 'white',
    };

    this.state = {
      name: '',
      description: '',
    }
  }

  onSave = () => {
    const data = {
      name: this.state.name,
      description: this.state.description,
      complete: false,
    };

    TaskStore.add(data);
  }

  keyExtractor = (item) => item.id;

  renderRow = () => {
    return (
      <TouchableOpacity activeOpacity={0.2} style={{ flex: 1 }} >
        <View style={{
          flex: 1,
          paddingVertical: 15,
          borderBottomColor: 'blue',
          borderBottomWidth: StyleSheet.hairlineWidth,
        }} >
          <Text> Hello </Text>
        </View>
      </TouchableOpacity>
    )
  }

  render() {
    return (
      <View style={styles.container} >
        <NavigationBar
          tintColor={'purple'}
          title={this.titleConfig}
          leftButton={this.leftButtonConfig}
          rightButton={this.rightButtonConfig}
        />

        <ScrollView style={{ flex: 1 }} >
          <View style={{ padding: 5, borderColor: 'blue', borderWidth: 1, margin: 10 }} >
            <TextInput
              style={{ paddingVertical: 10 }}
              value={this.state.name}
              onChangeText={(value) => {
                this.setState({
                  name: value,
                });
              }}
              placeholder={'name'}
              underlineColorAndroid={'rgba(0,0,0,0)'}
            />
          </View>
          <View style={{ padding: 5, borderColor: 'blue', borderWidth: 1, margin: 10 }} >
            <TextInput
              style={{ paddingVertical: 10, height: 80 }}
              value={this.state.description}
              onChangeText={(value) => {
                this.setState({
                  description: value,
                });
              }}
              multiline
              maxLength={500}
              numberOfLines={4}
              placeholder={'description'}
              underlineColorAndroid={'rgba(0,0,0,0)'}
            />
          </View>
        </ScrollView>

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