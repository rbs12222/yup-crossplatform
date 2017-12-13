const {
  computed,
  observable,
  action,
} = require('mobx');

class NavigationStore {

  @observable
  showAddIn = 0;
  @observable
  showEditIn = 0;
  @observable
  showTaskIn = 1;

  @computed
  get ShowAdd() {
    return this.showAddIn;
  }

  @action
  showAdd() {
    this.showEditIn = 0;
    this.showTaskIn = 0;
    this.showAddIn = 1;
  }

  @computed
  get ShowEdit() {
    return this.showEditIn;
  }

  @action
  showEdit() {
    this.showEditIn = 1;
    this.showTaskIn = 0;
    this.showAddIn = 0;
  }

  @computed
  get ShowTask() {
    return this.showTaskIn;
  }

  @action
  showTask() {
    this.showEditIn = 0;
    this.showTaskIn = 1;
    this.showAddIn = 0;
  }
}

const store = new NavigationStore();

export default store;