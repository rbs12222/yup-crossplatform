import { AsyncStorage } from 'react-native';
import MD5 from './Crypt';

const {
  computed,
  observable,
  action,
} = require('mobx');

class TaskStore {

  list = [];
  @observable
  listIsUpdateIn = 0;
  currentItem = null;

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
      this.list = [];
      const value =
        AsyncStorage.getItem('tasks');
      if (value !== null) {
        // We have data!!
        value.then((result) => {
          // console.log(result);
          this.list = JSON.parse(result);
          if (!this.list) this.list = [];
          this.listIsUpdateIn += 1;
        }).catch(error => alert(error));
      } else {
        this.list = [];
        this.listIsUpdateIn += 1;
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

        Object.keys(data).forEach((key) => {
          if (data[key] !== null && data[key] !== undefined) {
            item[key] = data[key];
          }
        });
        this.listIsUpdateIn += 1;
      }
    });

    try {
      AsyncStorage.setItem('tasks', JSON.stringify(this.list));
    } catch (error) {
      alert(error);
      return;
    }
  }

  @action
  remove(item) {
    if (!item) return;
    const id = item.id;
    try {
      this.list = this.list.filter((l) => l.id !== item.id);
      AsyncStorage.setItem('tasks', JSON.stringify(this.list));
      this.listIsUpdateIn += 1;
    } catch (error) {
      alert(error);
      return;
    }

  }

}

const store = new TaskStore();

export default store;