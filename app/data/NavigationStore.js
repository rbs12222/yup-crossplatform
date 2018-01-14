const {
  computed,
  observable,
  action,
} = require('mobx');

class NavigationStore {
  sidebar = null;

}

const store = new NavigationStore();

export default store;