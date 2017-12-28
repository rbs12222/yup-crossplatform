const {
  computed,
  observable,
  action,
} = require('mobx');

class NavigationStore {

  @observable
  showTaskListAddIn = 0;
  @observable
  showTaskListEditIn = 0;
  @observable
  showTaskListIn = 1;

  @computed
  get ShowTaskAdd() {
    return this.showTaskListAddIn;
  }

  @computed
  get ShowTaskEdit() {
    return this.showTaskListEditIn;
  }

  @computed
  get ShowTaskList() {
    return this.showTaskListIn;
  }

  @action
  showTaskAdd() {
    this.closeNoteAll();
    this.closeTaskAll();
    this.showTaskListAddIn = 1;
  }

  @action
  showTaskEdit() {
    this.closeNoteAll();
    this.closeTaskAll();
    this.showTaskListEditIn = 1;
  }

  @action
  showTaskList() {
    this.closeNoteAll();
    this.closeTaskAll();
    this.showTaskListIn = 1;
  }

  @action
  closeTaskAll() {
    this.showTaskListEditIn = 0;
    this.showTaskListIn = 0;
    this.showTaskListAddIn = 0;
  }


  @observable
  showNoteListAddIn = 0;
  @observable
  showNoteListEditIn = 0;
  @observable
  showNoteListIn = 1;

  @computed
  get ShowNoteAdd() {
    return this.showNoteListAddIn;
  }

  @computed
  get ShowNoteEdit() {
    return this.showNoteListEditIn;
  }

  @computed
  get ShowNoteList() {
    return this.showNoteListIn;
  }

  @action
  showNoteAdd() {
    this.closeTaskAll();
    this.closeNoteAll();
    this.showNoteListAddIn = 1;
  }

  @action
  showNoteEdit() {
    this.closeTaskAll();
    this.closeNoteAll();
    this.showNoteListEditIn = 1;
  }

  @action
  showNoteList() {
    this.closeTaskAll();
    this.closeNoteAll();
    this.showNoteListIn = 1;
  }

  @action
  closeNoteAll() {
    this.showNoteListEditIn = 0;
    this.showNoteListIn = 0;
    this.showNoteListAddIn = 0;
  }

}

const store = new NavigationStore();

export default store;