var Rx = require('rx'),
    di = require('di'),
    TodoStore = require('../stores/TodoStore'),
    _ = require('lodash');

class TodoActions {
  constructor(TodoStore) {
    this.updates = TodoStore.updates;
    this.create = new Rx.Subject();
    this.toggle = new Rx.Subject();
    this.update = new Rx.Subject();
    this.init();
  }
  init() {
    this.create
      .map((title) => { // create array of FUNCTIONS to be used as operations in store
        return (todoList) => { // the operation to be performed
          return todoList.concat({ // the resulting array (adds a new object)
            title: title,
            isComplete: false
          });
        };
      })
      .subscribe(this.updates);

    this.toggle
      .map((update) => {
        return (todoList) => {
          return todoList.map((todo) => {
            return (todo.title !== update.title) ? todo : _.assign({}, todo, {isComplete: update.isComplete});
          });
        }
      })
      .subscribe(this.updates);

    this.update
      .map((updateItem) => {
        console.log('update', updateItem)
        return (todoList) => {
          console.log(todoList)
          var note = _.find(todoList, (note) => updateItem.title === note.title)
          if(note) note.title = updateItem.newTitle;
          return todoList;
        }
      })
      .subscribe(this.updates);
  }
}

di.annotate(TodoActions, new di.Inject(TodoStore));

module.exports = TodoActions;