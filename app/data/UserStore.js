import * as firebase from 'firebase';

const {
  computed,
  observable,
  action,
} = require('mobx');

const config = {
  apiKey: "AIzaSyAbpmdpCpt2qDGYaX9o2xHm8cC1UmbHPLQ",
  authDomain: "yotodo-277b4.firebaseapp.com",
  databaseURL: "https://yotodo-277b4.firebaseio.com",
  projectId: "yotodo-277b4",
  storageBucket: "yotodo-277b4.appspot.com",
  messagingSenderId: "956797187570"
};


let instance = null;

class UserStore {

  @observable
  user = null;

  set User(value) {
    this.user = value;
  }

  @computed
  get User() {
    return this.user;
  }

  constructor() {
    if (!instance) {
      // this.app = firebase.initializeApp(config);
      instance = this;
    }

    return instance;
  }

  onLogin = () => {
    try {
      firebase.auth()
        .signInWithEmailAndPassword(email, pass);

      console.log("Logged In!");

      // Navigate to the Home page

    } catch (error) {
      console.log(error.toString())
    }
  }


  setUserTodos(userId, todos) {
    let userMobilePath = "/user/" + userId + "/details";

    return firebase.database().ref(userMobilePath).set({
      todos: todos,
    })

  }

}

const store = new UserStore();

export default store;