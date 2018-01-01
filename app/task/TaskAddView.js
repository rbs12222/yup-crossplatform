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
  DatePickerAndroid,
  DatePickerIOS,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';
import Button from 'react-native-button';

import TaskStore from '../data/TaskStore';

export default class TaskAddView extends Component<{}> {

  constructor(props) {
    super(props);

    this.leftButtonConfig = (
      <Button
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          // borderRadius: 15,
          marginHorizontal: 5,
        }}
        onPress={() => this.props.onBack()}
      >
        <Icon name="arrow-back" size={25} color='#219176' />
      </Button>
    );
    this.rightButtonConfig = {
      title: 'Save',
      tintColor: 'black',
      handler: () => {
        this.onSave();
        this.props.onBack();
      }
    };

    this.titleConfig = {
      title: 'Add Task',
      tintColor: '#299176',
    };

    this.state = {
      name: '',
      description: '',
      due: new Date(Date.now()),
    }
  }

  onSave = () => {
    const date = this.state.due;
    const data = {
      name: this.state.name,
      description: this.state.description,
      complete: false,
      due: Date.parse(date.toLocaleString()),
      created: Date.now(),
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

  renderDatePicker = () => {
    if (Platform.OS === 'ios') {
      return (
        <DatePickerIOS
          date={this.state.due}
          mode={'datetime'}
          onDateChange={(time) => {
            this.setState({
              due: time,
            })
          }}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container} >
        <NavigationBar
          tintColor={'white'}
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
          <View style={{
            padding: 5,
          }} >
            {this.renderDatePicker()}
          </View>
        </ScrollView>

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