var React           = require('react/addons'),
    Rx              = require('rx'),
    NoteView        = require('./NoteView.jsx'),
    di              = require('di');

var NoteList = function(NoteView) {
  return React.createClass({

  render: function() {
    var noteItems = this.props.notes.map(function (note) {
            return (
                <NoteView key={note.title} note={note} />
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
}
di.annotate(NoteList, new di.Inject(NoteView));
module.exports = NoteList;