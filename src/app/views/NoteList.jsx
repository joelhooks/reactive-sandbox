var React           = require('react/addons'),
    Rx              = require('rx'),
    NoteView        = require('./NoteView.jsx');

var NoteList = React.createClass({

  componentWillMount: function() {
    console.log(this.props.notes)
  },

  render: function() {
    var noteItems = this.props.notes.map(function (note) {
            return (
                <NoteView
                    note={note}
                />
            );
        }, this);

    return (
      <div>
      <ul>
        {noteItems}
      </ul>

      </div>
    )
  }
})

module.exports = NoteList;