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
  TimePickerAndroid,
  Picker,
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

    let day = now.getDate();

    if (day <= 9) {
      day = '0' + day;
    }
    const date = `${now.getFullYear()}-${month}-${day}`;
    const time = `${now.getHours()}:${now.getMinutes()}`;

    console.log(TaskStore.currentItem);

    this.state = {
      name: TaskStore.currentItem.name,
      description: TaskStore.currentItem.description,
      priority: TaskStore.currentItem.priority,
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
        let m = parseInt(month, 10) + 1;
        let d = parseInt(day, 10);
        this.onSelectTime();
        if (m <= 9) {
          m = '0' + m;
        }

        if (d <= 9) {
          d = '0' + d;
        }
        this.setState({
          date: `${year}-${m}-${d}`,
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
        let h = hour;
        if (minute >= 0 && minute <= 9) {
          min = '0' + min;
        }
        if (h <= 9) {
          h = '0' + h;
        }
        const time = `${h}:${min}`
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
      date = Date.parse(new Date(this.state.date + 'T' + this.state.time).toUTCString());
    }


    date = Math.floor(date / (60 * 1000)) * 60 * 1000;

    TaskStore.edit(TaskStore.currentItem.id, {
      name: this.state.name,
      description: this.state.description,
      priority: this.state.priority,
      due: date,
    });

    const created = `${TaskStore.currentItem.created}`;
    PushNotification.cancelLocalNotifications({ id: created });

    PushNotification.localNotificationSchedule({
      userInfo: { id: created },
      message: `Todo - ${this.state.name} is due now`, // (required)
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

  renderPicker = () => {

    const list = ['urgent', 'average', 'less'];

    const options = list.map((el, index) => {
      return (
        <Picker.Item
          key={el}
          value={el}
          label={el.toUpperCase()}
        />
      );
    })

    return (
      <Picker
        selectedValue={this.state.priority}
        onValueChange={(value) => {
          this.setState({
            priority: value,
          });
        }}
      >
        {options}
      </Picker>
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
      <View style={styles.container}>
        <NavigationBar
          tintColor={'white'}
          title={this.titleConfig}
          leftButton={this.leftButtonConfig}
          rightButton={this.rightButtonConfig}
        />

        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 5, borderColor: '#299176', borderWidth: 1, margin: 10 }}>
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
          <View style={{ padding: 5, borderColor: '#299176', borderWidth: 1, margin: 10 }}>
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
            padding: 5
          }}>
            {this.renderPicker()}
          </View>
          <View style={{
            padding: 5,
          }}>
          </View>
          <View style={{ padding: 5, borderColor: '#299176', backgroundColor: '#299176', borderWidth: 1, margin: 10 }}>
          <Button onPress={this.onDelete} containerStyle={{justifyContent: 'center', alignItems: 'center'}} >
            <Text style={{fontSize: 15, color: 'white'}}>

            Delete
            </Text>
            </Button>
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