import * as firebase from "firebase";

class Database {
  /**
   * Sets a users mobile number
   * @param userId
   * @param todos
   * @returns {firebase.Promise<any>|!firebase.Promise.<void>}
   */
  static setUserTodos(userId, todos) {
    let userMobilePath = "/user/" + userId + "/details";

    return firebase.database().ref(userMobilePath).set({
      todos: todos,
    })

  }

  static setUserNotes(userId, notes) {
    let userMobilePath = "/user/" + userId + "/details";

    return firebase.database().ref(userMobilePath).set({
      notes: notes,
    })

  }

  /**
   * Listen for changes to a users mobile number
   * @param userId
   * @param callback Users mobile number
   */
  static listenUserMobile(userId, callback) {

    let userMobilePath = "/user/" + userId + "/details";

    firebase.database().ref(userMobilePath).on('value', (snapshot) => {

      var mobile = "";

      if (snapshot.val()) {
        mobile = snapshot.val().mobile
      }

      callback(mobile)
    });
  }

}

module.exports = Database;