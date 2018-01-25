import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions, StyleSheet, ActivityIndicator, Image, PixelRatio } from 'react-native';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';
import * as firebase from 'firebase';
import UserStore from './data/UserStore';
import trim from 'lodash/trim';
import TaskStore from './data/TaskStore';
import NoteStore from './data/NoteStore';

const { width, height } = Dimensions.get('window');

export default class User extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      masks: '',
      loading: false,
    };

    this.password = '';
    this.navigation = this.props.navigation;
  }

  componentDidMount() {
  }

  onSuccess = (user, isLogin = true) => {
    this.setState({
      loading: false,
    });

    UserStore.User = user;

    if (isLogin) {

      TaskStore.fromService();
      NoteStore.fromService();

    }

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
      const email = trim(this.state.email);
      const pass = trim(this.state.password);
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
          this.onSuccess(user, false);
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
    const width2 = width * 0.35;
    const height2 = width * 0.35;


    let password = '';
    for (let i = 0; i < this.state.masks.length; ++i) {
      password += '*';
    }

    console.log('real: ' + this.state.password);

    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <View style={{ flex: 0, paddingTop: height * 0.10 }} >
          <Image source={require('./logo-01.png')} style={{ width: width2, height: height2 }} />
        </View>
        <View style={{ flex: 1, paddingTop: 10 }} >
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
            value={password}
            onChangeText={(value) => {
              console.log(value);
              this.setState(
                (prevState) => ({
                  password: value.length >= prevState.password.length ? prevState.password + value.slice(-1) : prevState.password.slice(0, prevState.password.length - 1),
                  masks: value,
                })
              );
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
