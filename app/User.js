import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';


export default class User extends Component {

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


  renderRegister = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#219176',
          padding: 10,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <View style={{ flex: 0 }} >
            <Text style={{ fontSize: 15, width: 50, color: 'white' }} >
              Email
            </Text>
          </View>
          <View style={{ flex: 1, marginHorizontal: 15, backgroundColor: '#F7F7F7' }} >
            <TextInput
              value={this.state.email}
              onChangeText={(value) => {
                this.setState({
                  email: value,
                });
              }}
              autoCapitalize={'none'}
              style={{ width: 100, paddingHorizontal: 5, paddingVertical: 10 }}
              placeholder={'email'}
              underlineColorAndroid={'transparent'}
            />
          </View>
        </View>
        <View style={{
          flexDirection: 'row',
          backgroundColor: '#219176',
          padding: 10,
          marginHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center'
        }} >
          <View style={{ flex: 0 }} >
            <Text style={{ fontSize: 15, width: 50, color: 'white' }} >
              Pass
            </Text>
          </View>
          <View style={{ flex: 1, marginHorizontal: 15, backgroundColor: '#F7F7F7' }} >
            <TextInput
              value={this.state.password}
              onChangeText={(value) => {
                this.setState({
                  password: value,
                });
              }}
              autoCapitalize={'none'}
              style={{ width: 100, paddingHorizontal: 5, paddingVertical: 10 }}
              placeholder={'******'}
              underlineColorAndroid={'transparent'}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row'}} >
          <Button
            onPress={this.onRegister}
            containerStyle={{ margin: 10, backgroundColor: '#219176', padding: 10, borderRadius: 10, }} >
            <Text style={{ fontSize: 15, color: 'white' }} >
              Register
            </Text>
          </Button>
          <Button
            onPress={() => {
              this.props.onSuccess();
            }}
            containerStyle={{ margin: 10, backgroundColor: '#219176', padding: 10, borderRadius: 10, }} >
            <Text style={{ fontSize: 15, color: 'white' }} >
              Login
            </Text>
          </Button>
        </View>
      </View>
    );
  }

  render() {
    return this.renderRegister();
  }

}