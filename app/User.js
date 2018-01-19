import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, ActivityIndicator } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';
import * as firebase from 'firebase';
import UserStore from './data/UserStore';

const { width, height } = Dimensions.get('window');

export default class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      loading: false,
    };

    this.navigation = this.props.navigation;
  }

  componentDidMount() {
  }

  onSuccess = (user) => {
    this.setState({
      loading: false,
    });

    UserStore.User = user;

    if (this.props.onSuccess) {
      this.props.onSuccess();
    }
  }

  onError = (err) => {
    this.setState({
      loading: false,
    });

    if (this.props.onError) {
      this.props.onError(err);
    }
  }

  onLogin = () => {
    try {
      const email = this.state.email;
      const pass = this.state.password;
      this.setState({
        loading: true,
      });

      firebase.auth()
        .signInWithEmailAndPassword(email, pass)
        .then((user) => {
          this.onSuccess(user);
        })
        .catch((err) => {
          this.onError(err);
        });

      // Navigate to the Home page

    } catch (error) {
      console.log(error.toString())
    }
  }

  onRegister = () => {
    try {
      const email = this.state.email;
      const pass = this.state.password;
      this.setState({
        loading: true,
      });

      firebase.auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((user) => {
          this.onSuccess(user);
        })
        .catch((err) => {
          this.onError(err);
        });

      console.log("Account created");

      // Navigate to the Home page, the user is auto logged in

    } catch (error) {
      console.log(error.toString())
    }
  }

  renderLoading = () => {
    if (!this.state.loading) {
      return null;
    }

    return (
      <View style={{
        position: 'absolute',
        marginTop: (height - 80) / 2,
        backgroundColor: 'black',
        opacity: 0.8,
        borderRadius: 5,
        padding: 80,
      }} >
        <ActivityIndicator height={120} size={'large'} />
      </View>
    )
  }

  renderRegister = () => {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ flex: 1 }} >
        </View>
        <View style={{ flex: 1 }} >
          <TextInput
            value={this.state.email}
            onChangeText={(value) => {
              this.setState({
                email: value,
              });
            }}
            autoCapitalize={'none'}
            style={{
              flex: 0,
              width: width * 0.8,
              paddingHorizontal: 5,
              paddingVertical: 10,
              borderColor: '#BBB',
              borderWidth: StyleSheet.hairlineWidth
            }}
            placeholder={'email'}
            underlineColorAndroid={'transparent'}
          />
          <TextInput
            value={this.state.password}
            onChangeText={(value) => {
              this.setState({
                password: value,
              });
            }}
            autoCapitalize={'none'}
            style={{
              flex: 0,
              width: width * 0.8,
              paddingHorizontal: 5,
              paddingVertical: 10,
              borderColor: '#BBB',
              borderWidth: StyleSheet.hairlineWidth
            }}
            placeholder={'*******'}
            underlineColorAndroid={'transparent'}
          />
          <View style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            marginTop: 20,
          }} >
            <Button
              containerStyle={{ marginHorizontal: 10 }}
              style={{ fontSize: 15, color: '#777' }}
              onPress={this.onRegister}
            >
              Register
            </Button>
            <Button
              containerStyle={{ marginHorizontal: 10 }}
              style={{ fontSize: 15, color: '#777' }}
              onPress={this.onLogin}
            >
              Login
            </Button>
          </View>
        </View>
        <View style={{ flex: 1 }} >
        </View>
        {this.renderLoading()}
      </View>
    );
  }

  render() {
    return this.renderRegister();
  }

}