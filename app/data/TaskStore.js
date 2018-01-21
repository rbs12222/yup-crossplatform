import { AsyncStorage } from 'react-native';
import MD5 from './Crypt';

import UserStore from './UserStore';
import * as firebase from 'firebase';

const {
  computed,
  observable,
  action,
} = require('mobx');


class TaskStore {

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
  fromService() {

    this.all((count) => {

      if (count === 0) {
        const userId = firebase.auth().currentUser.uid;
        let userMobilePath = "users/" + userId;
        userMobilePath = 'userTodos';
    
        // alert('all');
    
        try {
          firebase.database().ref(userMobilePath).on('value', (snapshot) => {
    
            // console.log(snapshot.val());
    
            const todo = snapshot.val();
            this.list = JSON.parse(todo.todos);
            this.listIsUpdateIn += 1;
    
            //if (TaskStore)
          }, (err) => { console.log(err) });
        }
        catch (err) { alert(err.toString()) };

      }
    });
  }

  @action
  all(cb) {
    try {
     //alert('hi'); 
     this.list = [];
      const value =
        AsyncStorage.getItem('tasks');
      if (value !== null) {
        // We have data!!
        value.then((result) => {
          // console.log(result);
          // alert('empty data');
          this.list = JSON.parse(result);
          if (!this.list) this.list = [];
          this.listIsUpdateIn += 1;
          typeof cb === 'function' && cb(this.list.length);
        })
        .catch(error => alert('no data' + error.toString()));
      } else {
        alert('empty tasks');
        this.list = [];
        this.listIsUpdateIn += 1;
      }
    } catch (error) {
      // Error retrieving data
      alert('exception: ' + error.toString());
    }
  }

  @action
  add(data) {
    data.id = MD5(`${Date.now()}${Math.random()}`);
    const list = [data].concat(this.list.slice());
    try {
      const all = JSON.stringify(list);
      AsyncStorage.setItem('tasks', all);

      UserStore.setUserTodos(all)
        .then(() => {

        })
        .catch((err) => {
          alert(err.toSource());
        });

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
      const all = JSON.stringify(this.list)
      
      AsyncStorage.setItem('tasks', all);
      
      UserStore.setUserTodos(all)
        .then(() => {

        })
        .catch((err) => {
          alert(err.toSource());
        });
        
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
      const all = JSON.stringify(this.list)
      AsyncStorage.setItem('tasks', all);
      
      UserStore.setUserTodos(all)
        .then(() => {

        })
        .catch((err) => {
          alert(err.toSource());
        });
        
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
    let hour = date.getHours();
    let min = date.getMinutes();

    if (hour === 0) {
      hour = "00";
    }

    if (min === 0) {
      min = "00";
    }

    month += 1;

    return `${year}/${month}/${day} ${hour}:${min}`;
  }

}

const store = new TaskStore();

export default store;
