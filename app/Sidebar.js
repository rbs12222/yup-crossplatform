import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';


export default class Sidebar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.navigation = this.props.navigation;
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#219176' }} >
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, marginTop: 70 }} >
          <Text style={{ color: 'white', fontSize: 17 }} >
            abc@abc.com
          </Text>
          <Button
            containerStyle={{ marginVertical: 10 }}
            onPress={() => {
              //
            }}
          >
            <Text style={{ color: 'white', fontSize: 17 }} >
              Logout
            </Text>
          </Button>
        </View>
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, marginTop: 15 }} >
          <Button
            containerStyle={{ marginVertical: 10 }}
          >
            <Text style={{ color: 'white', fontSize: 17 }} >
              Backup
            </Text>
          </Button>
          <Button
            containerStyle={{ marginVertical: 10 }}
          >
            <Text style={{ color: 'white', fontSize: 17 }} >
              Restore
            </Text>
          </Button>
          <Button
            containerStyle={{ marginVertical: 10 }}
          >
            <Text style={{ color: 'white', fontSize: 17 }} >
              About
            </Text>
          </Button>
        </View>
      </View>
    )
  }

}