import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  DatePickerIOS,
  DatePickerAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import NavigationBar from 'react-native-navbar';
import Button from 'react-native-button';

import NoteStore from '../data/NoteStore';

export default class NoteEditView extends Component<{}> {
  static navigationOptions = ({ navigation, screenProps }) => ({
    header: null,
  });

  constructor(props) {
    super(props);
    this.navigation = this.props.navigation;

    this.leftButtonConfig = (
      <Button
        containerStyle={{
          justifyContent: 'center',
          alignItems: 'center',
          padding: 5,
          // borderRadius: 15,
          marginHorizontal: 5,
        }}
        onPress={() => {
          this.navigation.goBack();
        }}
      >
        <Icon name="arrow-back" size={25} color='#219176' />
      </Button>
    );

    this.rightButtonConfig = {
      title: 'Save',
      tintColor: 'black',
      handler: () => {
        this.onSave();
        this.navigation.goBack();
      }
    };

    this.titleConfig = {
      title: 'Edit Note',
      tintColor: '#299176',
    };

    this.state = {
      name: NoteStore.currentItem.name,
      description: NoteStore.currentItem.description,
    }
  }

  onSave = () => {
    NoteStore.edit(NoteStore.currentItem.id, {
      name: this.state.name,
      description: this.state.description,
    });
    this.navigation.goBack();
  }

  onDelete = () => {
    NoteStore.remove(NoteStore.currentItem);
    this.navigation.goBack();
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
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
                this.onChangeText('name', value);
              }}
              placeholder={'name'}
              underlineColorAndroid={'rgba(0,0,0,0)'}
            />
          </View>
          <View style={{ padding: 5, borderColor: 'blue', borderWidth: 1, margin: 10 }} >
            <TextInput
              style={{ paddingVertical: 10, height: 80 }}
              value={this.state.description}
              multiline
              maxLength={500}
              numberOfLines={4}
              onChangeText={(value) => {
                this.onChangeText('description', value);
              }}
              placeholder={'content'}
              underlineColorAndroid={'rgba(0,0,0,0)'}
            />
          </View>
          <View style={{ padding: 5, borderColor: 'blue', borderWidth: 1, margin: 10 }} >
            <Button onPress={this.onDelete}>Delete</Button>
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