var React           = require('react/addons'),
    Rx              = require('rx'),
    di              = require('di'),
    TodoActions         = require('../actions/TodoActions'),
    EventHandler    = require('../utils/EventHandler');

var ESCAPE_KEY = 27;
var ENTER_KEY = 13;

var TodoItem = function(TodoActions, EventHandler) {
  return React.createClass({
  
  propTypes: {
    todo: React.PropTypes.object.isRequired,
    key: React.PropTypes.number
  },

  getInitialState: function() {
    return {};
  },

  mixins: [React.addons.LinkedStateMixin], 

  getTodo: function() {
    return this.props.todo;
  },

  saveTodo: function() {
    var val = this.state.editValue.trim();
    if (val) {
        TodoActions.update.onNext({
            text: val,
            todo: this.getTodo()
        });
        this.setState({
            editValue: val, 
            isEditing: false
        });
    } else {
        TodoActions.destroy.onNext(this.getTodo());
    }
  },

  componentWillMount: function() {
    var handleToggle    = EventHandler.create(),
        handleEditStart = EventHandler.create(),
        handleDestroy   = EventHandler.create(),
        handleBlur      = EventHandler.create(),
        editFieldKeyUp = EventHandler.create();

    handleToggle
      .map(this.getTodo)
      .subscribe(TodoActions.toggle)

    handleBlur
      .subscribe(this.saveTodo)

    editFieldKeyUp
      .filter((event) => event.keyCode === ESCAPE_KEY)
      .map(() => {
        return {
          isEditing: false,
          editValue: this.getTodo().title
        }
      })
      .subscribe(this.setState.bind(this));
    
    editFieldKeyUp
      .filter((event) => event.keyCode === ENTER_KEY)
      .subscribe(this.saveTodo);

    handleEditStart
      .map((event) => { 
        return {
            isEditing: true,
            editValue: this.getTodo().title
        };
      })
      .subscribe((stateUpdate) => {
        this.setState(stateUpdate, () => {
          this.refs.editInput.getDOMNode().focus();
        })
      });

    this.handlers = {
      handleEditStart: handleEditStart,
      handleDestroy: handleDestroy,
      handleBlur: handleBlur,
      editFieldKeyUp: editFieldKeyUp,
      handleToggle: handleToggle
    };
  },

  render: function() {
    var classes = React.addons.classSet({
      'completed': this.props.todo.isComplete,
      'editing': this.state.isEditing
    });
    return (
      <li className={classes}>
        <div className="view">
          <input className="toggle" type="checkbox" checked={!!this.props.todo.isComplete} onChange={this.handlers.handleToggle} />
          <label onDoubleClick={this.handlers.handleEditStart}>{this.props.todo.title}</label>
          <button className="destroy" onClick={this.handlers.handleDestroy}></button>
        </div>
        <input ref="editInput" className="edit" valueLink={this.linkState('editValue')} onKeyUp={this.handlers.editFieldKeyUp} onBlur={this.handlers.handleBlur} />
      </li>
    )
  }
})
}

di.annotate(TodoItem, new di.Inject(TodoActions, EventHandler));

module.exports = TodoItem;