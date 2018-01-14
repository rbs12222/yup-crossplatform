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

class UserStore {

  init = () => {
    firebase.initializeApp(config);
  }

  onRegister = () => {
    try {
      const email = this.state.email;
      const pass = this.state.password;
      firebase.auth()
        .createUserWithEmailAndPassword(email, pass)
        .then((yes) => {
          alert('Login!!')
        }).catch((err) => {
        alert(err);
      });

      console.log("Account created");

      // Navigate to the Home page, the user is auto logged in

    } catch (error) {
      console.log(error.toString())
    }
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

  onLogout = () => {
    try {
      firebase.auth().signOut();

      // Navigate to login view

    } catch (error) {
      console.log(error);
    }
  }

}

const store = new UserStore();

export default store;