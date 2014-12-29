var React           = require('react/addons'),
    Rx              = require('rx'),
    TodoItem        = require('./TodoItem.jsx'),
    di              = require('di');

var TodoList = function(TodoItem) {
  return React.createClass({
  render: function() {
    console.log(this.props)
    var todoList = this.props.todoList,
        todoItems = todoList.map((todo) => {
            return (
                <TodoItem key={todo.id} todo={todo} />
            );
        }),
        classes = React.addons.classSet({
                "hidden": todoList.length < 1
        });
    return (
      <section id="main" className={classes}>
        <input id="toggle-all" type="checkbox" onChange={this.toggleAll} />
        <label htmlFor="toggle-all">Mark all as complete</label>
        <ul id="todo-list">
            { todoItems }
        </ul>
      </section>
    )
  }
})
}
di.annotate(TodoList, new di.Inject(TodoItem));
module.exports = TodoList;