import { AsyncStorage } from 'react-native';
import MD5 from './Crypt';

const {
  computed,
  observable,
  action,
} = require('mobx');

class NoteStore {

  firebase = null;
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
        AsyncStorage.getItem('notes');
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
      AsyncStorage.setItem('notes', JSON.stringify(list));
    } catch (error) {
      alert(error);
      return;
    }

    this.list = list;
    this.listIsUpdateIn += 1;
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
      AsyncStorage.setItem('notes', JSON.stringify(this.list));
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
      AsyncStorage.setItem('notes', JSON.stringify(this.list));
      this.listIsUpdateIn += 1;
    } catch (error) {
      alert(error);
      return;
    }

  }

  toLocaleDateString = (time) => {
    if (!time) {
      return '';
    }

    let date = time;

    if (typeof time === 'number') {
      date = new Date(time);
    }

    const year = date.getFullYear();
    let month = date.getMonth();
    const day = date.getDate();

    month += 1;

    return `${year}/${month}/${day}`;
  }

}

const store = new NoteStore();

export default store;