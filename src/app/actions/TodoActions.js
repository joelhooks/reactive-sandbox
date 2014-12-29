var Rx              = require('rx'),
    di              = require('di'),
    TodoStore       = require('../stores/TodoStore'),
    _               = require('lodash'),
    uuid            = require('node-uuid');

class TodoActions {
  constructor(TodoStore) {
    this.updates = TodoStore.updates;
    
    this.create = new Rx.Subject();
    this.toggle = new Rx.Subject();
    this.update = new Rx.Subject();
    this.destroy = new Rx.Subject();
    
    this.init();
  }
  init() {
    this.create
      .map((title) => { // create array of FUNCTIONS to be used as operations in store
        return (todoList) => { // the operation to be performed
          return todoList.concat({ // the resulting array (adds a new object)
            title: title,
            isComplete: false,
            id: uuid.v1()
          });
        };
      })
      .subscribe(this.updates);

    this.toggle
      .map((updateTodo) => {
        return (todoList) => {
          return todoList.map((todo) => {
            return (todo !== updateTodo) ? todo : _.assign({}, todo, {isComplete: !todo.isComplete});
          });
        }
      })
      .subscribe(this.updates);

    this.update
      .map((updateItem) => {
        return (todoList) => todoList.map((todo) => {
          return (todo !== updateItem.todo) ? todo : _.assign({}, todo, {title: updateItem.text});
        })

      })
      .subscribe(this.updates);

    this.destroy
      .map((todoToDestroy) => {
        return (todoList) => todoList.filter((todo) => todo !== todoToDestroy)
      })
  }
}

di.annotate(TodoActions, new di.Inject(TodoStore));

module.exports = TodoActions;