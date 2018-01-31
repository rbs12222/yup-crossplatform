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
  DatePickerAndroid, TimePickerAndroid,
} from 'react-native';

import PushNotification from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from 'react-native-button';
import NavigationBar from 'react-native-navbar';

import TaskStore from '../data/TaskStore';

export default class TaskEditView extends Component<{}> {

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
      title: 'Edit Task',
      tintColor: '#299176',
    };

    const now = new Date(TaskStore.currentItem.due);
    let month = now.getMonth();
    month += 1;

    if (month <= 9) {
      month = '0' + month;
    }
    const date = `${now.getFullYear()}-${month}-${now.getDate()}`;
    const time = `${now.getHours()}:${now.getMinutes()}`;

    this.state = {
      name: TaskStore.currentItem.name,
      description: TaskStore.currentItem.description,
      due: now,
      date: date,
      time: time,
    }
  }
// in android, it will use system date picker
  onSelectDate = async () => {
    try {
      const { action, year, month, day } = await DatePickerAndroid.open({
        date: this.state.due,
        mode: 'spinner',
      });

      if (action !== DatePickerAndroid.dismissedAction) {
        const m = parseInt(month, 10) + 1;
        this.onSelectTime();
        if (m <= 9) {
          m = '0' + m;
        }
        this.setState({
          date: `${year}-${m}-${day}`,
        });
      }
    } catch ({ code, message }) {
      // alert(message)
    }
  }

  onSelectTime = async () => {
    try {
      const { action, hour, minute } = await TimePickerAndroid.open({
        hour: this.state.due.getHours(),
        minute: this.state.due.getMinutes(),
        is24Hour: true, // Will display '2 PM'
        mode: 'spinner',
      });
      if (action !== TimePickerAndroid.dismissedAction) {
        // Selected hour (0-23), minute (0-59)
        let min = minute;
        if (minute >= 0 && minute <= 9) {
          min = '0' + min;
        }
        const time = `${hour}:${min}`
        this.setState({
          time: time,
        });
      }
    }
    catch ({ code, message }) {
      // alert(message)
    }
  }

  onSave = () => {
    let date = Date.parse(this.state.due.toUTCString());
    if (Platform.OS === 'android') {
      date = Date.parse(this.state.date + 'T' + this.state.time);
    }

    TaskStore.edit(TaskStore.currentItem.id, {
      name: this.state.name,
      description: this.state.description,
      due: date,
    });

    const created = `${TaskStore.currentItem.created}`;
    PushNotification.cancelLocalNotifications({id: created});

    PushNotification.localNotificationSchedule({
      userInfo: { id: created },
      message: `Todo - ${this.state.name} arrived!`, // (required)
      date: new Date(date) // in 60 secs
    });

    this.navigation.goBack();
  }

  onDelete = () => {
    TaskStore.remove(TaskStore.currentItem);
    this.navigation.goBack();
  }

  onChangeText = (key, value) => {
    this.setState({
      [key]: value,
    });
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

    return (
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
        <Button
          containerStyle={{
            padding: 10,
            backgroundColor: '#299176',
            flex: 1,
            alignItems: 'center',
          }}
          onPress={this.onSelectDate}
        >
          <Text style={{ fontSize: 17, color: 'white' }}>
            {this.state.date + ' ' + this.state.time}
          </Text>
        </Button>
      </View>
    );
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
              placeholder={'description'}
              underlineColorAndroid={'rgba(0,0,0,0)'}
            />
          </View>
          <View style={{
            padding: 5,
          }} >
            {this.renderDatePicker()}
          </View>
          <View style={{ padding: 5, borderColor: 'blue', borderWidth: 1, margin: 10 }} >
            <Button onPress={this.onDelete} >Delete</Button>
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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