var React               = require('react/addons'),
    LinkedStateMixin    = React.addons.LinkedStateMixin,
    Rx                  = require('rx'),
    di                  = require('di'),
    TodoActions         = require('../actions/TodoActions'),
    {EventHandler}      = require('rx-react'),
    {LifecycleMixin}    = require('rx-react');

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

  mixins: [LinkedStateMixin, LifecycleMixin], 

  componentWillMount: function() {
    var handleToggle    = EventHandler.create(),
        handleEditStart = EventHandler.create(),
        handleDestroy   = EventHandler.create(),
        handleBlur      = EventHandler.create(),
        editFieldKeyUp  = EventHandler.create();

    handleToggle
      .map(this.getTodo)
      .subscribe(TodoActions.toggle)

    handleBlur
      .subscribe(this.saveTodo)

    var escapePressedWhileEditing = editFieldKeyUp.filter((event) => event.keyCode === ESCAPE_KEY)
      
    escapePressedWhileEditing
      .map(() => {
        return {
          isEditing: false,
          editValue: this.getTodo().title
        }
      })
      .subscribe(this.setState.bind(this));
    
    var enterPressedWhileEditing = editFieldKeyUp.filter((event) => event.keyCode === ENTER_KEY)

    enterPressedWhileEditing.subscribe(this.saveTodo);

    handleEditStart
      .map((event) => { 
        return {
            isEditing: true,
            editValue: this.getTodo().title
        };
      })
      .subscribe(this.setState.bind(this));

    var editStateEntered = this.lifecycle.componentDidUpdate
      .filter((prev) => this.state.isEditing && !prev.prevState.isEditing)
      
    editStateEntered.subscribe(() => {
        var editInput = this.refs.editInput.getDOMNode(),
          title = this.getTodo().title;
        editInput.focus();
        editInput.value = title;
        editInput.setSelectionRange(title.length, title.length)
      });

    this.handlers = {
      handleEditStart: handleEditStart,
      handleDestroy: handleDestroy,
      handleBlur: handleBlur,
      editFieldKeyUp: editFieldKeyUp,
      handleToggle: handleToggle
    };
  },

  getTodo: function() {
    return this.props.todo;
  },

  saveTodo: function() {
    var newTitle = this.state.editValue.trim();
    if (newTitle) {
      TodoActions.update.onNext({
        text: newTitle,
        todo: this.getTodo()
      });
      this.setState({
        editValue: newTitle, 
        isEditing: false
      });
    } else { //it's empty!
      TodoActions.destroy.onNext(this.getTodo());
    }
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