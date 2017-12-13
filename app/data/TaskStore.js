import { AsyncStorage } from 'react-native';
import MD5 from './Crypt.js';

const {
  computed,
  observable,
  action,
} = require('mobx');

class TaskStore {

  list = [];
  @observable
  listIsUpdateIn = 0;

  @computed
  get ListIsUpdate() {
    return this.listIsUpdateIn;
  }

  get ListData() {
    return this.list;
  }

  constructor() {
  }

  @action
  all() {
    try {
      const value =
        AsyncStorage.getItem('tasks');
      if (value !== null) {
        // We have data!!
        value.then((result) => {
          // console.log(result);
          this.list = JSON.parse(result);
          this.listIsUpdateIn += 1;
        }).catch(error => alert(error));
      }
    } catch (error) {
      // Error retrieving data
    }
  }

  @action
  add(data) {
    data.id = MD5(`${Date.now()}${Math.random()}`);
    const list = [data].concat(this.list.slice());
    try {
      AsyncStorage.setItem('tasks', JSON.stringify(list));
    } catch (error) {
      alert(error);
      return;
    }

    this.list = list;
  }

  @action
  edit(id, data) {
    this.list.forEach((item) => {
      if (item.id === id) {
        item.name = data.name;
        item.description = data.description;
        item.complete = data.complete;

        try {
          AsyncStorage.setItem('tasks', JSON.stringify(this.list));
        } catch (error) {
          alert(error);
          return;
        }
      }
    })
  }

}

const store = new TaskStore();

export default store;