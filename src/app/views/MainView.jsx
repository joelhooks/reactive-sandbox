var React           = require('react/addons'),
    Rx              = require('rx'),
    di              = require('di'),
    NoteList        = require('./NoteList.jsx'),
    Header          = require('./header.jsx'),
    NoteStore      = require('../stores/NoteStore');


var MainView = function(NoteStore, Header) {
  return React.createClass({
  getInitialState: function() {
    return {};
  },

  componentWillMount: function() {
    var notes = NoteStore.notes;
    notes
      .map((notes) => {
        return {
          notes: notes
        }
      })
      .subscribe(this.setState.bind(this))
  },

  render: function() {
    return (
      <div>
      <h1>This is just a test.</h1>
      <Header />
      <NoteList notes={this.state.notes}/>
      </div>
    )
  }
})
}

di.annotate(MainView, new di.Inject(NoteStore, Header));

module.exports = MainView;