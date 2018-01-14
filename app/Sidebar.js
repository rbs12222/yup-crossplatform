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
        <Text>
          Hello
        </Text>
      </View>
    )
  }

}