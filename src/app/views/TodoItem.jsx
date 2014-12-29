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
          title: React.PropTypes.string.isRequired,
          isComplete: React.PropTypes.bool.isRequired,
          key: React.PropTypes.number
      },
  getInitialState: function() {
    return {};
  },
  mixins: [React.addons.LinkedStateMixin], 
  componentWillMount: function() {
    var handleToggle    = EventHandler.create(),
        handleEditStart = EventHandler.create(),
        handleDestroy   = EventHandler.create(),
        handleBlur      = EventHandler.create(),
        handleValueChange = EventHandler.create();

    handleToggle
      .map( (event) => {
        return {
          title: this.props.title,
          isComplete: !this.props.isComplete
        };
      })
      .filter(function (value) {
        return !!value;
      }).subscribe(TodoActions.toggle)

    handleBlur
      .map((event) => {
          return event.target.value.trim();
      })
      .filter( (value) => {
          return !!value && this.state.isEditing;
      })
      .map((newTitle) => {
        console.log(newTitle, this.props.title)
        return {
          newTitle: newTitle,
          title: this.props.title
        }
      })
      .subscribe(TodoActions.update)


    // handleValueChange
    //     .filter(function (event) {
    //         return event.keyCode === ESCAPE_KEY;
    //     })
    //     .map(function () {
    //         return {
    //             editing: false,
    //             editText: this.props.title
    //         };
    //     }.bind(this))
    //     .subscribe(setState);
    
    // handleValueChange
    //     .filter(function (event) {
    //         return event.keyCode === ENTER_KEY;
    //     })
    //     .subscribe(this.submit);

    handleValueChange.forEach((event) => {
      var text = this.state.editValue; // because of the linkState call in render, this is the contents of the field
      // we pressed enter, if text isn't empty we blur the field which will cause a save
      if (event.which === ENTER_KEY && text) {
          this.refs.editInput.getDOMNode().blur();
      }
      // pressed escape. set editing to false before blurring so we won't save
      else if (event.which === ESCAPE_KEY) {
          this.setState({ isEditing: false },function(){
              this.refs.editInput.getDOMNode().blur();
          });
      }
    })

    handleEditStart.forEach((event) => {
      event.preventDefault();
      // because of linkState call in render, field will get value from this.state.editValue
      this.setState({
          isEditing: true,
          editValue: this.props.title
      }, function() {
          this.refs.editInput.getDOMNode().focus();
      });
    })

    this.handlers = {
      handleEditStart: handleEditStart,
      handleDestroy: handleDestroy,
      handleBlur: handleBlur,
      handleValueChange: handleValueChange,
      handleToggle: handleToggle
    };
  },

  render: function() {
    var classes = React.addons.classSet({
                    'completed': this.props.isComplete,
                    'editing': this.state.isEditing
                  });
    return (
      <li className={classes}>
          <div className="view">
              <input className="toggle" type="checkbox" checked={!!this.props.isComplete} onChange={this.handlers.handleToggle} />
              <label onDoubleClick={this.handlers.handleEditStart}>{this.props.title}</label>
              <button className="destroy" onClick={this.handlers.handleDestroy}></button>
          </div>
          <input ref="editInput" className="edit" valueLink={this.linkState('editValue')} onKeyUp={this.handlers.handleValueChange} onBlur={this.handlers.handleBlur} />
      </li>
    )
  }
})
}

di.annotate(TodoItem, new di.Inject(TodoActions, EventHandler));

module.exports = TodoItem;