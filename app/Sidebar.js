import React, { Component } from 'react';
import { View, Text, TextInput, Dimensions } from 'react-native';

import { observer } from 'mobx-react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';

import * as firebase from 'firebase';

import UserStore from './data/UserStore';

@observer
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

  onLogout = () => {
    try {
      firebase.auth().signOut()
        .then(() => {
          UserStore.User = null;
        })
        .catch((err) => {

        });

      if (this.props.onLogout) {
        this.props.onLogout();
      }

    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const email = UserStore.User ? UserStore.User.email : '';
    return (
      <View style={{ flex: 1, backgroundColor: '#219176' }} >
        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', margin: 10, marginTop: 70 }} >
          <Text style={{ color: 'white', fontSize: 17 }} >
            {email}
          </Text>
          <Button
            containerStyle={{ marginVertical: 10 }}
            onPress={this.onLogout}
          >
            <Text style={{ color: 'white', fontSize: 17 }} >
              Logout
            </Text>
          </Button>
        </View>
      </View>
    )
  }

}