var React           = require('react/addons'),
    Rx              = require('rx'),
    di              = require('di'),
    Actions         = require('../actions/Actions'),
    EventHandler    = require('../utils/eventHandler');

var NoteView = function(Actions) {
  return React.createClass({

  componentWillMount: function() {
    var onNoteClicked = EventHandler.create();

    onNoteClicked
      .map(function (event) {
        return event.target.textContent.trim();
      })
      .subscribe(Actions.complete);

    this.handlers = {
      onNoteClicked: onNoteClicked
    };
  },

  render: function() {
    return (
      <li onClick={this.handlers.onNoteClicked}>
        {this.props.note}
      </li>
    )
  }
})
}

di.annotate(NoteView, new di.Inject(Actions));

module.exports = NoteView;